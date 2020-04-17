import {VueConstructor} from 'vue/types/vue';
import {v4} from 'uuid';

export default function install(_vue: VueConstructor) {
  _vue.prototype.$random = () => v4();
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $random: () => string;
  }
}

