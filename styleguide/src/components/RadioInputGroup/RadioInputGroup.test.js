import React from 'react';
import { mount } from 'enzyme';

import RadioInputGroup from './index';

describe('RadioInputGroup', () => {
  const items = [
    { name: 'radioName', value: 'all', label: 'All' },
    { name: 'radioName', value: 'current', label: 'Current' },
    { name: 'radioName', value: 'past', label: 'Past', checked: true },
    { name: 'radioName', value: 'pastNotCurrent', label: 'Past, Not Current' },
    { name: 'radioName', value: 'undated', label: 'Undated' }
  ];
  const props = {
    items,
    onChange: jest.fn()
  };
  const wrapper = mount(<RadioInputGroup {...props} />);

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 5 RadioInput', () => {
      expect(wrapper.find('RadioInput')).toHaveLength(5);
    });

    it('should render 5 inputs', () => {
      expect(wrapper.find('input')).toHaveLength(5);
    });
  });

  describe('functions', () => {
    it('should call props.onChange when press some item with its value', () => {
      wrapper.find('RadioInput').last().find('input').simulate('change');
      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenLastCalledWith('undated');
    });
  });
});
