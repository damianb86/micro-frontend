/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

import StackedListContent from '../StackedListContent';

import './index.scss';

const StackedList = ({ items, LeftIcon, RightIconTop, onRightIconTopClick }) => (
  <ul className="stacked-list">
    {items.map(item => (
      <li key={item.id} className="stacked-list__item">
        <section className="stacked-list__item__icon">
          <LeftIcon />
        </section>
        <StackedListContent title={item.title} subTitle={item.subTitle} tags={item.tags} labels={item.labels}>
          {item.body}
        </StackedListContent>
        <section className="stacked-list__item__action-controls">
          <a>
            <RightIconTop onClick={onRightIconTopClick} />
          </a>
        </section>
      </li>
    ))}
  </ul>
);

StackedList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      subTitle: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      ),
      labels: PropTypes.arrayOf(PropTypes.string),
      body: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    })
  ),
  LeftIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  RightIconTop: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  onRightIconTopClick: PropTypes.func
};

export default StackedList;
