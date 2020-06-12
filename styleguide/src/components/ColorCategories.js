import React from 'react';
import PropTypes from 'prop-types';

import SelectOptions from './SelectOptions';

import { COLOR_CATEGORIES } from '../../constants/common';

const ColorCategories = ({ category, className, tabIndex, disabled, onChange }) => {
  const title = (
    <span
      className="candidate-color-category"
      style={{ backgroundColor: COLOR_CATEGORIES[category] || 'grey' }}
    />
  );

  const options = Object.keys(COLOR_CATEGORIES).map((i) => {
    const id = (parseInt(i, 10) === 0) ? '' : i;

    return {
      id,
      value: (
        <span className="candidate-color-category" style={{ backgroundColor: COLOR_CATEGORIES[i] }} data-id={id} />
      )
    };
  });

  const handleSelect = item => onChange(item);

  return (
    <SelectOptions
      className={`color-category-dropdown ${className}`}
      id="bg-nested-dropdown"
      prompt={title}
      name="candidateStatus"
      onSelect={handleSelect}
      tabIndex={tabIndex}
      disabled={disabled}
      options={options}
      allowKeyPress={false}
    />
  );
};

ColorCategories.propTypes = {
  category: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  tabIndex: PropTypes.string,
  disabled: PropTypes.bool
};

export default ColorCategories;
