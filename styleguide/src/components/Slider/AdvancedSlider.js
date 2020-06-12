import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';

import SimpleSlider from './SimpleSlider';
import sliderProps from './propTypes';

const AdvancedSlider = ({ options, values, onChange }) => {
  const [optionSelectedIndex, setOptionSelectedIndex] = useState(Math.max(findIndex(options, 'selected'), 0));
  const [optionValues, setOptionValues] = useState({});
  const optionSelected = options[optionSelectedIndex];

  const handleChangeOptionSelectedIndex = () => {
    const newOptionSelectedIndex = (optionSelectedIndex + 1) % options.length;
    setOptionSelectedIndex(newOptionSelectedIndex);
    onChange(optionValues[newOptionSelectedIndex], options[newOptionSelectedIndex].key);
  };

  const handleChangeSlider = (val) => {
    onChange(val, optionSelected.key);
    setOptionValues({ ...optionValues, [optionSelectedIndex]: val });
  };

  return (
    <Fragment>
      <div className="custom-slider__titles">
        <div
          className="custom-slider__titles__title"
          id={optionSelected.key}
          key={optionSelected.key}
          onClick={handleChangeOptionSelectedIndex}
          role="button"
          tabIndex="0"
        >
          {optionSelected.title}
        </div>
      </div>
      <SimpleSlider {...optionSelected} values={values || optionSelected.values} onChange={handleChangeSlider} />
    </Fragment>
  );
};

AdvancedSlider.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ ...sliderProps })),
  onChange: PropTypes.func
};

export default AdvancedSlider;
