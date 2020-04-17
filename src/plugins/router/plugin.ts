import {VueConstructor} from 'vue/types/vue';
import {RouterConfiguration, RouterInterface} from './router_types';
import defineProperty = Reflect.defineProperty;

export default function install(_vue: VueConstructor, config: RouterConfiguration) {
  if (!config.router) {
    throw new Error('Missing the required Router object! Supply it when enabling the bundle!');
  }
  if (!config.routes) {
    throw new Error('Missing the required routes! Supply it when enabling the bundle!');
  }

  config.router.setRoutingData(config.routes);

  defineProperty(_vue.prototype, '$router', {
    get(): RouterInterface {
      return config.router;
    },
  });

  _vue.filter('path', (value: any, params?: {}) => {
    if (!value) {
      return '';
    }

    return config.router.generate(value, params);
  });
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $router: RouterInterface;
  }
}

