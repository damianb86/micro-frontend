import React from 'react';
import PropTypes from 'prop-types';

import { hexColor } from '../../../propTypes';

import './index.scss';

import { calculatePercentage } from '../../../helpers/common';

const DonutChartLegend = ({ legendStats, total }) => (
  <ul className="donut-chart-legend">
    {
      legendStats.map(({ id, count, name, color }) => (
        <li key={id} className="donut-chart-legend__item">
          <span className="donut-chart-legend__item__count">{calculatePercentage(count, total)}%</span>
          <span className="donut-chart-legend__item__label">{name}</span>
          <span className="donut-chart-legend__item__color" style={{ backgroundColor: color }} />
        </li>
      ))
    }
  </ul>
);

DonutChartLegend.propTypes = {
  legendStats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      color: hexColor.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  total: PropTypes.number.isRequired
};

export default DonutChartLegend;
