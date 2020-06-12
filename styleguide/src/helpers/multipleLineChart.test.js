import {
  getDatesUnique,
  getLegend,
  getColumnData,
  getMaxValue,
  getRange,
  datesWithGaps
} from './multipleLineChart';
import noteActivityReport from '../../__test__/fixtures/common/NoteActivityReport';

describe('multipleLineChart', () => {
  it('should return an array of unique strings', () => {
    const result = getDatesUnique(noteActivityReport);
    expect(Array.isArray(result)).toBe(true);
    expect(result.some(r => typeof r !== 'string')).toBe(false);
  });
  it('should return an array of unique strings', () => {
    const result = datesWithGaps(getDatesUnique(noteActivityReport));
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toEqual(18);
  });
  it('should return an array of objects', () => {
    const result = getLegend(noteActivityReport, ['#FFF', '#F000']);
    expect(Array.isArray(result)).toBe(true);
    expect(result.some(r => typeof r !== 'object')).toBe(false);
  });
  it('should return an array', () => {
    const result = getColumnData(noteActivityReport, datesWithGaps(getDatesUnique(noteActivityReport)));
    expect(Array.isArray(result)).toBe(true);
  });
  it('should return the max number in the report', () => {
    const result = getMaxValue(noteActivityReport);
    expect(noteActivityReport.some(noteActivity => noteActivity.data.some(d => d.value > result))).toBe(false);
  });
  it('should return an array 11 numbers between 0 and MaxValue', () => {
    const result = getRange(343);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(11);
    expect(result[0]).toBe(0);
    expect(result[10]).toBe(343);
  });
});
