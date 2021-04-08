import Vue from 'vue/types/umd';
import {VueConstructor} from 'vue/types/vue';
import {Options} from 'select2';
import jQuery from 'jquery';

export interface Select2Configuration {
  autoDropdownParent?: boolean; // Auto determine dropdown parent (bootstrap modals)
}

export interface Select2Options extends Options {
  convertValue?: (val: any) => any;
  initialOptions?: string[];
  defaultSelected?: string[];
  focusOnCreate?: boolean;
}

export interface Select2DestroyResult {
  wasFocused?: boolean;
}

export default function install(_vue: VueConstructor, config: Select2Configuration) {
  _vue.prototype.$select2 = (element: Vue, options?: Select2Options) => {
    const $element = jQuery(element.$el);

    const resolvedOptions: Select2Options = Object.assign({
      width: '100%',
      theme: 'bootstrap',
    }, options || {});

    if (!resolvedOptions.dropdownParent && config.autoDropdownParent === true) {
      // Automatically determine the dropdown parent when configured
      // Works for bootstrap modals
      const modalContainer = $element.closest('.modal-body') as JQuery<HTMLElement>;
      resolvedOptions.dropdownParent = modalContainer.length !== 0 ? modalContainer : undefined;
    }

    $element.select2(resolvedOptions);
    $element.on('select2:close', (e) => {
      (element as Vue).$emit('blur');
    });
    $element.on('select2:open', (e) => {
      setTimeout(() => {
        if ($element.data('select2') === undefined) {
          return;
        }
        if ($element.data('select2').dropdown === undefined) {
          return;
        }
        if ($element.data('select2').dropdown.$search === undefined) {
          return;
        }

        // Also trigger select as some browser might not autofocus the search field
        $element.data('select2').dropdown.$search.trigger('select');
      }, 1);
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

    if (resolvedOptions.focusOnCreate) {
      // @ts-ignore
      $element.select2('focus');
    }
  };

  _vue.prototype.$destroySelect2 = (element: Vue): Select2DestroyResult => {
    const $element = jQuery(element.$el);
    const result: Select2DestroyResult = {
      wasFocused: document.activeElement && element.$el.parentElement
        ? $.contains(element.$el.parentElement, document.activeElement) : false,
    };

    if ($element.data('select2') !== undefined) {
      // Remove bound handlers
      $element.off('select2:close');
      $element.off('select2:open');
      $element.off('change');
      // Make sure to call close before destroy, as otherwise not all event handlers are removed!
      $element.select2('close');
      $element.select2('destroy');
    }

    return result;
  };

  _vue.prototype.$refreshSelect2 = (element: Vue, options?: Select2Options) => {
    const result = _vue.prototype.$destroySelect2(element);

    options = options || {};
    if (result.wasFocused) {
      options.focusOnCreate = true;
    }

    _vue.prototype.$select2(element, options);
  };

  _vue.prototype.$refreshSelect2ValueOnly = (element: Vue) => {
    const $element = jQuery(element.$el);

    if ($element.data('select2') !== undefined) {
      $element.trigger('change.select2');
    }
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    $select2(element: Vue, options?: Select2Options): void;

    $refreshSelect2(element: Vue, options?: Select2Options): void;

    $destroySelect2(element: Vue): Select2DestroyResult;

    $refreshSelect2ValueOnly(element: Vue): void;
  }
}
