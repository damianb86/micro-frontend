import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const CardViewRow = ({ object, icon }) => (
  <section className="card-view-row">
    <section className="card-view-row__content">
      <span className="card-view-row__content__title">{object.title}</span>
      <span className="card-view-row__content__subtitle">{object.subtitle}</span>
    </section>
    <a target="_blank" href={object.linkedUrl} tabIndex={0}>
      {icon}
    </a>
  </section>
);

CardViewRow.propTypes = {
  object: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.node.isRequired,
    linkedUrl: PropTypes.string.isRequired
  }).isRequired,
  icon: PropTypes.node
};

export default CardViewRow;
