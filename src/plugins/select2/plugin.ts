import Vue from 'vue/types/umd';
import {VueConstructor} from 'vue/types/vue';
import {Options} from 'select2';
import jQuery from 'jquery';

export interface Select2Options extends Options {
  convertValue?: (val: any) => any;
  initialOptions?: string[];
  defaultSelected?: string[];
}

export default function install(_vue: VueConstructor) {
  _vue.prototype.$select2 = (element: Vue, options?: Select2Options) => {
    const $element = jQuery(element.$el);

    const resolvedOptions: Select2Options = Object.assign({
      width: '100%',
      theme: 'bootstrap',
    }, options || {});

    $element.select2(resolvedOptions);
    $element.on('select2:close', (e) => {
      (element as Vue).$emit('blur');
    });
    $element.on('change', (e) => {
      let value = $element.val();
      if (resolvedOptions.convertValue) {
        if (Array.isArray(value)) {
          value = value.map(resolvedOptions.convertValue);
        } else {
          value = resolvedOptions.convertValue(value);
        }
      }

      element.$emit('input', value);
      element.$emit('change', value);
    });
  };

  _vue.prototype.$refreshSelect2 = (element: Vue, options?: Select2Options) => {
    const $element = jQuery(element.$el);

    if ($element.data('select2') !== undefined) {
      $element.off('select2:close');
      $element.off('change');
      $element.select2('destroy');
    }

    _vue.prototype.$select2(element, options);
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    $select2(element: Vue, options?: Select2Options): void;

    $refreshSelect2(element: Vue, options?: Select2Options): void;
  }
}
