import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import searchListPropTypes from '../SearchListDropdown/propTypes';
import SelectOptions from '../SelectOptions';

const DynamicSelectOptions = ({ onLoadOptions, ...props }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    onLoadOptions().then(newOptions => setOptions(newOptions));
  }, []);

  return (
    <SelectOptions options={options} {...props} />
  );
};

DynamicSelectOptions.defaultProps = { onLoadOptions: () => null };

DynamicSelectOptions.propTypes = {
  ...searchListPropTypes,
  onLoadOptions: PropTypes.func
};

export default DynamicSelectOptions;
