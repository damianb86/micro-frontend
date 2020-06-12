import React from 'react';
import { mount } from 'enzyme';

import SearchSelectRadioDropdown from './index';

window.testMediaQueryValues = { width: 770 };

describe('SearchSelectRadioDropdown', () => {
  const radioItems = [
    { name: 'radioName', value: 'all', label: 'All' },
    { name: 'radioName', value: 'current', label: 'Current' },
    { name: 'radioName', value: 'past', label: 'Past', checked: true },
    { name: 'radioName', value: 'pastNotCurrent', label: 'Past, Not Current' },
    { name: 'radioName', value: 'undated', label: 'Undated' }
  ];
  const searchItems = [{ id: 'searchItem', name: 'searchItem' }];
  const props = {
    radioItems,
    searchItems,
    id: 'Id',
    title: 'Job Title',
    onSearchAdd: jest.fn(),
    onSearchRemove: jest.fn(),
    onRadioSelect: jest.fn(),
    onApply: jest.fn(),
    onCancel: jest.fn()
  };
  const wrapper = mount(<SearchSelectRadioDropdown {...props} />);

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    describe('render dropdown closed', () => {
      it('should render a DropdownButton', () => {
        expect(wrapper.find('DropdownButton')).toHaveLength(1);
      });

      it('should not render a DropdownContentButtons', () => {
        expect(wrapper.find('DropdownButton').find('DropdownContentButtons')).toHaveLength(0);
      });

      it('should not render a MultiCriteriaInputField', () => {
        expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(0);
      });

      it('should not render a RadioInputGroup', () => {
        expect(wrapper.find('RadioInputGroup')).toHaveLength(0);
      });
    });

    describe('render dropdown opend', () => {
      beforeAll(() => {
        wrapper.find('DropdownButton').find('button').simulate('click');
      });

      it('should render a DropdownContentButtons', () => {
        expect(wrapper.find('DropdownButton').find('DropdownContentButtons')).toHaveLength(1);
      });

      it('should render a MultiCriteriaInputField', () => {
        expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(1);
      });

      it('should render a RadioInputGroup', () => {
        expect(wrapper.find('RadioInputGroup')).toHaveLength(1);
      });
    });
  });

  describe('functions', () => {
    it('should call props.onCancel when press the cancel button', () => {
      wrapper.find('DropdownContentButtons').find('.sec-button').simulate('click');
      expect(props.onCancel).toHaveBeenCalledTimes(1);
    });

    xit('should call props.onApply with the correct parameters when press the apply button', () => {
      wrapper.find('DropdownButton').find('button').simulate('click');
      wrapper.find('DropdownContentButtons').find('.pri-button').simulate('click');
      expect(props.onApply).toHaveBeenCalledTimes(1);
      expect(props.onApply).toHaveBeenLastCalledWith(searchItems, { name: 'radioName', value: 'past', label: 'Past', checked: true });
    });
  });
});
