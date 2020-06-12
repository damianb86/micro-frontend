import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import searchListPropTypes from '../SearchListDropdown/propTypes';
import SearchListRadioDropdown from '../SearchListRadioDropdown';

const DynamicSearchListRadioDropdown = ({ onLoadOptions, onLoadMore, ...props }) => {
  const [page, setPage] = useState(1);
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
      onLoadOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setPage(1);
      });
    }
  };

  const handleLoadMore = () => {
    onLoadMore(page + 1).then((newOptions) => {
      setOptions(options.concat(newOptions));
      setPage(page + 1);
    });
  };

  return (
    <SearchListRadioDropdown
      options={options}
      handleInputChange={handleInputChange}
      onLoadMore={handleLoadMore}
      debounceInputChange
      {...props}
    />
  );
};

DynamicSearchListRadioDropdown.defaultProps = { onLoadOptions: () => null };

DynamicSearchListRadioDropdown.propTypes = {
  ...searchListPropTypes,
  onLoadOptions: PropTypes.func
};

export default DynamicSearchListRadioDropdown;
