import {VueConstructor} from 'vue/types/vue';
import {capitalize, toLowercase, toUppercase, truncate} from './text';

export default function install(_vue: VueConstructor) {
  _vue.filter('lowercase', toLowercase);

  _vue.filter('uppercase', toUppercase);

  _vue.filter('capitalize', capitalize);

  _vue.filter('truncate', truncate);
}
