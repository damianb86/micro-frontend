import React from 'react';
import { defaultMemoize } from 'reselect';
import { isEmpty, keyBy, flatten } from 'lodash';

import CheckBox from '../components/common/CheckBox';
import HeaderFields from '../components/new_people/headerColumns';
import { MAX_NUMBER_OF_PROJECTS } from '../constants/people';

export const headerWithSelectedFields = defaultMemoize((selectedFields, columnWidthValues, isOneOrMoreSelected = null, selectionHandler = null) => {
  let headers = HeaderFields.filter(f => (f.required && !f.draggable));

  if (selectionHandler) {
    headers = headers.map((f) => {
      if (f.key === 'selected') {
        return ({
          ...f,
          title: <CheckBox checked={isOneOrMoreSelected} onChange={selectionHandler} />
        });
      }
      return f;
    });
  }

  headers = headers.concat(HeaderFields.filter(f => (f.required && f.draggable && !selectedFields.includes(f.key))));
  headers = headers.concat(selectedFields.map(k => HeaderFields.find(f => f.key === k)).filter(h => h));

  if (isEmpty(columnWidthValues)) {
    return headers;
  }

  return headers.map(h => ({ ...h, width: columnWidthValues[h.key] || h.width }));
});

export const findSurvivor = (selectedPeople, people) => {
  const peopleKeyById = keyBy(people, 'id');
  const selectedPeopleDetails = selectedPeople.map(pId => peopleKeyById[pId]);

  selectedPeopleDetails.sort((a, b) => {
    const dateA = new Date(a.dateUpdated);
    const dateB = new Date(b.dateUpdated);
    return dateB - dateA;
  });

  return selectedPeopleDetails[0].id;
};

export const allKeys = defaultMemoize(fields => flatten(fields.map(fieldSection => fieldSection.values.map(f => f.key))));

export const personProjectList = (data, personId) => {
  const items = data.list && data.list.map(p => ({ link: `/firm/projects/${p.id}`, title: `${p.attributes.clientCompanyName} / ${p.attributes.name}` }));

  if (data.total > MAX_NUMBER_OF_PROJECTS) {
    return items.concat({ link: `/firm/people/${personId}/projects`, title: 'more...' });
  }

  return items;
};
