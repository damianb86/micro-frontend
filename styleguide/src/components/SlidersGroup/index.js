import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Slider from '../Slider';
import sliderProps from '../Slider/propTypes';
import './index.scss';

const SlidersGroup = ({ sliders, slidersValues, className, onChange }) => (
  sliders.map(slider => (
    <div className={classNames('sliders-group__slider', className)} key={slider.name}>
      <Slider {...slider} values={slidersValues[slider.name] || slider.values} onChange={onChange} />
    </div>
  ))
);

SlidersGroup.defaultProps = {
  sliders: [],
  slidersValues: {},
  onChange: () => null
};

SlidersGroup.propTypes = {
  sliders: PropTypes.arrayOf(
    PropTypes.shape({
      ...sliderProps,
      onChange: PropTypes.func
    }),
  ),
  slidersValues: PropTypes.object,
  onChange: PropTypes.func
};

export default SlidersGroup;
