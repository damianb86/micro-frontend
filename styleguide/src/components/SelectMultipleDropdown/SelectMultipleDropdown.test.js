import React from 'react';
import { shallow } from 'enzyme';

import SelectMultipleDropdown from './index';

describe('SelectMultipleDropdown', () => {
  const props = {
    options: [{ id: '1', name: 'Option 1' }],
    buttonText: 'Button',
    title: 'Title',
    usersSelected: []
  };

  const wrapper = shallow(<SelectMultipleDropdown {...props} />);
  describe('renderer', () => {
    it('should render SelectMultipleDropdown', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render DropdownButton', () => {
      expect(wrapper.find('DropdownButton')).toHaveLength(1);
    });

    it('should render DropdownContentButtons', () => {
      expect(wrapper.find('DropdownButton')).toHaveLength(1);
    });

    it('should render SearchMultiSelect', () => {
      expect(wrapper.find('DropdownButton')).toHaveLength(1);
    });
  });
});
