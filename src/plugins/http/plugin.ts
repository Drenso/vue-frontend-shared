import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {warn} from 'vue-class-component/lib/util';
import {VueConstructor} from 'vue/types/vue';
import {installInterceptors} from './http';
import {downloadResponse} from './file_downloader';
import defineProperty = Reflect.defineProperty;

const PROP_NAME_PRIVATE: string = '_drenso__http';

type DownloadSignature
  = (url: string, method?: Method, filename?: string, axiosOptions?: AxiosRequestConfig) => Promise<void>;

export interface HttpOptions {
  testRoute?: string;
  loginRoute?: string;
}

export default function install(_vue: VueConstructor, options?: HttpOptions) {
  defineProperty(_vue.prototype, '$http', {
    get(): AxiosInstance {
      if (!this) {
        warn('Http can only be accessed from the "this" context, due to the $bvModal requirement');
      }

      // @ts-ignore This is Vue instance in this context
      const vueInstance: Vue = this;

      // @ts-ignore Property name
      if (!vueInstance[PROP_NAME_PRIVATE]) {
        const axiosInstance = axios.create({
          withCredentials: true,
        });

        installInterceptors(axiosInstance, vueInstance, options || {});

        // @ts-ignore Property name
        vueInstance[PROP_NAME_PRIVATE] = axiosInstance;
      }

      // @ts-ignore Property name
      return vueInstance[PROP_NAME_PRIVATE];
    },
  });

  defineProperty(_vue.prototype, '$httpDownload', {
    get(): DownloadSignature {
      return (url: string, method: Method = 'get', filename?: string, axiosOptions?: AxiosRequestConfig) => {
        // @ts-ignore This is Vue instance in this context
        const vueInstance: Vue = this;

        return vueInstance.$http(url, Object.assign({method, responseType: 'arraybuffer'}, axiosOptions))
          .then((response: AxiosResponse) => {
            downloadResponse(response, filename);
          });
      };
    },
  });

}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $http: AxiosInstance;
    readonly $httpDownload: DownloadSignature;
  }
}
