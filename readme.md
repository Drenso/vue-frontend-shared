# Drenso Frontend Shared

This packages contains uncompiled shared code, that can be used over projects.

As we deliver uncompiled code, make sure to configure Babel to parse it!
For example (`includeNodeModules` is the important part here):

```.js
Encore.
    // Polyfill and transpilation options
    .configureBabel(function (babelConfig) {
    }, {
      includeNodeModules: ['@drenso/vue-frontend-shared'],
      useBuiltIns: 'usage',
      corejs: 3,
    })
```

## Plugins

You can use any plugin by supplying it to Vue. Note that a plugin might require options.

```js
import {Plugins} from '@drenso/vue-frontend-shared';
Vue.use(Plugins.Plugin);
```

### Router

You will need to import the Router and routes locally, and supply them when enabling the plugin.
For example:

```js
import {Plugins} from '@drenso/vue-frontend-shared';
import Router from '@fos/router.min.js';
import routes from '@/_fos_routes.json';
Vue.use(Plugins.Router, {
    router: Router,
    routes
});
```

### Translator

You will need to import your messages locally, and supply them when enabling the plugin.
For example:

```js
import {Plugins} from '@drenso/vue-frontend-shared';
import I18n from '@trans/messages+intl-icu.en.yml';
Vue.use(Plugins.Translator, I18n);
```

Make sure to configure the `messageforamt-loader` for the supplied translation files in your `webpack.config.js`!
For example:

```js
Encore
    .addLoader({
      test: /\b(frontend|messages|validators|drenso_shared)\+intl-icu\.(.+)\.yml$/,
      loader: 'messageformat-loader',
      type: 'javascript/auto'
    })
```
