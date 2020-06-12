import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SearchListDropdown from '../SearchListDropdown';
import searchListPropTypes from '../SearchListDropdown/propTypes';
import '../SearchListDropdown/index.scss';

const DynamicSearchListDropdown = ({ onLoadOptions, ...props }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    onLoadOptions().then(newOptions => setOptions(newOptions));
  }, []);

  const handleInputChange = (e) => {
    if (props.handleInputChange) {
      props.handleInputChange(e);
    }

    const { target: { value } } = e;
    if (value.length >= 3) {
      onLoadOptions(value).then(newOptions => setOptions(newOptions));
    }
  };

  return (
    <SearchListDropdown options={options} handleInputChange={handleInputChange} debounceInputChange {...props} />
  );
};

DynamicSearchListDropdown.defaultProps = { onLoadOptions: () => null };

DynamicSearchListDropdown.propTypes = {
  ...searchListPropTypes,
  onLoadOptions: PropTypes.func
};

export default DynamicSearchListDropdown;
