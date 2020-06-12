import React from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import Moment from 'moment';
import classNames from 'classnames';

import IconRightArrow from './../../../icons/icon-12-chevron-right.svg';

import './../../../styles/form.scss';
import '../../../styles/date_picker.scss';
import './index.scss';

const DateRangePickerView = ({
  startDateId,
  endDateId,
  noBorder,
  startDate,
  endDate,
  onDatesChange,
  focusedInput,
  onFocusChange,
  isOutsideRange,
  restrictToFutureDates,
  restrictToPastDates,
  direction,
  ...props
}) => {
  const handleOutsideRange = (day) => {
    if (restrictToFutureDates) {
      return Moment().isSameOrAfter(day);
    }
    if (restrictToPastDates) {
      return Moment().isSameOrBefore(day);
    }

    return isOutsideRange(day);
  };

  return (
    <div className={classNames('date-range-picker', direction)}>
      <DateRangePicker
        startDateId={startDateId}
        endDateId={endDateId}
        noBorder={noBorder}
        startDate={startDate}
        endDate={endDate}
        customArrowIcon={<IconRightArrow />}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
        isOutsideRange={handleOutsideRange}
        anchorDirection={direction}
        {...props}
      />
    </div>
  );
};

DateRangePickerView.defaultProps = {
  isOutsideRange: () => false,
  restrictToFutureDates: false,
  restrictToPastDates: false,
  direction: 'right'
};

DateRangePickerView.propTypes = { direction: PropTypes.oneOf(['left', 'right']) };

export default DateRangePickerView;
