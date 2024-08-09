enum METHODS {
    DELETE = 'DELETE',
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT'
  }

  type RequestData = Record<string, string | number>;

  type Data = Document | XMLHttpRequestBodyInit | null | undefined;

  type RequestOptions = {
    data?: unknown;
    headers?: Record<string, string>;
    method?: METHODS;
    timeout?: number;
    withCredentials?: boolean;
  };

function queryStringify(data: RequestData) {
  if (!data) {
    return '';
  }
  return Object.entries(data).reduce(
    (acc, [key, value], index, arr) => `${acc}${key}=${value}${index < arr.length - 1 ? '&' : ''}`,
    '?',
  );
}

interface XMLHttpRequestWithCustomResponse<R=unknown> extends XMLHttpRequest {
  response: R;
}

type HTTPMethod = <R = unknown>(url: string, options?: RequestOptions) => Promise<XMLHttpRequestWithCustomResponse<R>>

export class HTTPTransport {
  public get: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET });

  public post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  public put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  public patch: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.PATCH });

  public delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  private request = <T>(url: string, options: RequestOptions): Promise<XMLHttpRequestWithCustomResponse<T>> => {
    const {
      data,
      headers = {},
      method = METHODS.GET,
      timeout = 5000,
      withCredentials = true,
    } = options;

    const dataTypeCov = data as RequestData;

    const query = method === METHODS.GET ? queryStringify(dataTypeCov) : '';

    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequestWithCustomResponse<T> = new XMLHttpRequest();

      xhr.open(method, `${url}${query}`);

      if (withCredentials) {
        xhr.withCredentials = true;
      }

      Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));

      xhr.onload = () => (xhr.status >= 300 ? reject(xhr) : resolve(xhr));

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (dataTypeCov?.constructor.name === 'FormData') {
        xhr.send(data as Data);
      } else {
        method === METHODS.GET || !data ? xhr.send() : xhr.send(JSON.stringify(data));
      }
    });
  };
}
