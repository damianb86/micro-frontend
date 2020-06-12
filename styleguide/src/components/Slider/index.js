import React from 'react';
import PropTypes from 'prop-types';

import sliderProps from './propTypes';
import AdvancedSlider from './AdvancedSlider';
import SimpleSlider from './SimpleSlider';
import './index.scss';

const Slider = ({ title, name, options, values, onChange, ...props }) => {
  const handleChange = (val, optionSelected) => onChange(val, name, optionSelected);

  return (
    <div className="custom-slider">
      {title && <div className="custom-slider__title">{title}</div>}
      {options ? (
        <AdvancedSlider options={options} title values={values} onChange={handleChange} />
      ) : (
        <SimpleSlider {...props} values={values} onChange={handleChange} />
      )}
    </div>
  );
};

Slider.defaultProps = { onChange: () => null };

Slider.propTypes = {
  ...sliderProps,
  values: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  onChange: PropTypes.func
};

export default Slider;
