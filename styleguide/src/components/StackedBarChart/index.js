import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import C3Chart from 'react-c3js';
import { format } from 'd3';

import CardView, { CardViewHeader, CardViewBody } from '../../common/CardView';
import SelectOptions from '../../common/SelectOptions';
import ChartLegend from '../ChartLegend';

import './index.scss';

const StackedBarChart = ({ handleFilter, stats, legend, selectedOption, isFilterPresent, className, graphKey, formatLabel }) => {
  if (!stats || isEmpty(stats)) {
    const noDataContent = isFilterPresent ?
      'There is no data to display for your selected filters. Please update your filters and try again' :
      'There is no data to display for this Report';

    return (
      <CardView className="card card--stacked-bar-chart">
        <div className="card__no-stats-data-present-container">{noDataContent}</div>
      </CardView>
    );
  }
  const categoryArray = stats.map(record => record.name);
  const stackTypeArray = legend.map(l => l.key);

  const barDataHash = {};
  legend.forEach((item) => { barDataHash[item.key] = [item.key]; });
  stats.forEach(a => a.barData.forEach(item => (barDataHash[item.key] ? barDataHash[item.key].push(item.value) : null)));

  const columnData = legend.map(item => barDataHash[item.key]);

  const maxValue = Math.ceil(Math.max(...stats.map(a => a.barData.reduce((acc, d) => acc + parseInt(d.value, 10), 0))) / 10) * 10;
  const tickValues = Array(10).fill().map((_, idx) => (idx + 1) * (maxValue / 10));

  const axis = {
    x: {
      show: true,
      type: 'category',
      padding: { right: 0.5 },
      categories: categoryArray,
      height: 80,
      tick: {
        rotate: 30,
        multiline: false
      }
    },
    y: {
      show: true,
      padding: { top: 2, bottom: 0 },
      tick: {
        fit: true,
        values: tickValues,
        outer: false,
        format: formatLabel ? format(',') : ''
      }
    }
  };

  const grid = { y: { show: true, lines: [{ value: 0 }] } };

  const data = {
    columns: columnData,
    type: 'bar',
    groups: [stackTypeArray],
    order: null
  };

  const colors = legend.map(item => item.color);

  let chart = null;
  const changeFocus = item =>
    chart && chart.chart && chart.chart.focus(item);

  const clearFocus = () =>
    chart && chart.chart && chart.chart.revert();

  const disableItem = (item, disable) =>
    chart && chart.chart && (disable ? chart.chart.hide(item) : chart.chart.show(item));

  return (
    <CardView className={`card card--stacked-bar-chart ${className}`}>
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
        <section className="stacked-bar">
          <section className="stacked-bar__chart">
            <C3Chart
              key={graphKey}
              ref={(r) => { chart = r; }}
              data={data}
              axis={axis}
              grid={grid}
              color={{ pattern: colors }}
              size={{ height: 420 }}
              bar={{ width: { ratio: 0.5 } }}
              tooltip={{ show: false }}
              legend={{ show: false }}
              className="c3-stacked-bar-chart"
              style={{ minWidth: categoryArray.length * 30 }}
              onPropsChanged={(props, newProps, chart) => {
                if (!props.axis.x.categories !== newProps.axis.x.categories) { chart.load({ categories: newProps.axis.x.categories }); }
              }}
            />
          </section>
          <section className="stacked-bar__right">
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

StackedBarChart.defaultProps = { className: '', formatLabel: false };

StackedBarChart.propTypes = {
  className: PropTypes.string,
  stats: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    barData: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }))
  })),
  legend: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      key: PropTypes.string,
      color: PropTypes.string
    })
  ),
  handleFilter: PropTypes.func,
  selectedOption: PropTypes.string,
  isFilterPresent: PropTypes.bool,
  graphKey: PropTypes.string,
  formatLabel: PropTypes.bool
};

export default StackedBarChart;
