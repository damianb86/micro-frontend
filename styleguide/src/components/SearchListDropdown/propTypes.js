import { string, arrayOf, shape, func, bool } from 'prop-types';

export default {
  id: string.isRequired,
  title: string.isRequired,
  placeholder: string,
  items: arrayOf(
    shape({
      id: string,
      name: string
    }),
  ),
  options: arrayOf(
    shape({
      id: string,
      name: string
    }),
  ),
  onSearchAdd: func,
  onSearchRemove: func,
  onOpen: func,
  onClose: func,
  onApply: func,
  onCancel: func,
  disabled: bool,
  isMobileResponsive: bool
};
