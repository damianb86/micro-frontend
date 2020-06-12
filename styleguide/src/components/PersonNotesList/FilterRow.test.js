import React from 'react';
import { shallow } from 'enzyme';

import FilterRow from './FilterRow';

describe('<FilterRow /> ', () => {
  const props = { users: {}, noteTypes: [], timestamps: [], noteContexts: [], onFilter: jest.fn(), filter: { author_id: [], category_id: null } };
  const wrapper = shallow(<FilterRow {...props} />);

  describe('renderer', () => {
    it('should render 1 <SelectMultipleDropdown /> component', () => {
      expect(wrapper.find('SelectMultipleDropdown')).toHaveLength(1);
    });

    it('should render 2 <SelectOptions /> component', () => {
      expect(wrapper.find('SelectOptions')).toHaveLength(2);
      expect(wrapper.find('SelectOptions').at(0).props().name).toEqual('category_id');
      expect(wrapper.find('SelectOptions').at(1).props().name).toEqual('note_created_at');
    });

    it('should render <NoteContextOptions /> component', () => {
      expect(wrapper.find('NoteContextOptions')).toHaveLength(1);
      expect(wrapper.find('NoteContextOptions').props().name).toEqual('note_context_id');
    });
  });
});
