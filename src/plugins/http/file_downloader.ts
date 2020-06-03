import {AxiosResponse} from 'axios';

/**
 * Get the file name for the response, or use the default one if none is set
 * @param response
 * @param defaultName
 */
export function getFileNameFromResponse(response: AxiosResponse, defaultName?: string): string {
  try {
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"])(.*?)\2|[^;\n]*)/);
      if (fileNameMatch !== null && fileNameMatch.length === 4) {
        if (fileNameMatch[3] === undefined) {
          return fileNameMatch[1];
        }
        return fileNameMatch[3];
      }
    }
  } catch {
    // no-op
  }

  return defaultName || 'unknown';
}

/**
 * Get response type from the response object
 * @param response
 */
export function getResponseTypeFromResponse(response: AxiosResponse): string {
  const contentType = response.headers['content-type'];
  if (contentType) {
    return contentType;
  }

  return 'octet/stream';
}

/**
 * Download a specific url as a file to the local machine
 * @param url The URL to download
 * @param filename The filename. This only works for same-origin urls!
 */
export function downloadUrl(url: string, filename?: string) {
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = url;

  tempLink.setAttribute('download', filename === undefined ? '' : filename);

  // Safari thinks _blank anchor are pop ups. We only want to set _blank target if the browser does not
  // support the HTML5 download attribute. This allows you to download files in desktop safari if pop
  // up blocking is enabled.
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();

  // Allow dom changes to take effect
  setTimeout(() => {
    document.body.removeChild(tempLink);
    // Next line might be a no-op, but it doesn't throw an error
    window.URL.revokeObjectURL(url);
  }, 500);
}

/**
 * Download the response as a file to the local machine
 * @param response The response object from Axios
 * @param filename Optional filename parameter. If not given, it is retrieved from the response
 */
export function downloadResponse(response: AxiosResponse, filename?: string) {
  const blob = new Blob([response.data], {type: getResponseTypeFromResponse(response)});
  const resolvedFilename = filename === undefined ? getFileNameFromResponse(response) : filename;

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // For microsoft IE
    window.navigator.msSaveOrOpenBlob(blob, resolvedFilename);
  } else {
    // Other browsers
    const blobUrl = window.URL.createObjectURL(blob);
    downloadUrl(blobUrl, resolvedFilename);
  }
}
