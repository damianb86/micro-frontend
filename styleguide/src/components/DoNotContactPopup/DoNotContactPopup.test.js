/* global describe, it, expect, jest, beforeEach */

import React from 'react';
import { shallow } from 'enzyme';

import DoNotContactPopup from '.';

describe('<Candidacy />', () => {
  let wrapper;
  const initialProps = {};
  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<DoNotContactPopup {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render <Modal />', () => {
      expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('should render <ActiveForm />', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });
  });

  describe('onClose', () => {
    it('should call onClose from props', () => {
      const onClose = jest.fn();
      wrapper.setProps({ onClose });
      wrapper.find('Modal').simulate('close');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose from props', () => {
      const onClose = jest.fn();
      wrapper.setProps({ onClose });
      wrapper.find('ActiveForm').simulate('cancel');
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit from props', () => {
      const e = { preventDefault: jest.fn() };
      const onClose = jest.fn();
      const onSubmit = jest.fn(() => Promise.resolve({}));
      wrapper.setProps({ onSubmit, onClose });
      wrapper
        .find('ActiveForm')
        .props()
        .onSubmit(e);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
