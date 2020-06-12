import includes from 'lodash/includes';
import { formatMessage, defineMessages } from 'react-intl';

/**
 * getCapitalizedFirstLetter
 *
 * @param  {string} an input string
 * @returns {string} the first letter of the string capitalized
 */
export function getCapitalizedFirstLetter(input) {
  if (input && typeof input === 'string') {
    return input.charAt(0).toUpperCase();
  }
}

export function getCapitalizedInitials(name) {
  if (name && typeof name === 'string') {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  return '';
}

export function getCapitalizedSentence(sentence) {
  if (sentence && typeof sentence === 'string') {
    const firstCapitalizedLetter = sentence.charAt(0).toUpperCase();
    return `${firstCapitalizedLetter}${sentence.substr(1)}.`;
  }
}

export function truncate(text, truncateLength) {
  if (truncateLength && typeof text === 'string' && text.length > truncateLength) {
    return `${text.substring(0, truncateLength)}...`;
  }

  return text;
}

export function snakeToCamel(s) {
  return s ? s.replace(/(_\w)/g, m => m[1].toUpperCase()) : s;
}
/**
 * isHex
 * Used to determine if string is a valid hex color
 *
 * @param {string} an input string
 * @returns {boolean} whether the input string is hexadecimal
 */
export function isHex(input) {
  if (!input) {
    return false;
  }
  if (includes(input, '#')) {
    input = input.replace(/#/, '');
  }
  const hex = parseInt(input, 16);
  return (hex.toString(16) === input.toLowerCase());
}

/**
 * filterAndJoin
 * Used to join some strings using another like glue filtering falseable values
 *
 * @param {array} an array of strings
 * @param {string} an glue
 * @returns {string} the strings joined
 */
export const filterAndJoin = (stringsArray, glue = ' · ') => stringsArray.filter(Boolean).join(glue);

export const getFilterItemCount = (text, items) => (items && items.length ? `${text} (${items.length})` : text);
