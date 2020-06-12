import React from 'react';
import { defaultMemoize } from 'reselect';
import { isEmpty, flatten } from 'lodash';

import CheckBox from '../components/common/CheckBox';
import HeaderFields from '../components/gridview/HeaderFields';

import { requestPeople, requestPeopleTags } from '../actions/people';

export const headerWithSelectedFields = defaultMemoize((selectedFields, showRatingField, selectionState, selectionHandler, columnWidthValues) => {
  let headers = [];

  const draggableRequiredFields = HeaderFields.filter(f => (f.required && f.draggable));
  const notDraggableRequiredFields = HeaderFields.filter(f => (f.required && !f.draggable));

  // selectedFields Array may not contain all the required fields which are draggable.
  // Below line find out draggable fields which are required but not present in selectedFields Array
  const unsavedDraggableRequiredFields = draggableRequiredFields.filter(f => !selectedFields.includes(f.key));

  notDraggableRequiredFields.forEach((f) => {
    if (f.key === 'selected' && selectionHandler) {
      headers.push({
        ...f,
        title: <CheckBox checked={selectionState === 'all'} indeterminate={selectionState === 'indeterminate'} onChange={selectionHandler} />
      });
    } else {
      headers.push(f);
    }
  });

  // Adds fields which are both draggable and required, and are not present in
  // selectedFields Array at the beginning of the headers field array
  headers = headers.concat(unsavedDraggableRequiredFields);

  headers = headers.concat(selectedFields.map(k => HeaderFields.find(f => f.key === k))).filter(h => h);

  headers = showRatingField ? headers : headers.filter(h => h.key !== 'rating');

  if (isEmpty(columnWidthValues)) {
    return headers;
  }

  return headers.map(h => ({ ...h, width: columnWidthValues[h.key] || h.width }));
});

export const allKeys = defaultMemoize(fields => flatten(fields.map(fieldSection => fieldSection.values.map(f => f.key))));

export const filteredCandidateExportFields = defaultMemoize((candidateExportFields, showAverageRating) => {
  if (!showAverageRating) {
    return candidateExportFields.map((exportFields) => {
      if (exportFields.key === 'projectSpecificFields') {
        return { ...exportFields, values: exportFields.values.filter(field => field.key !== 'average_rating') };
      }

      return exportFields;
    });
  }

  return candidateExportFields;
});

export function createBatch(data, batchSize, initialBatchSize = 0) {
  if (!batchSize) return [data];
  const sets = [];
  let array = data;

  if (initialBatchSize) {
    sets[0] = array.slice(0, initialBatchSize);
    array = array.slice(initialBatchSize, array.length);
  }

  const len = array.length / batchSize;

  for (let i = 0; i < len; i += 1) {
    sets.push(array.slice(batchSize * i, batchSize * (i + 1)));
  }

  return sets;
}

export const loadNewPersonData = (response, dispatch) => {
  let personIds;

  if (response) {
    personIds = response.payload.data.map(candidacy => candidacy.relationships.person.data.id);

    if (personIds.length > 0) {
      dispatch(
        requestPeople({
          ids: personIds.join(','),
          include: [
            'current_position',
            'phone_number',
            'email_address',
            'web_site',
            'education',
            'address',
            'compensation',
            'instant_message_account',
            'linkedin_url'
          ].join(',')
        })
      );
      dispatch(requestPeopleTags(personIds));
    }
  }

  return new Promise(resolve => resolve(response));
};
