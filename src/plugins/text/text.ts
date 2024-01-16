export function toLowercase(value: any): string {
  if (typeof value !== 'string' || !value) {
    return '';
  }

  return value.toString().toLocaleLowerCase();
}

export function toUppercase(value: any): string {
  if (typeof value !== 'string' || !value) {
    return '';
  }

  return value.toString().toLocaleUpperCase();
}

export function capitalize(value: any): string {
  if (typeof value !== 'string' || !value) {
    return '';
  }

  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function truncate(value: any, maxLength: number = 50): string {
  if (typeof value !== 'string' || !value) {
    return '';
  }

  // Remove dot characters from max length
  maxLength = maxLength - 3;

  if (value.length < maxLength) {
    return value;
  }

  let truncated = '';
  const valueArray = value.split(' ');
  let valueWordCount = 0;
  for (const word of valueArray) {
    valueWordCount += word.length;
    if (valueWordCount > maxLength) {
      if (truncated === '') {
        // Insert first characters of string that couldn't be split
        return value.slice(0, maxLength) + '...';
      }

      return truncated + '...';
    }

    truncated += ' ' + word;
    valueWordCount++;
  }

  return truncated + '...';
}
