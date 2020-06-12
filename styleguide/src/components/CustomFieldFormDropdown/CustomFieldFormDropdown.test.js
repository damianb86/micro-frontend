import React from 'react';
import { shallow } from 'enzyme';
import CustomFieldFormDropdown from '.';

describe('<CustomFieldFormDropdown />', () => {
  let wrapper;

  const initialProps = {
    customField: {
      id: '1',
      fieldName: 'City',
      inputType: 'select',
      selectOptions: 'v1\nv2\nv3'
    },
    searchItems: [],
    onApply: jest.fn(),
    onCancel: jest.fn(),
    onSearchAdd: jest.fn(),
    onSearchRemove: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<CustomFieldFormDropdown {...initialProps} />);
  });

  describe('renderer', () => {
    it('should render SelectOptions when input type is text', () => {
      expect(wrapper.find('SelectOptions')).toHaveLength(1);
    });

    it('should render SelectCheckboxDropdown when input type is multi_select', () => {
      wrapper.setProps({ ...initialProps, customField: { id: '1', fieldName: 'city', inputType: 'multi_select', selectOptions: 'v1\nv2\nv3' } });
      expect(wrapper.find('SelectCheckboxDropdown')).toHaveLength(1);
    });

    it('should render DynamicSearchListDropdown when input type is multi_select and lookupResource is true', () => {
      wrapper.setProps({ ...initialProps, customField: { id: '1', fieldName: 'city', inputType: 'multi_select', selectOptions: 'v1\nv2\nv3', lookupResource: true } });
      expect(wrapper.find('DynamicSearchListDropdown')).toHaveLength(1);
    });
  });
});
