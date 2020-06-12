import { defaultMemoize } from 'reselect';
import { keyBy } from 'lodash';

export const getFiledInOptionsById = defaultMemoize(filedInOptions => filedInOptions && keyBy(filedInOptions, 'id'));


export const getAttachedTo = (filter, candidacy, personId, note) => {
  if (note) return [note.attachedToId, note.attachedToType];

  if (filter && filter.attachedToId && filter.attachedToType) {
    return [filter.attachedToId, filter.attachedToType];
  }

  const attachedToId = (candidacy && candidacy.id) || `${personId}`;
  const attachedToType = (candidacy && 'candidacy') || 'person';
  return [attachedToId, attachedToType];
};

export const getNoteProjectId = (filedInOptions, attachedToId, attachedToType) => {
  if (!filedInOptions || attachedToType !== 'candidacy') return null;

  const filedInOptionsById = getFiledInOptionsById(filedInOptions);
  const selectedFiledInOption = (filedInOptionsById && filedInOptionsById[`${attachedToId}_${attachedToType}`]) || {};

  return selectedFiledInOption.attributes && selectedFiledInOption.attributes.metaId;
};
