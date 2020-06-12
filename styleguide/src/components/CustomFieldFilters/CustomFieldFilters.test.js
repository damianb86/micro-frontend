import React from 'react';
import { shallow } from 'enzyme';
import CustomFieldFilters from '.';

describe('<CustomFieldFilters />', () => {
  let wrapper;

  const initialProps = {
    customField: {
      id: '1',
      fieldName: 'City',
      inputType: 'text'
    },
    searchItems: [],
    onApply: jest.fn(),
    onCancel: jest.fn(),
    onSearchAdd: jest.fn(),
    onSearchRemove: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<CustomFieldFilters {...initialProps} />);
  });

  describe('renderer', () => {
    it('should render SearchMultiCriteriaDropdown when input type is text', () => {
      expect(wrapper.find('SearchMultiCriteriaDropdown')).toHaveLength(1);
    });

    it('should render SelectCheckboxDropdown when input type is not text', () => {
      wrapper.setProps({ ...initialProps, customField: { id: '1', fieldName: 'city', inputType: 'multi-select', selectOptions: 'v1\nv2\nv3' } });
      expect(wrapper.find('SelectCheckboxDropdown')).toHaveLength(1);
    });

    it('should render DynamicSearchListDropdown when there is a lookup resource', () => {
      wrapper.setProps({ ...initialProps, customField: { id: '1', fieldName: 'city', inputType: 'multi-select', selectOptions: 'v1\nv2\nv3', lookupResource: 'companies' } });
      expect(wrapper.find('DynamicSearchListDropdown')).toHaveLength(1);
    });
  });
});
