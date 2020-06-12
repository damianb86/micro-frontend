import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RadioInput from '../RadioInput';
import './index.scss';

const RadioInputGroup = ({ items, onChange }) => {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <Fragment>
      {items.map(item => (
        <RadioInput
          {...item}
          key={item.value}
          onChange={handleChange}
        />
      ))}
    </Fragment>
  );
};

RadioInputGroup.defaultProps = { onChange: () => null };

RadioInputGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    tabIndex: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    labelClassName: PropTypes.string
  })),
  onChange: PropTypes.func
};

export default RadioInputGroup;
