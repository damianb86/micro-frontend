/* eslint-disable import/prefer-default-export */
import { string, bool, oneOf, number } from 'prop-types';

export const avatarPropTypes = {
  id: number,
  src: string,
  name: string.isRequired,
  type: oneOf(['rectangular', 'circle']),
  size: oneOf(['small', 'medium', 'large', 'extra-large']),
  nameInitials: string,
  useTwoInitials: bool
};
