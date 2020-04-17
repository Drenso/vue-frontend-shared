import {VueConstructor} from 'vue/types/vue';
import {Translator} from './translator';
import {MessageObject} from 'messageformat/messages';
import defineProperty = Reflect.defineProperty;


export default function install(_vue: VueConstructor, messages: MessageObject) {
  if (!messages) {
    throw new Error('Missing the required Router object! Supply it when enabling the bundle!');
  }

  const translator = new Translator(messages);

  defineProperty(_vue.prototype, '$translator', {
    get(): Translator {
      return translator;
    },
  });

  _vue.filter('trans', (value: any, params?: {}) => {
    if (!value) {
      return '';
    }

    return translator.trans(value, params);
  });
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $translator: Translator;
  }
}
