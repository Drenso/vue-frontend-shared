import {VueConstructor} from 'vue/types/vue';
import {Moment} from 'moment';

export default function install(_vue: VueConstructor) {
  _vue.use(require('vue-moment'));

  _vue.prototype.$momentToApiISO = (moment: Moment) => {
    return moment.toISOString().split('.').shift() + 'Z';
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $momentToApiISO: (moment: Moment) => string;
  }
}
