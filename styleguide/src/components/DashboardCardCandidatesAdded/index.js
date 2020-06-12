import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import C3Chart from 'react-c3js';
import moment from 'moment';
import sumBy from 'lodash/sumBy';
import maxBy from 'lodash/maxBy';

import SelectOptions from '../SelectOptions';
import variables from '../../../styles/_variables.scss';
import './index.scss';

const TIMEFRAME_FILTER_OPTIONS = [
  { id: 'day', value: 'Day' },
  { id: 'week', value: 'Week' },
  { id: 'month', value: 'Month' }
];

const TIMEFRAME_CONFIG = {
  day: { format: 'M/D', currentLabel: 'Added Today', scope: 'day' },
  week: { format: 'M/D', currentLabel: 'Added this Week', scope: 'week' },
  month: { format: 'MMM', currentLabel: 'Added this Month', scope: 'month' }
};

const DashboardCardCandidatesAdded = ({ items, daysActive, filterSelected, onChangeTimeframe, emptyMessage }) => {
  const [values, setValues] = useState(Array(items.length).fill(0));
  const [candidatesAddedCurrently, setCandidatesAddedCurrently] = useState([]);

  const sortedItems = items.sort((a, b) => moment(a.key).isBefore(moment(b.key)) || -1);
  const timeframeSelected = TIMEFRAME_FILTER_OPTIONS.find(time => time.id === filterSelected) || { id: 'day', value: 'Day' };
  const timeframeSelectedConfig = TIMEFRAME_CONFIG[timeframeSelected.id];
  const dates = sortedItems.map(item => moment(item.key).format(timeframeSelectedConfig.format));
  const maxValue = items.length ? maxBy(items, 'value').value : 0;
  const ticksCount = Math.min(6, maxValue + 1);
  const graphKey = `graphKey-${maxValue}-${filterSelected}`;

  const chartConfig = {
    axis: {
      x: {
        show: true,
        type: 'category',
        tick: { outer: false, multiline: false },
        label: { text: timeframeSelected.value, position: 'outer-center' }
      },
      y: {
        tick: {
          fit: true,
          outer: false,
          values: Array(ticksCount + 1).fill().map((_, idx) => Math.ceil(idx * (maxValue / ticksCount), 10))
        },
        label: { text: 'Candidates', position: 'outer-middle' },
        padding: 0
      }
    },
    data: {
      type: 'bar',
      colors: { data: variables['chart-blue'] },
      x: 'x',
      columns: [
        ['x', ...dates],
        ['data', ...values]
      ]
    },
    size: { height: 140 },
    bar: { width: 3.5 },
    tooltip: { show: false },
    legend: { show: false },
    grid: { y: { show: true } },
    padding: { left: 45 },
    key: graphKey
  };

  useEffect(() => {
    // This effect is for animation purposes
    setValues(sortedItems.map(item => item.value));
    setCandidatesAddedCurrently(sortedItems.filter(item => moment().isSame(moment(item.key), timeframeSelectedConfig.scope)));
  }, [graphKey]);

  return (
    <div className="dashboard-candidates-added">
      <div className="dashboard-candidates-added__legend">
        <div className="dashboard-candidates-added__legend__active">
          <div className="dashboard-candidates-added__legend__active__number">
            {daysActive}
          </div>
          <div className="dashboard-candidates-added__legend__active__text">
            Days Active
          </div>
        </div>
        <div className="dashboard-candidates-added__legend__today">
          <div className="dashboard-candidates-added__legend__today__number">
            {sumBy(candidatesAddedCurrently, 'value')}
          </div>
          <div className="dashboard-candidates-added__legend__today__text">
            {timeframeSelectedConfig.currentLabel}
          </div>
        </div>
        <div className="dashboard-candidates-added__legend__filter">
          <SelectOptions
            id="formatFilter"
            options={TIMEFRAME_FILTER_OPTIONS}
            value={filterSelected}
            onSelect={onChangeTimeframe}
            pullRight
            borderLess
          />
        </div>
      </div>
      {maxValue ? (
        <div className="dashboard-candidates-added__chart">
          <C3Chart
            className="status-report-chart"
            {...chartConfig}
          />
        </div>
      ) : (
        <div className="dashboard-candidates-added__empty">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

DashboardCardCandidatesAdded.defaultProps = {
  items: [],
  daysActive: 0,
  filterSelected: 'day',
  onChangeTimeframe: () => null,
  emptyMessage: ''
};

DashboardCardCandidatesAdded.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.number
  })),
  daysActive: PropTypes.number,
  filterSelected: PropTypes.string,
  onChangeTimeframe: PropTypes.func,
  emptyMessage: PropTypes.string
};

export default DashboardCardCandidatesAdded;
