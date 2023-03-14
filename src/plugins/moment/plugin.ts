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

  const momentFilter = (defaultFormat: string) => {
    return (value: any, format?: string) => {
      if (!value) {
        return '';
      }

      return moment(value).format(format || defaultFormat);
    };
  };

  _vue.filter('moment_datetime', momentFilter('YYYY-MM-DD HH:mm'));
  _vue.filter('moment_datetime_with_seconds', momentFilter('YYYY-MM-DD HH:mm:ss'));
  _vue.filter('moment_date', momentFilter('YYYY-MM-DD'));
  _vue.filter('moment_time', momentFilter('HH:mm'));
  _vue.filter('moment_time_with_seconds', momentFilter('HH:mm:ss'));

  _vue.prototype.$momentToApiISO = toApiISO;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $moment: typeof moment;
    readonly $momentToApiISO: (moment: Moment) => string;
  }
}
