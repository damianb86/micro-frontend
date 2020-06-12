/* eslint-disable import/prefer-default-export */
export const getInitialSelectedItems = filters =>
  filters.reduce((items, { id, initialSelectedItems }) => ({ ...items, [id]: initialSelectedItems }), {});
