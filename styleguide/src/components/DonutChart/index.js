import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import C3Chart from 'react-c3js';

import CardView, { CardViewHeader, CardViewBody } from '../../common/CardView';
import SelectOptions from '../../common/SelectOptions';
import ChartLegend from '../ChartLegend';
import { getColumnData } from '../../../helpers/donutChart';

import './index.scss';

const DonutChart = ({ handleFilter, stats, legend, selectedOption, isFilterPresent, className, graphKey }) => {
  if (!stats || isEmpty(stats)) {
    const noDataContent = isFilterPresent ?
      'There is no data to display for your selected filters. Please update your filters and try again' :
      'There is no data to display for this Report';

    return (
      <CardView className="card donut-chart">
        <div className="donut-chart__content donut-chart__content--no-stats">{noDataContent}</div>
      </CardView>
    );
  }

  const chartData = {
    columns: getColumnData(stats, legend),
    type: 'donut'
  };

  let chart = null;
  const changeFocus = item =>
    chart && chart.chart && chart.chart.focus(item);

  const clearFocus = () =>
    chart && chart.chart && chart.chart.revert();

  const disableItem = (item, disable) =>
    chart && chart.chart && (disable ? chart.chart.hide(item) : chart.chart.show(item));

  return (
    <CardView className={`card donut-chart ${className}`}>
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
        <section className="donut-chart__content">
          <section className="donut-chart__content__diagram">
            <C3Chart
              key={graphKey}
              ref={(r) => { chart = r; }}
              data={chartData}
              color={{ pattern: legend.map(s => s.color) }}
              donut={{ width: 70, expand: false }}
              size={{ width: 360, height: 360 }}
              legend={{ show: false }}
              tooltip={{ show: false }}
              className="c3-chart"
            />
          </section>
          <section className="donut-chart__content__legend">
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

DonutChart.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }))
  })),
  legend: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      key: PropTypes.string,
      color: PropTypes.string
    })
  ),
  handleFilter: PropTypes.func,
  selectedOption: PropTypes.string,
  isFilterPresent: PropTypes.bool,
  className: PropTypes.string,
  graphKey: PropTypes.string
};

export default DonutChart;
