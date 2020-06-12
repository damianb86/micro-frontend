import React from 'react';
import { mount } from 'enzyme';

import DynamicSearchListDropdown from './index';
import { projectOptions } from '../../../../__test__/fixtures/common/DropdownItems';

describe('DynamicSearchListDropdown', () => {
  const props = {
    items: [{ id: '2', name: 'Project 2' }],
    options: projectOptions,
    id: 'Id',
    title: 'On Project',
    onSearchAdd: jest.fn(),
    onSearchRemove: jest.fn(),
    onApply: jest.fn(),
    onCancel: jest.fn(),
    onLoadOptions: jest.fn(() => new Promise(resolve => resolve([])))
  };
  const wrapper = mount(<DynamicSearchListDropdown {...props} />);

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    describe('render dropdown closed', () => {
      it('should render a DropdownButton', () => {
        expect(wrapper.find('DropdownButton')).toHaveLength(1);
      });

      it('should not render DropdownContentButtons', () => {
        expect(wrapper.find('DropdownButton').find('DropdownContentButtons')).toHaveLength(0);
      });

      it('should not render a SearchMultiSelect', () => {
        expect(wrapper.find('SearchMultiSelect')).toHaveLength(0);
      });
    });

    describe('render dropdown opened', () => {
      beforeAll(() => {
        wrapper.find('DropdownButton').find('button').simulate('click');
      });

      it('should render DropdownContentButtons', () => {
        expect(wrapper.find('DropdownButton').find('DropdownContentButtons')).toHaveLength(1);
      });

      it('should render a SearchMultiSelect', () => {
        expect(wrapper.find('SearchMultiSelect')).toHaveLength(1);
      });
    });
  });

  describe('functions', () => {
    it('should call props.onCancel when the cancel button is pressed', () => {
      wrapper.find('DropdownContentButtons').find('.sec-button').simulate('click');
      expect(props.onCancel).toHaveBeenCalledTimes(1);
    });

    it('should call props.onApply with the correct parameters when the apply button is pressed', () => {
      wrapper.find('DropdownButton').find('button').simulate('click');
      wrapper.find('DropdownContentButtons').find('.pri-button').simulate('click');
      expect(props.onApply).toHaveBeenCalledTimes(1);
      expect(props.onApply).toHaveBeenLastCalledWith([{ id: '2', name: 'Project 2' }], 'Id');
    });

    it('should call props.onLoadOptions when the component is mounted', () => {
      expect(props.onLoadOptions).toHaveBeenCalledTimes(1);
    });
  });
});
