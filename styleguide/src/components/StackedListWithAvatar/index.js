import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import StackedListContent from '../StackedListContent';

import './index.scss';

const StackedListWithAvatar = ({ items, RightIconTop, RightIconBottom, onRightIconTopClick, onRightIconBottomClick }) => (
  <ul className="stacked-list-with-avatar">
    {items.map(item => (
      <li key={item.id} className="stacked-list-with-avatar__item">
        <section className="stacked-list-with-avatar__item__avatar">
          <Avatar name={item.title} src={item.avatar} type="circle" />
        </section>
        <StackedListContent title={item.title} tags={item.tags} labels={item.labels}>
          {item.body}
        </StackedListContent>
        <section className="stacked-list-with-avatar__item__action-controls">
          <a>
            <RightIconTop onClick={onRightIconTopClick} />
          </a>
          <a>
            <RightIconBottom onClick={onRightIconBottomClick} />
          </a>
        </section>
      </li>
    ))}
  </ul>
);

StackedListWithAvatar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      subTitle: PropTypes.string,
      avatar: PropTypes.string,
      tags: PropTypes.array,
      labels: PropTypes.arrayOf(PropTypes.string),
      body: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    })
  ),
  RightIconTop: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  RightIconBottom: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  onRightIconTopClick: PropTypes.func,
  onRightIconBottomClick: PropTypes.func
};

export default StackedListWithAvatar;
