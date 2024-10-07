import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport, METHODS, queryStringify } from './HTTPTransport'; // Adjust path if necessary

describe('HTTPTransport', () => {
  let http: HTTPTransport;
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    http = new HTTPTransport();
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (request) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('GET method', () => {
    it('should send GET request with query parameters', async () => {
      const data = { param1: 'value1', param2: 2 };

      http.get('/test', { data });

      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal(METHODS.GET);
      expect(requests[0].url).to.equal('/test?param1=value1&param2=2');
    });

    it('should handle GET request successfully', async () => {
      const data = { param1: 'value1' };

      const promise = http.get('/test', { data });

      requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true }));

      const response = await promise;
      expect(response.status).to.equal(200);
    });

    it('should reject GET request with error', async () => {
      const data = { param1: 'value1' };

      const promise = http.get('/test', { data });

      requests[0].respond(400, { 'Content-Type': 'application/json' }, JSON.stringify({ success: false }));

      try {
        await promise;
      } catch (err: any) {
        expect(err.status).to.equal(400);
      }
    });
  });

  describe('POST method', () => {
    it('should send POST request with body', async () => {
      const data = { param1: 'value1' };

      http.post('/test', { data });

      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal(METHODS.POST);
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));
    });

    it('should handle POST request successfully', async () => {
      const data = { param1: 'value1' };

      const promise = http.post('/test', { data });

      requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true }));

      const response = await promise;
      expect(response.status).to.equal(200);
    });
  });

  describe('PUT method', () => {
    it('should send PUT request with body', async () => {
      const data = { param1: 'value1' };

      http.put('/test', { data });

      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal(METHODS.PUT);
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));
    });
  });

  describe('PATCH method', () => {
    it('should send PATCH request with body', async () => {
      const data = { param1: 'value1' };

      http.patch('/test', { data });

      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal(METHODS.PATCH);
      expect(requests[0].requestBody).to.equal(JSON.stringify(data));
    });
  });

  describe('DELETE method', () => {
    it('should send DELETE request', async () => {
      http.delete('/test');

      expect(requests.length).to.equal(1);
      expect(requests[0].method).to.equal(METHODS.DELETE);
    });
  });

  describe('Query Stringify function', () => {
    it('should return an empty string when no data is provided', () => {
      const result = queryStringify({});
      expect(result).to.equal('');
    });

    it('should correctly stringify query parameters', () => {
      const data = { param1: 'value1', param2: 2 };
      const result = queryStringify(data);
      expect(result).to.equal('?param1=value1&param2=2');
    });
  });

  describe('Error handling', () => {
    it('should reject on network error', async () => {
      const promise = http.get('/test');

      requests[0].error();

      try {
        await promise;
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });
});
