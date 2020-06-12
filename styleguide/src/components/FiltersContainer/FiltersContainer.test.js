import React from 'react';
import { mount } from 'enzyme';

import FiltersContainer from './';
import SelectCheckboxDropdown from '../SelectCheckboxDropdown';
import SearchListDropdown from '../SearchListDropdown';
import { checkboxItems, projectOptionsFromApi } from '../../../../__test__/fixtures/common/DropdownItems';

describe('FiltersContainer', () => {
  const props = {
    filters: [{
      id: 'Filter1',
      title: 'Filter 1',
      Component: SelectCheckboxDropdown,
      initialSelectedItems: checkboxItems.filter(({ checked }) => checked),
      props: { items: checkboxItems }
    },
    {
      id: 'Filter2',
      title: 'Filter 2',
      Component: SearchListDropdown,
      initialSelectedItems: [projectOptionsFromApi[0]],
      props: { options: projectOptionsFromApi, items: [projectOptionsFromApi[0]] }
    }],
    onSubmit: jest.fn()
  };
  const wrapper = mount(<FiltersContainer {...props} />);

  describe('render', () => {
    it('should render 1 ActiveForm component', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render 2 Filters', () => {
      expect(wrapper.find('.filters-container__filter')).toHaveLength(2);
    });

    it('should render 1 SelectCheckboxDropdown', () => {
      expect(wrapper.find('SelectCheckboxDropdown')).toHaveLength(1);
    });

    it('should render 1 SearchListDropdown', () => {
      expect(wrapper.find('SearchListDropdown')).toHaveLength(1);
    });
  });

  describe('interaction', () => {
    it('should call onSubmit when submit button is pressed', () => {
      wrapper.find('ActiveForm').find('form').simulate('submit');
      expect(props.onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call onSubmit with the correct params', () => {
      wrapper.find('ActiveForm').find('form').simulate('submit');
      expect(props.onSubmit).toHaveBeenCalledWith({
        Filter1: [{ checked: true, label: 'Has Phone Number', name: 'settings', value: 'hasPhoneNumber' }, { checked: true, label: 'Is a Client', name: 'settings', value: 'isClient' }],
        Filter2: [{ id: '1', name: 'Project 1' }]
      });
    });
  });
});
