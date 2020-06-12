import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';

import TimeFrameSelector from './';
import { PRESETS } from '../../../constants/timeFrames';

describe('TimeFrameSelector', () => {
  const props = {
    onDatesChange: jest.fn(),
    onFocusChange: jest.fn(),
    prevPreset: null,
    onPresetSelect: jest.fn()
  };

  let wrapper = mount(<TimeFrameSelector {...props} />);

  describe('renderer', () => {
    it('should render 1 SelectOptions', () => {
      expect(wrapper.find('SelectOptions')).toHaveLength(1);
    });

    it('should render 1 DateRangePickerView', () => {
      expect(wrapper.find('DateRangePickerView')).toHaveLength(1);
    });

    it('should render the 13 default presets', () => {
      wrapper.find('SelectOptions').find('DropdownButton').find('button').simulate('click');
      expect(wrapper.find('SelectOptions').find('SimpleOption')).toHaveLength(13);
    });

    it('should render the default presets', () => {
      expect(wrapper.find('SelectOptions').find('SimpleOption').first().find('a').text()).toBe(' Today');
    });
  });

  describe('restrictions', () => {
    it('should show only futures presets', () => {
      const wrapper2 = mount(<TimeFrameSelector {...props} restrictToFutureDates />);
      wrapper2.find('SelectOptions').find('DropdownButton').find('button').simulate('click');
      expect(wrapper2.find('SelectOptions').find('SimpleOption')).toHaveLength(4);
    });
  });

  describe('interaction', () => {
    it('should select the correct first preset', () => {
      wrapper.find('SelectOptions').find('SimpleOption').first().find('a').simulate('click');
      expect(props.onDatesChange).toBeCalledTimes(1);
      expect(props.onDatesChange).toBeCalledWith({ startDate: PRESETS[0].startDate, endDate: PRESETS[0].endDate });
    });

    it('should select the correct fourth preset', () => {
      wrapper.find('SelectOptions').find('DropdownButton').find('button').simulate('click');
      wrapper.find('SelectOptions').find('SimpleOption').at(3).find('a').simulate('click');
      expect(props.onDatesChange).toBeCalledWith({ startDate: PRESETS[3].startDate, endDate: PRESETS[3].endDate });
    });
  });
});
