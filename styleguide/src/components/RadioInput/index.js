import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const RadioInput = ({ onChange, checked, value, name, tabIndex, disabled, className, labelClassName, label }) => {
  const radioButton = (
    <span className="radio-button-wrapper__input">
      <input
        type="radio"
        onChange={onChange}
        readOnly={!onChange}
        checked={checked}
        value={value}
        name={name}
        tabIndex={tabIndex}
        disabled={disabled}
        className={`radio-button-wrapper__input__item ${className}`}
      />
      <span className="radio-button-wrapper__input__custom" />
    </span>
  );

  if (label) {
    return (
      <label className={`radio-button-wrapper ${disabled ? 'disabled' : ''}`}>
        {radioButton}
        <span className={`radio-button-wrapper__label ${labelClassName}`}>{label}</span>
      </label>
    );
  }

  return radioButton;
};

RadioInput.defaultProps = { className: '', checked: false };

RadioInput.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  tabIndex: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioInput;
