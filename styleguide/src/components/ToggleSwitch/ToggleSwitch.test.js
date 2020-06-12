/* global describe, it, expect, jest */

import React from 'react';
import { shallow } from 'enzyme';
import ToggleSwitch from './index';

describe('<ToggleSwitch />', () => {
  const wrapper = shallow(<ToggleSwitch onChange={jest.fn()} />);

  it('should render slider', () => {
    expect(wrapper.find('.slider')).toHaveLength(1);
  });

  it('should render checkbox', () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('should render switch-label', () => {
    expect(wrapper.find('.switch-label')).toHaveLength(0);
    wrapper.setProps({ children: 'On' });
    expect(wrapper.find('.switch-label')).toHaveLength(1);
  });

  it('should call onChange prop on change', () => {
    const mockFn = jest.fn();
    wrapper.setProps({ onChange: mockFn });
    wrapper.instance().onChange({ target: { checked: true } });
    expect(mockFn).toBeCalled();
  });

  describe('no other props passed', () => {
    it('should render checkbox without checked', () => {
      const checkboxEl = wrapper.find('input[type="checkbox"]');
      expect(!!checkboxEl.props().checked).toEqual(false);
    });
  });

  describe('checked props passed', () => {
    it('should render checkbox with checked when props passed as true', () => {
      wrapper.setProps({ checked: true });
      const checkboxEl = wrapper.find('input[type="checkbox"]');
      expect(checkboxEl.props().checked).toEqual(true);
    });

    it('should render checkbox with checked when props passed as false', () => {
      wrapper.setProps({ checked: false });
      const checkboxEl = wrapper.find('input[type="checkbox"]');
      expect(checkboxEl.props().checked).toEqual(false);
    });
  });

  describe('disabled state', () => {
    const toggleSwitchWrapper = shallow(<ToggleSwitch />);

    it('should render disabled without onchange prop', () => {
      expect(toggleSwitchWrapper.props().className).toContain('disabled');
    });
  });
});
