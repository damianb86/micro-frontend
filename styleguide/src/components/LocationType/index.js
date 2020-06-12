import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const LocationType = ({ type }) => <span className="location-type"> ({type.name})</span>;

LocationType.propTypes = {
  type: PropTypes.shape({ name: PropTypes.string.isRequired })
};

export default LocationType;
