import React from 'react';
import PropTypes from 'prop-types';

import IconTag from '../../../icons/IconTag';

import './index.scss';

const ChartTooltip = ({ title, count, value, color, label }) => {
  const colorStyles = { color };
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__content">
        <div className="chart-tooltip__content__count">
          <span className="chart-tooltip__content__count__item" style={colorStyles}>{count}</span> <span className="chart-tooltip__content__count__label">{label}</span>
        </div>
        <div className="chart-tooltip__content__title">{title}</div>
      </div>
      <div className="chart-tooltip__aside">
        <div className="chart-tooltip__aside__value" style={colorStyles}>
          {value}
        </div>
        <div className="chart-tooltip__aside__color">
          <IconTag width={8} height={8} fill={color} />
        </div>
      </div>
    </div>
  );
};

ChartTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default ChartTooltip;
