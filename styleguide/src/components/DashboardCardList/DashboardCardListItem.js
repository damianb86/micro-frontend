import React from 'react';

import dashboardItem from './PropTypes';

const DashboardCardListItem = ({ name, color, value, percent }) => (
  <li>
    <span className="dashboard-list__items__item__color" style={{ backgroundColor: color }} />
    <span className="dashboard-list__items__item__name" >{name}</span>
    <span className="dashboard-list__items__item__value" >{value}</span>
    <span className="dashboard-list__items__item__percent" >{percent}%</span>
  </li>
);

DashboardCardListItem.propTypes = dashboardItem;

export default DashboardCardListItem;
