import axios, {AxiosInstance} from 'axios';
import {warn} from 'vue-class-component/lib/util';
import {VueConstructor} from 'vue/types/vue';
import {installInterceptors, PROP_NAME_PRIVATE} from './http';
import defineProperty = Reflect.defineProperty;

export default function install(_vue: VueConstructor) {
  defineProperty(_vue.prototype, '$http', {
    get(): AxiosInstance {
      if (!this) {
        warn('Http can only be accessed from the "this" context, due to the $bvModal requirement');
      }

      // @ts-ignore Property name
      if (!this[PROP_NAME_PRIVATE]) {
        // @ts-ignore Property name
        const instance = axios.create({
          withCredentials: true,
        });

        // @ts-ignore this is the Vue instance
        installInterceptors(instance, this);

        // @ts-ignore Property name
        this[PROP_NAME_PRIVATE] = instance;
      }

      // @ts-ignore Property name
      return this[PROP_NAME_PRIVATE];
    },
  });
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $http: AxiosInstance;
  }
}
