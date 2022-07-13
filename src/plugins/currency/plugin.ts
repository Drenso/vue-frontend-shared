import {VueConstructor} from 'vue/types/vue';
import {formatter, formatter5, parseCurrency} from './currency';

export default function install(_vue: VueConstructor) {
  _vue.filter('currency', (value: never) => parseCurrency(value, formatter));

  _vue.filter('currency5', (value: never) => parseCurrency(value, formatter5));
}
