import React from 'react';
import { string, arrayOf, func, shape } from 'prop-types';

import SelectOptions from '../SelectOptions';
import HorizontalBar from './HorizontalBar';
import horizontalBarChartItem from './PropTypes';
import './index.scss';

const TIME_FILTER_OPTIONS = [
  { id: 'last_week', value: 'Last 7 days' },
  { id: 'last_month', value: 'Last Month' },
  { id: 'last_three_month', value: 'Last 3 Months' }
];

const HorizontalBarChart = ({ title, items, filterSelected, onChangeRange, dropdownFilters, emptyMessage }) => (
  <div className="horizontal-bar-chart">
    <div className="horizontal-bar-chart__header">
      <div className="horizontal-bar-chart__header__title">
        {title}
      </div>
      <div className="horizontal-bar-chart__header__dropdown">
        {onChangeRange && (
          <SelectOptions
            id="timeFilter"
            options={TIME_FILTER_OPTIONS}
            value={filterSelected}
            onSelect={onChangeRange}
            pullRight
            borderLess
          />
        )}
        {dropdownFilters &&
          dropdownFilters.map(selectOption =>
            (<SelectOptions
              key={selectOption.id}
              id={selectOption.id}
              options={selectOption.options}
              value={selectOption.value}
              onSelect={selectOption.onSelect}
              pullRight
              borderLess
            />)
          )}
      </div>
    </div>
    <div className="horizontal-bar-chart__content">
      {items.length ? (
        items.map(item => (
          <HorizontalBar key={item.name} {...item} />
        ))
      ) : (
        <div className="horizontal-bar-chart__content__empty">
          {emptyMessage}
        </div>
      )}
    </div>
  </div>
);

HorizontalBarChart.defaultProps = {
  items: [],
  filterSelected: 'last_week',
  emptyMessage: 'No data to display'
};

HorizontalBarChart.propTypes = {
  title: string,
  items: arrayOf(shape(horizontalBarChartItem)),
  filterSelected: string,
  emptyMessage: string,
  onChangeRange: func,
  dropdownFilters: arrayOf(shape({
    id: string,
    options: arrayOf(shape({ id: string, value: string })),
    value: string,
    onSelect: func
  }))
};

export default HorizontalBarChart;
