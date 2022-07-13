import Big from 'big.js';

export const formatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 5,
});

export const formatter5 = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
});

export function parseCurrency(value: string | number | Big, f: Intl.NumberFormat): string {
  if (typeof value === 'string' && value !== '') {
    value = parseFloat(value);
  }
  if (value instanceof Big) {
    value = parseFloat(value.toFixed());
  }
  if (typeof value !== 'number') {
    return value;
  }

  // Condition below is to never render a negative zero with the minus sign
  return f.format(value === 0 ? 0 : value);
}
