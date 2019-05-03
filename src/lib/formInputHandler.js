import { parse as parseDate } from 'date-fns';
import { isNumber } from 'lodash';

/**
 * @param {?*} value to sanitize
 * @param {object} params
 * @param {?number} [params.min]
 * @param {?number} [params.max]
 * @param {boolean} [params.isDate=false]
 * @param {boolean} [params.isNullable=false]
 * @param {boolean} [params.isNumeric=false]
 * @return {?*} sanitized and casted value
 */
export const sanitizeValue = (
  value,
  { min, max, isDate = false, isNullable = false, isNumeric = false } = {}
) => {
  if (value === '') {
    if (isNullable) {
      return null;
    }
    if (isNumeric) {
      return 0;
    }
  }
  if (isNumeric) {
    value = isNaN(value) || !value ? 0 : +value;
    if (isNumber(min) && value < min) {
      return min;
    }
    if (isNumber(max) && value > max) {
      return max;
    }
  }
  if (isDate) {
    return parseDate(value);
  }
  return value;
};

/**
 * @param {function} cb to execute with sanitized value. Usually some setter
 * @param {object} options for sanitization
 * @return {function} form event handler
 */
export const formInputHandler = (cb, options) => (e) => {
  const { value } = e.target;
  const sanitizedValue = sanitizeValue(value, options);
  cb(sanitizedValue);
};
