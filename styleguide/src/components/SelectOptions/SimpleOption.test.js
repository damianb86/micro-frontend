import React from 'react';
import { mount } from 'enzyme';
import SimpleOption from './SimpleOption';

describe('SimpleOption', () => {
  let wrapper;
  const props = {
    option: { id: 3, value: 'value', icon: 'icon' },
    assignReference: jest.fn(),
    onKeyPress: jest.fn(),
    onKeyDown: jest.fn(),
    onItemClick: jest.fn()
  };

  beforeAll(() => {
    wrapper = mount(<SimpleOption {...props} />);
  });

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 1 li', () => {
      expect(wrapper.find('li')).toHaveLength(1);
    });

    it('should render 1 a', () => {
      expect(wrapper.find('a')).toHaveLength(1);
    });

    it('should render 1 img', () => {
      expect(wrapper.find('img')).toHaveLength(1);
    });

    it('should not render active class', () => {
      expect(wrapper.find('.active')).toHaveLength(0);
    });

    it('should render the active class', () => {
      wrapper.setProps({ active: 3 });
      expect(wrapper.find('.active')).toHaveLength(1);
    });
  });

  describe('functions', () => {
    it('should call props.assignReference on mount', () => {
      expect(props.assignReference).toHaveBeenCalledTimes(1);
    });

    it('should call props.onKeyPress', () => {
      wrapper.find('li').simulate('keypress');
      expect(props.onKeyPress).toHaveBeenCalledTimes(1);
    });

    it('should call props.onKeyDown', () => {
      wrapper.find('li').simulate('keydown');
      expect(props.onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('should call props.onItemClick', () => {
      wrapper.find('li').simulate('click');
      expect(props.onItemClick).toHaveBeenCalledTimes(1);
      expect(props.onItemClick.mock.calls[0][0].target.getAttribute('data-id')).toBe('3');
    });

    it('should have li element with disabled class if the option contains disabled option as true', () => {
      wrapper.setProps({ option: { id: 3, value: 'value', disabled: true } });
      expect(wrapper.find('li').hasClass('disabled')).toBe(true);
    });
  });
});
