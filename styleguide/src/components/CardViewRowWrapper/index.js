import React from 'react';
import PropTypes from 'prop-types';

const CardViewRowWrapper = ({ children, className }) => (
  <section className={`card-view-row ${className}`}>
    <section className="card-view-row__content">
      {children}
    </section>
  </section>
);

CardViewRowWrapper.defaultProps = { className: '' };

CardViewRowWrapper.propTypes = { className: PropTypes.string };

export default CardViewRowWrapper;
