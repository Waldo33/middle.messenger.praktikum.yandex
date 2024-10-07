import { showTooltip } from "./tooltip";

export function getMessageFromResponse(errText: string) {
  try {
    return Object.values(JSON.parse(errText))[0];
  } catch (e) {
    console.error(e)
    return {};
  }
}

export function showError(err: any) {
  err.responseText &&
    showTooltip({
      text: getMessageFromResponse(err.responseText) as string,
      type: 'error',
    });
}

console.log(123)
