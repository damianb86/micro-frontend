import React from 'react';
import { shallow } from 'enzyme';

import DateRangePickerView from './';

describe('<DateRangePickerView />', () => {
  const props = {
    startDateId: 'TimeFrameSelectorStartDate',
    endDateId: 'TimeFrameSelectorEndDate',
    noBorder: true,
    startDate: null,
    endDate: null,
    onDatesChange: jest.fn(),
    focusedInput: null,
    onFocusChange: jest.fn(),
    isOutSideRange: jest.fn()
  };

  const wrapper = shallow(<DateRangePickerView {...props} />);

  describe('renderer', () => {
    it('should render the component', () => {
      expect(wrapper.find('.date-range-picker')).toHaveLength(1);
    });

    it('should render 1 <DateRangePicker /> component', () => {
      expect(wrapper.find('withStyles(DateRangePicker)')).toHaveLength(1);
    });
  });
});
