import { getColumnData } from './donutChart';
import stats, { DONUT_CHART_LEGEND } from '../../__test__/fixtures/common/donutChart';

describe('donutChart', () => {
  it('should return an array', () => {
    const result = getColumnData(stats, DONUT_CHART_LEGEND);
    expect(Array.isArray(result)).toBe(true);
  });
});