import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import * as moment from 'moment';

import '../../../styles/date_picker.scss';

export default class DatePicker extends Component {
  state = { focused: false };

  handleFocusChange = ({ focused }) => this.setState({ focused });

  handleOutSideDate = date => false;

  render() {
    const date = typeof this.props.date === 'string' ? moment.parseZone(this.props.date) : this.props.date;

    return (
      <SingleDatePicker
        date={date}
        placeholder={this.props.placeholder}
        onDateChange={this.props.onDateChange}
        focused={this.state.focused}
        onFocusChange={this.handleFocusChange}
        keepOpenOnDateSelect={this.props.keepOpenOnDateSelect}
        isOutsideRange={this.handleOutSideDate}
        numberOfMonths={this.props.numberOfMonths}
        disabled={this.props.disabled}
      />
    );
  }
}

DatePicker.defaultProps = {
  keepOpenOnDateSelect: true,
  numberOfMonths: 1
};

DatePicker.propsType = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  onDateChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};
