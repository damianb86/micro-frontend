import { string, number } from 'prop-types';

export const horizontalBarChartItem = {
  name: string.isRequired,
  value: number.isRequired,
  percent: number.isRequired,
  color: string
};

export default horizontalBarChartItem;
