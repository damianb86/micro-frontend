import React from 'react';
import { mount } from 'enzyme';

import TimeFrameDropdown from './';

// Test on Desktop device
window.testMediaQueryValues = { width: 770 };

describe('TimeFrameSelector', () => {
  const props = {
    onDatesChange: jest.fn(),
    onFocusChange: jest.fn(),
    onApply: jest.fn(),
    onCancel: jest.fn(),
    placeholder: 'time frame selector'
  };

  let wrapper;

  beforeAll(() => {
    wrapper = mount(<TimeFrameDropdown {...props} />);
  });

  describe('renderer', () => {
    it('should render 1 DropdownButton', () => {
      expect(wrapper.find('DropdownButton')).toHaveLength(1);
    });

    it('should not render 1 DropdownContentButtons', () => {
      expect(wrapper.find('DropdownContentButtons')).toHaveLength(0);
    });

    it('should not render 1 TimeFrameSelector', () => {
      expect(wrapper.find('TimeFrameSelector')).toHaveLength(0);
    });

    describe('dropdown open', () => {
      beforeAll(() => {
        wrapper.find('button').simulate('click');
      });

      it('should render 1 DropdownContentButtons', () => {
        expect(wrapper.find('DropdownContentButtons')).toHaveLength(1);
      });

      it('should render 1 TimeFrameSelector', () => {
        expect(wrapper.find('TimeFrameSelector')).toHaveLength(1);
      });

      it('should render the 13 default presets', () => {
        wrapper.find('SelectOptions').find('DropdownButton').find('button').simulate('click');
        expect(wrapper.find('SelectOptions').find('SimpleOption')).toHaveLength(13);
      });

      it('should render the custom presets', () => {
        expect(wrapper.find('SelectOptions').find('SimpleOption').first().find('a').text()).toBe(' Today');
      });
    });

    describe('dropdown button placeholder', () => {
      it('should be placeholder received from props if start_date and end_date are not present', () => {
        expect(wrapper.find('DropdownButton').at(0).prop('title')).toBe('time frame selector');
      });

      it('should be range when start_date and end_date is present', () => {
        wrapper.setProps({ startDate: '12/09/2019', endDate: '11/10/2019' });
        expect(wrapper.find('DropdownButton').at(0).prop('title')).toBe('time frame selector');
      });

      it('should be range when start_date or end_date is present', () => {
        wrapper.setProps({ startDate: null, endDate: '11/10/2019' });
        expect(wrapper.find('DropdownButton').at(0).prop('title')).toBe('time frame selector');
      });
    });
  });

  describe('interaction', () => {
    it('should call onApply on form submit', () => {
      wrapper.find('DropdownContentButtons').find('.pri-button').simulate('click');
      expect(props.onApply).toBeCalledTimes(1);
    });
  });
});
