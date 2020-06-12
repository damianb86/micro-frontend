import React from 'react';
import { mount } from 'enzyme';

import DropdownButton from './index';

describe('DropdownButton', () => {
  const props = {
    open: false,
    title: 'DDButton',
    id: 'DDButton',
    onOpen: jest.fn(),
    onClose: jest.fn(),
    onClick: jest.fn(),
    onClickOutside: jest.fn(),
    onKeyPress: jest.fn()
  };
  const wrapper = mount(<DropdownButton {...props}><div className="children" /></DropdownButton>);

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render a button', () => {
      expect(wrapper.find('button')).toHaveLength(1);
    });

    describe('dropdown close', () => {
      it('should not render the children', () => {
        expect(wrapper.find('.children')).toHaveLength(0);
      });
    });

    describe('dropdown open', () => {
      it('should render the children', () => {
        expect(wrapper.find('.caret')).toHaveLength(1);
        wrapper.setProps({ ...props, isCaretVisible: false });
        expect(wrapper.find('.caret')).toHaveLength(0);
      });
    });

    it('should hide caret', () => {
      wrapper.setProps({ ...props, open: true });
      expect(wrapper.find('.children')).toHaveLength(1);
    });
  });

  describe('interaction', () => {
    it('should call onClose when click on the button and is open', () => {
      wrapper.setProps({ ...props, open: true });
      wrapper.find('button').simulate('click');
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onOpen when click on the button and is close', () => {
      wrapper.setProps({ ...props, open: false });
      wrapper.find('button').simulate('click');
      expect(props.onOpen).toHaveBeenCalledTimes(1);
    });

    it('should call onKeyPress when press a key on the button', () => {
      wrapper.setProps({ ...props, open: true });
      wrapper.find('button').simulate('keypress');
      expect(props.onKeyPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onClickOutside when click outside the button and is close', () => {
      wrapper.setProps({ ...props, open: false });
      expect(props.onClickOutside).toHaveBeenCalledTimes(0);
    });

    it('should call onClickOutside when click outside the button and is open', () => {
      wrapper.setProps({ ...props, open: true });
      document.body.click();
      expect(props.onClickOutside).toHaveBeenCalledTimes(1);
    });
  });
});
