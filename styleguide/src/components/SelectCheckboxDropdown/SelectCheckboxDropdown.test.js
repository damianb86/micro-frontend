import React from 'react';
import { mount } from 'enzyme';

import { items } from '../../../../__test__/fixtures/common/DropdownItems';
import SelectCheckboxDropdown from './index';

window.testMediaQueryValues = { width: 770 };

describe('SelectCheckboxDropdown', () => {
  const props = {
    items,
    id: 'Id',
    title: 'Settings',
    onSelect: jest.fn(),
    onApply: jest.fn(),
    onCancel: jest.fn()
  };
  const wrapper = mount(<SelectCheckboxDropdown {...props} />);

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

      it('should not render a CheckBox', () => {
        expect(wrapper.find('CheckBox')).toHaveLength(0);
      });
    });

    describe('render dropdown opend', () => {
      beforeAll(() => {
        wrapper.find('DropdownButton').find('button').simulate('click');
      });

      it('should render a DropdownContentButtons', () => {
        expect(wrapper.find('DropdownButton').find('DropdownContentButtons')).toHaveLength(1);
      });

      it('should render a CheckBox', () => {
        expect(wrapper.find('CheckBox')).toHaveLength(5);
      });
    });
  });

  describe('functions', () => {
    it('should call props.onCancel when press the cancel button', () => {
      wrapper.find('DropdownContentButtons').find('.sec-button').simulate('click');
      expect(props.onCancel).toHaveBeenCalledTimes(1);
    });

    it('should call props.onApply with the correct parameters when press the apply button', () => {
      wrapper.find('DropdownButton').find('button').simulate('click');
      wrapper.find('DropdownContentButtons').find('.pri-button').simulate('click');
      expect(props.onApply).toHaveBeenCalledTimes(1);
      expect(props.onApply).toHaveBeenLastCalledWith([{ checked: true, label: 'Past', name: 'radioName', value: 'past' }], 'Id');
    });
  });
});
