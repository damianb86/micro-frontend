// eslint-disable-next-line import/prefer-default-export
export function getNormalizedDigits(digits, extension) {
  if (digits && typeof digits !== 'string') return;

  let normalizedDigits = digits.replace(/\D/g, '');

  if (normalizedDigits.length === 7) {
    normalizedDigits = `${normalizedDigits.substring(0, 3)}-${normalizedDigits.substring(3, 7)}`;
  } else if (normalizedDigits.length === 10) {
    normalizedDigits =
      `(${normalizedDigits.substring(0, 3)}) ${normalizedDigits.substring(3, 6)}-${normalizedDigits.substring(6, 10)}`;
  }

  if (extension) {
    normalizedDigits = `${normalizedDigits} ext. ${extension}`;
  }

  return normalizedDigits;
}
