import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {HttpOptions} from './plugin';

export const PROP_NAME_PRIVATE = '_drenso__http';

export function installInterceptors(axiosInstance: AxiosInstance, vueInstance: Vue, options: HttpOptions) {
  axiosInstance.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
    return response;
  }, async (error: AxiosError) => {
    if (!error.response || error.response.status === 500) {
      await vueInstance.$modal.api500();
    } else if (error.response && error.response.status === 403) {
      // Test whether authentication is still valid
      // Use new instance to avoid interceptor loop
      try {
        await axios.create().get(vueInstance.$router.generate(options.testRoute || 'app_api_authentication_test'));
        await vueInstance.$modal.api403();
      } catch (e) {
        if (await vueInstance.$modal.api403SessionExpired()) {
          window.location.href = vueInstance.$router.generate(options.loginRoute || 'login');
        }
      }
    }

    return Promise.reject(error);
  });
}
