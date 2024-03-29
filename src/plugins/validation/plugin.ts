import {formattedTime, secondsToTimeComponents} from '../moment/moment';
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import {email, max, max_value, min, min_value, required} from 'vee-validate/dist/rules';
import {VueConstructor} from 'vue/types/vue';

export function buildValidationMessage(
  _vue: VueConstructor, defaultMessage: string, params?: Record<string, any>, extraParams?: { [key: string]: string }): string {
  if (!_vue.prototype.$translator) {
    return defaultMessage;
  }

  params = params || {};
  return _vue.prototype.$translator.trans(
    `_validation.${params.message ? params.message : defaultMessage}`,
    Object.assign(params.message_attr || {}, extraParams || {}));
}

export default function install(_vue: VueConstructor) {
  _vue.component('ValidationObserver', ValidationObserver);
  _vue.component('ValidationProvider', ValidationProvider);

  const validationMessage = (defaultMessage: string, params?: Record<string, any>, extraParams?: { [key: string]: string }): string => {
    return buildValidationMessage(_vue, defaultMessage, params, extraParams);
  };

  extend('email', {
    ...email,
    message(field, params) {
      return validationMessage('common.email', params);
    },
  });

  extend('greater_than', {
    params: ['minValue'],
    // @ts-ignore
    validate(value, {minValue}) {
      minValue = Number(minValue);
      if (Number.isNaN(minValue) || typeof minValue !== 'number' || typeof value !== 'number') {
        return true;
      }

      return value > minValue;
    },
    message(field, params) {
      return validationMessage('common.greater-than', params, {value: params.minValue});
    },
  });

  extend('greater_or_equal', {
    params: ['target'],
    // @ts-ignore
    validate(value, {target}) {
      if (typeof target !== 'number' || typeof value !== 'number') {
        return true;
      }

      return value >= target;
    },
    message(field, params) {
      return validationMessage('common.greater-than-or-equal', params, {field: params!.target.toLowerCase()});
    },
  });

  extend('less_than', {
    params: ['maxValue'],
    // @ts-ignore
    validate(value, {maxValue}) {
      maxValue = Number(maxValue);
      if (Number.isNaN(maxValue) || typeof maxValue !== 'number' || typeof value !== 'number') {
        return true;
      }

      return value < maxValue;
    },
    message(field, params) {
      return validationMessage('common.less-than', params, {value: params.maxValue});
    },
  });

  extend('less_or_equal', {
    params: ['target'],
    // @ts-ignore
    validate(value, {target}) {
      if (typeof target !== 'number' || typeof value !== 'number') {
        return true;
      }

      return value <= target;
    },
    message(field, params) {
      return validationMessage('common.less-than-or-equal', params, {field: params!.target.toLowerCase()});
    },
  });

  extend('max', {
    ...max,
    message(field, params) {
      return validationMessage('common.max', params, {max: params!.length});
    },
  });

  extend('max_value', {
    ...max_value,
    message(field, params) {
      return validationMessage('common.max-value', params, {max: params!.max});
    },
  });

  extend('time_max_value', {
    ...max_value,
    message(field, params) {
      const timeComponents = secondsToTimeComponents(params!.max);
      return validationMessage('common.max-value', params, {
        max: formattedTime(timeComponents),
      });
    },
  });

  extend('min', {
    ...min,
    message(field, params) {
      return validationMessage('common.min', params, {min: params!.length});
    },
  });

  extend('min_value', {
    ...min_value,
    message(field, params) {
      return validationMessage('common.min-value', params, {min: params!.min});
    },
  });

  extend('time_min_value', {
    ...min_value,
    message(field, params) {
      const timeComponents = secondsToTimeComponents(params!.min);
      return validationMessage('common.min-value', params, {
        min: formattedTime(timeComponents),
      });
    },
  });

  extend('required', {
    ...required,
    message(field, params) {
      return validationMessage('common.required', params);
    },
  });

  extend('array_length', {
    params: ['minLength', 'maxLength'],
    // @ts-ignore
    validate(values, {minLength, maxLength}) {
      if (!Array.isArray(values)) {
        return false;
      }

      return values.length >= minLength && values.length <= maxLength;
    },
    message(field, params) {
      return validationMessage('common.array-length', params,
        {min: params!.minLength, max: params!.maxLength});
    },
  });

  extend('string_array_item_unique', {
    validate(values) {
      if (!Array.isArray(values)) {
        return false;
      }

      return new Set(values.map((v: string) => v.toLowerCase())).size === values.length;
    },
    message(field, params) {
      return validationMessage('common.unique', params);
    },
  });

  extend('string_array_item_length', {
    params: ['minLength', 'maxLength'],
    // @ts-ignore
    validate(values, {minLength, maxLength}) {
      if (!Array.isArray(values)) {
        return false;
      }

      return values.every((value: string) => {
        return value.length >= minLength && value.length <= maxLength;
      });
    },
    message(field, params) {
      return validationMessage('common.string-array-length', params,
        {min: params!.minLength, max: params!.maxLength});
    },
  });
}
