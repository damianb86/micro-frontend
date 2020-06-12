import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const CardViewRowWithData = ({ title, subtitle, label, date }) => (
  <section className="card-view-row-with-data">
    <section className="card-view-row-with-data__content">
      <div className="card-view-row-with-data__content__title">{title}</div>
      <div className="card-view-row-with-data__content__subtitle">{subtitle}</div>
    </section>
    <section className="card-view-row-with-data__data">
      <div className="card-view-row-with-data__data__label">{label}</div>
      <div className="card-view-row-with-data__data__date">{date}</div>
    </section>
  </section>
);

CardViewRowWithData.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  label: PropTypes.string,
  date: PropTypes.string,
};

export default CardViewRowWithData;
