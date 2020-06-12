import React from 'react';
import { mount } from 'enzyme';

import SearchMultiSelectDropdown from './SearchMultiSelectDropdown';

const multiSelectOptions = [
  { id: '10', name: 'item1' },
  { id: '20', name: 'item2' },
  { id: '30', name: 'item3' }
];

describe('SearchMultiSelectDropdown', () => {
  const props = {
    placeholder: 'Placeholder',
    multiSelectOptions,
    baseClass: 'search-multiselect-dd-base-class',
    multiSelectItems: [multiSelectOptions[1]],
    onMultiSelectItemAdd: jest.fn(),
    onMultiSelectItemRemove: jest.fn()
  };

  const wrapper = mount(<SearchMultiSelectDropdown {...props} />);

  describe('renderer', () => {
    it('should render 1 SearchMultiSelectDropdown', () => {
      expect(wrapper.find('SearchMultiSelectDropdown')).toHaveLength(1);
    });

    it('should render 1 DropdownButton', () => {
      expect(wrapper.find('DropdownButton')).toHaveLength(1);
    });
  });
});
