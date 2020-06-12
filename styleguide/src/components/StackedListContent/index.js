import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';

import './index.scss';

const StackedListContent = ({ title, subtitle, tags, labels, children, tabColors }) => (
  <section className="stacked-list-content">
    <section className="stacked-list-content__title">
      <section className="stacked-list-content__title__main">
        <h3 className="stacked-list-content__title__main__item">{title}</h3>
        <section className="stacked-list-content__title__main__tags">
          {tags.map((tag) => {
            if (typeof tag === 'object') {
              return (
                <Tag multiple key={tag.id} color={tag.color}>
                  {tag.name}
                </Tag>
              );
            }
            return (
              <Tag multiple key={tag} color={tabColors[Math.floor(Math.random() * (tabColors.length - 1))]}>
                {tag}
              </Tag>
            );
          })}
        </section>
      </section>
      {subtitle && <h4 className="stacked-list-content__title__sub">{subtitle}</h4>}
    </section>
    <div className="stacked-list-content__body"> {children} </div>
    <span className="stacked-list-content__label">
      {labels.map(label => (
        <span key={label} className="stacked-list-content__label__item">
          {label}
        </span>
      ))}
    </span>
  </section>
);

StackedListContent.defaultProps = {
  tabColors: ['#4faf72', '#4489bf', '#cb764e', '#d2aa4c'],
  tags: [],
  labels: []
};

StackedListContent.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subtitle: PropTypes.string,
  tags: PropTypes.array,
  labels: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  tabColors: PropTypes.array
};

export default StackedListContent;
