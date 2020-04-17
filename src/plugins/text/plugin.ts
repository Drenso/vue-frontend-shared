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

  _vue.filter('truncate', (value: any, maxLength: number = 50) => {
    if (typeof value !== 'string') {
      return;
    }

    // Remove dot characters from max length
    maxLength = maxLength - 3;

    if (value.length < maxLength) {
      return value;
    }

    let truncated = '';
    const valueArray = value.split(' ');
    let valueWordCount = 0;
    for (const word of valueArray) {
      valueWordCount += word.length;
      if (valueWordCount > maxLength) {
        return truncated + '...';
      }

      truncated += ' ' + word;
      valueWordCount++;
    }

    return truncated + '...';
  });
}
