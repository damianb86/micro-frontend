/* eslint-disable import/prefer-default-export */

export function handleSortState(payload, prevState, maxSize = 3) {
  const sortField = [...prevState.sort];
  const sortDir = [...prevState.sortAscending];

  if (sortField.includes(payload.sort)) {
    const index = sortField.indexOf(payload.sort);
    sortField.splice(index, 1);
    sortDir.splice(index, 1);
  }

  sortField.unshift(payload.sort);
  sortDir.unshift(payload.direction);

  if (sortField.length > maxSize) sortField.length = maxSize;
  if (sortDir.length > maxSize) sortDir.length = maxSize;

  return { sortField, sortDir };
}
