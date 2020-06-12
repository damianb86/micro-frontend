import React from 'react';
import PropTypes from 'prop-types';
import C3Chart from 'react-c3js';
import isEmpty from 'lodash/isEmpty';

import ChartLegend from '../ChartLegend';
import CardView, { CardViewHeader, CardViewBody } from '../../common/CardView';
import SelectOptions from '../../common/SelectOptions';
import { MULTIPLE_LINE_CHART_COLORS } from '../../../constants/dashboard';
import {
  getDatesUnique,
  getLegend,
  getColumnData,
  getMaxValue,
  getRange,
  datesWithGaps
} from '../../../helpers/multipleLineChart';

import './index.scss';

const MultipleLineChart = ({ data, isFilterPresent, className, graphKey, handleFilter, selectedOption }) => {
  if (!data || isEmpty(data)) {
    const noDataContent = isFilterPresent ?
      'There is no data to display for your selected filters. Please update your filters and try again' :
      'There is no data to display for this Report';

    return (
      <CardView className="card multiple-line-chart">
        <div className="card__no-stats-data-present-container">{noDataContent}</div>
      </CardView>
    );
  }

  const dates = getDatesUnique(data);
  const allDates = datesWithGaps(dates);
  const legend = getLegend(data, MULTIPLE_LINE_CHART_COLORS);
  const range = getRange(getMaxValue(data));

  const columns = [['date'].concat(allDates)].concat(getColumnData(data, allDates));
  const chartWidth = dates.length > 0 ? ((new Date(dates[dates.length - 1]) - new Date(dates[0])) / 86400 / 1000) * 45 : 0;

  // Padding to timeseries type chart can be sent in miliseconds and must be a multiple of day
  const rightPadding = 24 * 3600 * 1000 * 2;
  const leftPadding = 24 * 3600 * 1000 * 1;

  const config = {
    key: graphKey,
    color: { pattern: MULTIPLE_LINE_CHART_COLORS },
    grid: { y: { show: true } },
    tooltip: { show: false },
    point: { show: true, r: 2.5 },
    legend: { show: false },
    line: { connectNull: false },
    size: { height: 420 },
    style: { minWidth: chartWidth }
  };

  config.data = {
    x: 'date',
    columns
  };
  config.axis = {
    x: {
      type: 'timeseries',
      padding: { right: rightPadding, left: leftPadding },
      tick: {
        format: '%Y/%m/%d',
        rotate: 30,
        values: dates
      }
    },
    y: { tick: { values: range } }
  };

  let chart = null;
  const changeFocus = item =>
    chart && chart.chart && chart.chart.focus(item);

  const clearFocus = () =>
    chart && chart.chart && chart.chart.revert();

  const disableItem = (item, disable) =>
    chart && chart.chart && (disable ? chart.chart.hide(item) : chart.chart.show(item));

  return (
    <CardView className={`card multiple-line-chart ${className}`}>
      <CardViewHeader className="card-view__header--no-border">
        {selectedOption &&
          <section className="card-view__header__right__item">
            <SelectOptions
              id="activeProjectsStats"
              name="scope"
              options={[]}
              prompt="Visualization"
              value={selectedOption}
              pullRight
              onSelect={handleFilter}
            />
          </section>
        }
      </CardViewHeader>
      <CardViewBody>
        <section className="multiple-line-chart__content">
          <section className="multiple-line-chart__content__diagram">
            <C3Chart
              ref={(r) => { chart = r; }}
              {...config}
              className="c3-multiple-line-chart"
            />
          </section>
          <section className="multiple-line-chart__content__legends">
            <ChartLegend
              key={graphKey}
              items={legend}
              onMouseOver={changeFocus}
              onMouseLeave={clearFocus}
              onDisable={disableItem}
            />
          </section>
        </section>
      </CardViewBody>
    </CardView>
  );
};

MultipleLineChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          value: PropTypes.PropTypes.number
        })
      )
    })
  ).isRequired,
  handleFilter: PropTypes.func,
  selectedOption: PropTypes.string,
  isFilterPresent: PropTypes.bool,
  graphKey: PropTypes.string
};

MultipleLineChart.defaultProps = { className: '' };

export default MultipleLineChart;
