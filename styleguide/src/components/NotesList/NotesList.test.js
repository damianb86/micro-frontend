import React from 'react';
import { shallow } from 'enzyme';

import NotesList from './index';
import { reselectAggregateNotes } from './selectors/NotesList';

import { aggregateNotes, entities, noteCategories, users } from './../../../../__test__/fixtures/common/NotesList';

describe('<NotesList />', () => {
  let wrapper = null;
  const dispatch = jest.fn(() => new Promise(resolve => resolve()));
  const props = {
    dispatch,
    notes: { ...aggregateNotes, loading: false, pinnedNoteId: '420203_personNotes', filter: {}, entityId: null },
    notesEntities: reselectAggregateNotes(aggregateNotes.ids, { ...entities, users, noteCategories }),
    noteCategoriesLoaded: true,
    candidacyId: '11',
    currentUser: { role: 'Partner' },
    projectTypes: {},
    project: {},
    projectId: 23
  };

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<NotesList {...props} />);
  });

  describe('renderer', () => {
    it('should render NotesList component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render StackedListWithThreads component', () => {
      expect(wrapper.find('StackedListWithThreads')).toHaveLength(1);
    });

    it('should render 6 StackedListItem', () => {
      expect(wrapper.find('StackedListWithThreads').dive().find('StackedListItem')).toHaveLength(6);
    });
  });
});
