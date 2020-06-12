import { string, number } from 'prop-types';

export const dashboardItem = {
  name: string.isRequired,
  value: number.isRequired,
  percent: number,
  color: string
};

export default dashboardItem;
