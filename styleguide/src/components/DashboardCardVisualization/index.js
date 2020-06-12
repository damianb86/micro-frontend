import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import C3Chart from 'react-c3js';
import maxBy from 'lodash/maxBy';
import sumBy from 'lodash/sumBy';

import ChartLegend from '../ChartLegend';
import dashboardItem from '../DashboardCardList/PropTypes';
import { vectorToDiagonalMatrix } from '../../../helpers/dashboardUtils';
import { addOrRemoveArrayItem } from '../../../helpers/common';
import './index.scss';

const DashboardCardVisualization = ({ items, isAnimationDisabled }) => {
  const [values, setValues] = useState(Array(items.length).fill(0));
  const [disabledCategories, setDisabledCategories] = useState([]);

  const chartRef = useRef();
  const data = vectorToDiagonalMatrix(values);
  const filteredValues = items.filter(item => !disabledCategories.includes(item.name));
  const maxValue = filteredValues.length ? maxBy(filteredValues, 'value').value : 0;
  const ticksCount = Math.min(6, maxValue + 1);
  const graphKey = `graphKey-${maxValue}`;

  const chartConfig = {
    axis: {
      x: {
        show: false,
        tick: { outer: false }
      },
      y: {
        tick: {
          fit: false,
          outer: false,
          values: Array(ticksCount + 1).fill().map((_, idx) => Math.ceil(idx * (maxValue / ticksCount), 10))
        },
        label: { text: 'Candidates', position: 'outer-middle' },
        padding: 0
      }
    },
    data: {
      type: 'bar',
      rows: [
        items.map(item => item.key),
        ...data
      ],
      groups: [items.map(item => item.name)]
    },
    size: { height: 140 },
    color: { pattern: items.map(item => item.color) },
    bar: { width: 3.5 },
    tooltip: { show: false },
    legend: { show: false },
    grid: { y: { show: true } },
    padding: { left: 45 },
    key: graphKey
  };

  if (isAnimationDisabled) {
    chartConfig.transition = { duration: null };
    chartConfig.interaction = { enabled: false };
  }

  const handleChangeFocus = item =>
    chartRef.current && chartRef.current.chart && chartRef.current.chart.focus(item);

  const handleClearFocus = () =>
    chartRef.current && chartRef.current.chart && chartRef.current.chart.revert();

  const handleDisableItem = (item, isDisabled) => {
    if (chartRef.current && chartRef.current.chart) {
      if (isDisabled) {
        chartRef.current.chart.hide(item);
      } else {
        chartRef.current.chart.show(item);
      }
      setDisabledCategories(addOrRemoveArrayItem(disabledCategories, item));
    }
  };

  useEffect(() => {
    // This effect is for animation purposes
    setValues(items.map(item => item.value));
  }, []);

  useEffect(() => {
    // This is because we change the graph ID
    disabledCategories.forEach(item => chartRef.current.chart.hide(item));
  }, [disabledCategories.length]);

  return (
    <div className="dashboard-visualization">
      <div className="dashboard-visualization__legend">
        <div className="dashboard-visualization__legend__count">
          <div className="dashboard-visualization__legend__count__number">
            {sumBy(items, 'value')}
          </div>
          <div className="dashboard-visualization__legend__count__text">
            Total Candidates
          </div>
        </div>
        <div className="dashboard-visualization__legend__legend">
          <ChartLegend
            key="graphKey"
            items={items}
            onMouseOver={handleChangeFocus}
            onMouseLeave={handleClearFocus}
            onDisable={handleDisableItem}
          />
        </div>
      </div>
      <div className="dashboard-visualization__chart">
        <C3Chart
          ref={chartRef}
          className="status-report-chart"
          {...chartConfig}
        />
      </div>
    </div>
  );
};

DashboardCardVisualization.defaultProps = { items: [], isAnimationDisabled: false };

DashboardCardVisualization.propTypes = { items: PropTypes.arrayOf(PropTypes.shape(dashboardItem)), isAnimationDisabled: PropTypes.bool };

export default DashboardCardVisualization;
