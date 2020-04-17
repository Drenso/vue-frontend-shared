import {VueConstructor} from 'vue/types/vue';

export default function install(_vue: VueConstructor) {

  _vue.filter('lowercase', (value: any) => {
    if (!value) {
      return '';
    }

    return value.toString().toLocaleLowerCase();
  });

  _vue.filter('uppercase', (value: any) => {
    if (!value) {
      return '';
    }

    return value.toString().toLocaleUpperCase();
  });

  _vue.filter('capitalize', (value: any) => {
    if (!value) {
      return '';
    }

    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  });
}
