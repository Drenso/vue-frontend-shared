import {VueConstructor} from 'vue/types/vue';
import moment, {Moment} from 'moment-timezone';
import {toApiISO} from './moment';
// @ts-ignore
import VueMoment from 'vue-moment';

export interface MomentOptions {
  default_tz?: string;
}

export default function install(_vue: VueConstructor, options?: MomentOptions) {
  options = options || {};
  if (options.default_tz) {
    moment.tz.setDefault(options.default_tz);
    // @ts-ignore
    if (!moment.defaultZone) {
      console.warn(`The supplied timezone ${options.default_tz} was not found found by moment!`);
    }
  }

  _vue.use(VueMoment, {
    moment,
  });

  _vue.prototype.$momentToApiISO = toApiISO;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $moment: typeof moment;
    readonly $momentToApiISO: (moment: Moment) => string;
  }
}
