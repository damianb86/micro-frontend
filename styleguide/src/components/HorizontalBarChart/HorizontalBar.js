import React from 'react';

import horizontalBarChartItem from './PropTypes';

export const HorizontalBar = ({ name, value, percent, color }) => (
  <div className="horizontal-bar">
    <div className="horizontal-bar__value">{name} <span>{value}</span></div>
    <div className="horizontal-bar__bar">
      <div style={{ width: `${percent || 0}%`, backgroundColor: color }} />
    </div>
  </div>
);

HorizontalBar.propTypes = horizontalBarChartItem;

export default HorizontalBar;
