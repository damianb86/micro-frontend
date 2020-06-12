import { getNormalizedDigits } from './phoneNumber';

describe('phoneNumber.getNormalizedDigits', () => {
  it('should return undefined if invalid digits pass', () => {
    const result = getNormalizedDigits(123);
    expect(result).toBe(undefined);
  });

  it('should return only digits present in string', () => {
    const result = getNormalizedDigits('123abc');
    expect(result).toBe('123');
  });

  it('should return only digits present in string', () => {
    const result = getNormalizedDigits('123abc');
    expect(result).toBe('123');
  });

  it('should return with dashed after 3 digits if digits length is 7', () => {
    const result = getNormalizedDigits('1234567');
    expect(result).toBe('123-4567');
  });

  it('should return formated phone number', () => {
    const result = getNormalizedDigits('1234567890');
    expect(result).toBe('(123) 456-7890');
  });

  it('should append extension if present', () => {
    const result = getNormalizedDigits('1234567890', '+91');
    expect(result).toBe('(123) 456-7890 ext. +91');
  });
});
