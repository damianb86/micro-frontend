import { isHex, truncate, snakeToCamel, filterAndJoin, getFilterItemCount, getCapitalizedInitials } from './index';

describe('stringHelper', () => {
  describe('stringHelper.isHex', () => {
    it('should return true for a valid hex color', () => {
      const result = isHex('AA33FF');
      expect(result).toEqual(true);
    });
    it('should return true for a valid hex color with a # in front', () => {
      const result = isHex('#AA33FF');
      expect(result).toEqual(true);
    });
    it('should return false for an empty input', () => {
      const result = isHex(null);
      expect(result).toEqual(false);
    });
    it('should return false for an invalid hex color', () => {
      const result = isHex('AA33FG');
      expect(result).toEqual(false);
    });
    it('should return false for an invalid hex color with a # in front', () => {
      const result = isHex('#AA33FG');
      expect(result).toEqual(false);
    });
    it('should return false for an invalid hex color with extra characters', () => {
      const result = isHex('AA33FGF');
      expect(result).toEqual(false);
    });
    it('should return false for an invalid hex color with extra characters and a #', () => {
      const result = isHex('#AA33FGF');
      expect(result).toEqual(false);
    });
  });

  describe('stringHelper.truncate', () => {
    it('should return original text if truncateLength not passed', () => {
      const result = truncate('abc');
      expect(result).toBe('abc');
    });

    it('should return truncated text if crosses the length', () => {
      const result = truncate('Clockwork recruiting application', 9);
      expect(result).toBe('Clockwork...');
    });

    it('should return the original test if it not upto truncatedLength', () => {
      const result = truncate('Clockwork recruiting', 30);
      expect(result).toBe('Clockwork recruiting');
    });
  });

  describe('snakeToCamel fn', () => {
    it('should return the text in camel case', () => {
      const result = snakeToCamel('hello_world');
      expect(result).toBe('helloWorld');
    });

    it('should return the text in camel case', () => {
      const result = snakeToCamel('hello');
      expect(result).toBe('hello');
    });
  });

  describe('filterAndJoin fn', () => {
    it('should return the not null strings joinded by a comma', () => {
      const result = filterAndJoin(['hello', '', 'to the', null, 'world', undefined], ', ');
      expect(result).toBe('hello, to the, world');
    });

    it('should return only one string', () => {
      const result = filterAndJoin(['', null, 'hello world', undefined]);
      expect(result).toBe('hello world');
    });
  });

  describe('getFilterItemCount fn', () => {
    it('should return the string without any the count', () => {
      const result = getFilterItemCount('Hello Word', []);
      expect(result).toBe('Hello Word');
    });

    it('should return the string with the correct count', () => {
      const result = getFilterItemCount('Hello Word', [1, 2, 3, 4]);
      expect(result).toBe('Hello Word (4)');
    });
  });

  describe('getCapitalizedInitials fn', () => {
    it('should return the correct capitalized initials', () => {
      const result = getCapitalizedInitials('Hello beautiful word');
      expect(result).toBe('HW');
    });

    it('should return one capitalized initials', () => {
      const result = getCapitalizedInitials('HelloWord');
      expect(result).toBe('H');
    });

    it('should not fail', () => {
      expect(getCapitalizedInitials('')).toBe('');
      expect(getCapitalizedInitials(null)).toBe('');
    });
  });
});
