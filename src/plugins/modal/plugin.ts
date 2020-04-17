import {Vue, VueConstructor} from 'vue/types/vue';
import {warn} from 'vue-class-component/lib/util';
import {BvModal} from 'bootstrap-vue';
import {BvMsgBoxData} from 'bootstrap-vue/src/components/modal';
import {Translator} from '../translator/translator';
import defineProperty = Reflect.defineProperty;

const PROP_NAME_PRIVATE = '_drenso__modal';

class DrensoModals {

  private _vue: Vue;

  constructor(vue: Vue) {
    this._vue = vue;

    if (typeof vue.$bvModal === 'undefined') {
      warn('Bootstrap Vue $bvModal is required for the Drenso modal plugin to work!');
    }
  }

  public async api400(): Promise<BvMsgBoxData> {
    return this.bvModal.msgBoxOk(this.getMessage(
      'frontend.api.message.400',
      'The submitted data is not considered to be valid. Update the data and try again.',
    ));
  }

  public async api403(): Promise<BvMsgBoxData> {
    return this.bvModal.msgBoxOk(this.getMessage(
      'frontend.api.message.403',
      'You\'re not allowed to access the requested resource.',
    ));
  }

  public async api403SessionExpired(): Promise<BvMsgBoxData> {
    return this.bvModal.msgBoxOk(this.getMessage(
      'frontend.api.message.403-session-expired',
      'You\'re no longer authenticated, resulting your request to fail. Please re-login.',
    ));
  }

  public async api500(): Promise<BvMsgBoxData> {
    return this.bvModal.msgBoxOk(this.getMessage(
      'frontend.api.message.500',
      'An error occurred during your request. Please try again later.',
    ));
  }

  private get trans(): Translator {
    return this._vue.$translator;
  }

  private get bvModal(): BvModal {
    return this._vue.$bvModal;
  }

  private getMessage(translatable: string, defaultMsg: string): string {
    return this.trans
      ? this.trans.trans(translatable)
      : defaultMsg;
  }
}

export default function install(_vue: VueConstructor) {
  _vue.mixin({
    beforeCreate(): void {
      // @ts-ignore Property name
      this[PROP_NAME_PRIVATE] = new DrensoModals(this);
    },
  });

  defineProperty(_vue.prototype, '$modal', {
    get(): DrensoModals {
      // @ts-ignore Property name
      if (!this || !this[PROP_NAME_PRIVATE]) {
        warn('Modals can only be accessed from the "this" context, due to the $bvModal requirement');
      }

      // @ts-ignore Property name
      return this[PROP_NAME_PRIVATE];
    },
  });
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $modal: DrensoModals;
  }
}
