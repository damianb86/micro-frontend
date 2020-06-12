import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Badge = ({ label, colorClass, shapeClass }) => (
  <span className={classNames('badge', colorClass, shapeClass)}>{label}</span>
);

Badge.defaultProps = { colorClass: '' };
Badge.defaultProps = { shapeClass: '' };

Badge.propTypes = {
  label: PropTypes.string,
  colorClass: PropTypes.string,
  shapeClass: PropTypes.string
};

export default Badge;
