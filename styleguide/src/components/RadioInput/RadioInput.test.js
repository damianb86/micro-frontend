import React from 'react';
import { shallow } from 'enzyme';
import RadioInput from '.';

describe('<RadioInput />', () => {
  let wrapper;
  const initialProps = {};
  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<RadioInput {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render a span.radio-button-wrapper__input when there is no label passed', () => {
      expect(wrapper.find('span.radio-button-wrapper__input')).toHaveLength(1);
    });

    it('should render a label.radio-button-wrapper when a label is passed', () => {
      wrapper.setProps({ label: 'Hungry' });
      expect(wrapper.find('label.radio-button-wrapper')).toHaveLength(1);
    });
  });

  describe('.radio-button-wrapper', () => {
    it('should add class disabled if disabled is passed', () => {
      wrapper.setProps({ label: 'Huger', disabled: true });
      expect(wrapper.find('.radio-button-wrapper.disabled')).toHaveLength(1);
    });

    it('should not add class disabled if disabled is passed false', () => {
      wrapper.setProps({ label: 'Huger', disabled: false });
      expect(wrapper.find('.radio-button-wrapper.disabled')).not.toHaveLength(1);
    });
  });

  describe('input[type="radio"]', () => {
    it('should add className if className is passed', () => {
      wrapper.setProps({ className: 'light-green' });
      expect(wrapper.find('.radio-button-wrapper__input__item.light-green')).toHaveLength(1);
    });

    it('should not add className if className is not passed', () => {
      expect(wrapper.find('.radio-button-wrapper__input__item.light-green')).not.toHaveLength(1);
    });
  });
});
