import React from 'react';
import PropTypes from 'prop-types';

import FormattedPlural from '../FormattedPlural';
import DashboardCardListItem from './DashboardCardListItem';
import dashboardItem from './PropTypes';
import './index.scss';

const DashboardCardList = ({ title, pluralTitle, items }) => (
  <div className="dashboard-list">
    <div className="dashboard-list__title">
      <FormattedPlural number={items.reduce((acc, obj) => acc + obj.value, 0)} options={{ one: title, other: pluralTitle }} />
    </div>
    <div className="dashboard-list__items">
      <ul>
        {items.map(item => (
          <DashboardCardListItem key={item.name} {...item} />
        ))}
      </ul>
    </div>
  </div>
);

DashboardCardList.defaultProps = {
  title: 'Candidate',
  pluralTitle: 'Candidates',
  items: []
};

DashboardCardList.propTypes = {
  title: PropTypes.string,
  pluralTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape(dashboardItem))
};

export default DashboardCardList;
