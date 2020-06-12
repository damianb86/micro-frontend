import { oneOf, string, number, arrayOf, func, shape, oneOfType } from 'prop-types';

export const sliderProps = {
  type: oneOf(['default', 'currency', 'percent']),
  title: string,
  name: string,
  min: number,
  max: number,
  step: number,
  values: oneOfType([arrayOf(number), number]),
  formatter: func,
  colors: arrayOf(shape({
    color: oneOf(['grey', 'red', 'dark-orange', 'light-orange', 'green']),
    minValue: number
  }))
};

export default sliderProps;
