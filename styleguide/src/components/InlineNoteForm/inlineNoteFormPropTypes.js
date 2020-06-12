import { arrayOf, shape, string, number, oneOfType } from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const templateOptionsPropType = arrayOf(
  shape({
    id: oneOfType([string, number]),
    value: string
  })
);
