import React, { Component } from 'react';

import SelectOptions from './SelectOptions';

const TIME_FILTER_OPTIONS = [
  { id: 'last_week', value: 'Last Week' },
  { id: 'last_two_week', value: 'Last Two Week' },
  { id: 'last_month', value: 'Last Month' },
  { id: 'last_three_month', value: 'Last 3 Month' },
  { id: '', value: 'YTD' }
];

export default class TimeFilterDropdown extends Component {
  render() {
    return <SelectOptions options={TIME_FILTER_OPTIONS} {...this.props} />;
  }
}
