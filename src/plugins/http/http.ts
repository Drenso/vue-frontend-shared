import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {HttpOptions} from './plugin';

export function installInterceptors(axiosInstance: AxiosInstance, vueInstance: Vue, options: HttpOptions) {
  axiosInstance.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
    return response;
  }, async (error: AxiosError) => {
    if (!error.response || error.response.status === 500) {
      await vueInstance.$modal.api500();
    } else if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        // Test whether authentication is still valid
        try {
          // Use new instance to avoid interceptor loop
          await axios.create().get(vueInstance.$sfRouter.generate(options.testRoute || 'app_api_authentication_test'));

          // The request succeeded, so the session is still good
          await vueInstance.$modal.api403();
        } catch (e) {
          // The request failed, so the session has expired. Ask for login forward.
          if (await vueInstance.$modal.api403SessionExpired()) {
            window.location.href = vueInstance.$sfRouter.generate(options.loginRoute || 'login');
          }
        }
      } else if (error.response.status === 413) {
        // Just show a message when the server cannot handle the request size
        await vueInstance.$modal.api413();
      }
    }

    return Promise.reject(error);
  });

  // Install extra interceptors, if any
  if (Array.isArray(options.extraInterceptors)) {
    options.extraInterceptors.forEach((i) => {
      axiosInstance.interceptors.response.use(i.onFulfilled, i.onRejected);
    });
  }
}

/**
 * Send the actual beacon, checking whether the function exists
 * @param url
 * @param data
 */
export function sendBeacon(url: string, data?: any) {
  if (typeof window.navigator.sendBeacon === 'function') {
    window.navigator.sendBeacon(url, data);
  } else if (typeof $ === 'function' && typeof $.ajax === 'function') {
    // Possibly unreliable, but better than nothing if the beacon API is not supported
    $.ajax({
      async: false,
      method: 'POST',
      url,
      data,
    });
  } else {
    // Possibly unreliable, but better than nothing if the beacon API and jQuery are not available
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    if (data) {
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  }
}
