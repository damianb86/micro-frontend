import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import findLastIndex from 'lodash/findLastIndex';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import sliderProps from './propTypes';
import formatters from './formatters';

const SimpleSlider = ({ type, min, max, step, values, marks, formatter, colors, isRange, onChange }) => {
  const [sliderType, setSliderType] = useState(null);
  const [currentColor, setCurrentColor] = useState('default');
  const [defaultValue, setDefaultValue] = useState(values || (isRange ? [min, max] : min));
  const SliderWithTooltip = useRef(null);
  const tipFormatter = formatter || (formatters[type] || formatters.default);

  const setColor = (val) => {
    if (!isRange && Array.isArray(colors)) {
      const nextColorIndex = findLastIndex(colors, ({ minValue }) => val >= minValue);
      if (nextColorIndex !== -1 && colors[nextColorIndex].color !== currentColor) {
        setCurrentColor(colors[nextColorIndex].color);
        setDefaultValue(val);
      }
    }
  };

  const setSliderComponent = () => {
    const nextSliderType = isRange ? 'range' : 'slider';
    if (nextSliderType !== sliderType) {
      SliderWithTooltip.current = createSliderWithTooltip(nextSliderType === 'range' ? Range : Slider);
      setSliderType(nextSliderType);
    }
  };

  useEffect(() => {
    setDefaultValue(values || (isRange ? [min, max] : min));
    setColor(values);
  }, [values]);

  useEffect(() => {
    setSliderComponent();
  }, []);

  return (SliderWithTooltip && sliderType &&
    <SliderWithTooltip.current
      key="slider"
      min={min}
      max={max}
      step={step}
      marks={marks || { [min]: tipFormatter(min), [max]: tipFormatter(max) }}
      tipFormatter={tipFormatter}
      defaultValue={defaultValue}
      tipProps={{ placement: 'top', prefixCls: `color-${currentColor} rc-slider-tooltip` }}
      onAfterChange={onChange}
      onChange={setColor}
      className={`color-${currentColor}`}
    />
  );
};

SimpleSlider.defaultProps = {
  isRange: true,
  type: 'default',
  min: 0,
  max: 100,
  step: 1,
  onChange: () => null
};

SimpleSlider.propTypes = {
  ...sliderProps,
  onChange: PropTypes.func
};

export default SimpleSlider;

