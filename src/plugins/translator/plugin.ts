import {VueConstructor} from 'vue/types/vue';
import {MissingTranslationKeyCallback, Translator} from './translator';
import {MessageObject} from 'messageformat/messages';
import defineProperty = Reflect.defineProperty;

export interface TranslatorConfiguration {
  messages: MessageObject;
  missingKeyCallback?: MissingTranslationKeyCallback;
}

export default function install(_vue: VueConstructor, config: TranslatorConfiguration) {
  if (!config || !config.messages) {
    throw new Error('Missing the required configuration object! Supply it when enabling this plugin!');
  }

  const translator = new Translator(config.messages, config.missingKeyCallback);

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
