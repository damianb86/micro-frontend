import React from 'react';
import { mount } from 'enzyme';
import GroupOption from './GroupOption';

describe('GroupOption', () => {
  let wrapper;
  const props = {
    option: { id: 3, value: 'value', options: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }] },
    assignReference: jest.fn(),
    onKeyPress: jest.fn(),
    onKeyDown: jest.fn(),
    onItemClick: jest.fn()
  };

  beforeAll(() => {
    wrapper = mount(<GroupOption {...props} />);
  });

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 3 SimpleOption', () => {
      expect(wrapper.find('SimpleOption')).toHaveLength(3);
    });
  });

  describe('functions', () => {
    it('should call props.assignReference on mount of each SimpleOption', () => {
      expect(props.assignReference).toHaveBeenCalledTimes(3);
    });

    it('should call props.onKeyPress', () => {
      wrapper.find('SimpleOption').last().simulate('keypress');
      expect(props.onKeyPress).toHaveBeenCalledTimes(1);
    });

    it('should call props.onKeyDown', () => {
      wrapper.find('SimpleOption').last().simulate('keydown');
      expect(props.onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('should call props.onItemClick', () => {
      wrapper.find('SimpleOption').last().simulate('click');
      expect(props.onItemClick).toHaveBeenCalledTimes(1);
      expect(props.onItemClick.mock.calls[0][0].target.getAttribute('data-id')).toBe('2');
    });
  });
});
