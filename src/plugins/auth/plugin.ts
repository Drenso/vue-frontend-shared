import Vue from 'vue';
import {VueConstructor} from 'vue/types/vue';
import defineProperty = Reflect.defineProperty;

export default function install(_vue: VueConstructor) {

  defineProperty(Vue.prototype, '$userId', {
    get(): number {
      return Vue.prototype.$initData.user.id;
    },
  });

  defineProperty(Vue.prototype, '$userName', {
    get(): string {
      return Vue.prototype.$initData.user.full_name;
    },
  });
}

declare module 'vue/types/vue' {
  interface Vue {
    $userId: number;
    $userName: string;
  }
}
