import {
  placementRateExists,
  daysToPlacementExists,
  vectorToDiagonalMatrix,
  getProjectSummaryGroupedByCategory
} from './dashboardUtils';
import { placementRateStats, initialPlacementRateStats } from '../../__test__/fixtures/dashboard/PlacementRate';
import { daysToPlacementStats, initialDaysToPlacementStats } from '../../__test__/fixtures/dashboard/daysToPlacement';
import { projectStats, projectGroupSummary, projectGroupSummaryForNoStats } from '../../__test__/fixtures/dashboard/projectStats';

describe('placementRateExists', () => {
  it('should return true if closed project count is greater than 0', () => {
    const { placement_rate } = placementRateStats;
    const result = placementRateExists(placement_rate);
    expect(result).toEqual(true);
  });
  it('should return false if closed project count is 0', () => {
    const { placement_rate } = initialPlacementRateStats;
    const result = placementRateExists(placement_rate);
    expect(result).toEqual(false);
  });
  it('should return false if the input is empty', () => {
    const result = placementRateExists();
    expect(result).toEqual(false);
  });
  it('should return false if the input is null', () => {
    const result = placementRateExists(null);
    expect(result).toEqual(false);
  });
});

describe('daysToPlacementExists', () => {
  it('should return true if the Firm "Days to Placement" (DTP) count is not 0', () => {
    const result = daysToPlacementExists(daysToPlacementStats);
    expect(result).toEqual(true);
  });
  it('should return false if Firm DTP count is 0', () => {
    const result = daysToPlacementExists(initialDaysToPlacementStats);
    expect(result).toEqual(false);
  });
  it('should return false if the input is empty', () => {
    const result = daysToPlacementExists();
    expect(result).toEqual(false);
  });
  it('should return false if the input is null', () => {
    const result = daysToPlacementExists(null);
    expect(result).toEqual(false);
  });
});

describe('vectorToDiagonalMatrix', () => {
  it('should return the correct matrix', () => {
    const result = vectorToDiagonalMatrix([1, 2, 3, 4, 5, 6]);
    expect(result).toEqual([
      [1, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0],
      [0, 0, 0, 4, 0, 0],
      [0, 0, 0, 0, 5, 0],
      [0, 0, 0, 0, 0, 6]
    ]);
  });

  it('should work with emtpy array', () => {
    const result = vectorToDiagonalMatrix([]);
    expect(result).toEqual([]);
  });

  it('should work with emtpy null', () => {
    const result = vectorToDiagonalMatrix(null);
    expect(result).toEqual([]);
  });

  it('should work with any empty value', () => {
    const result = vectorToDiagonalMatrix('');
    expect(result).toEqual([]);
  });
});

describe('getProjectGroupSummary', () => {
  describe('when project summary is provided', () => {
    it('should add all the counts and percent of different groups', () => {
      const result = getProjectSummaryGroupedByCategory(projectStats);
      expect(result).toEqual(projectGroupSummary);
    });
  });

  describe('when project summary is empty array', () => {
    it('should return all the groups with count and percent as 0', () => {
      const result = getProjectSummaryGroupedByCategory([]);
      expect(result).toEqual(projectGroupSummaryForNoStats);
    });
  });

  describe('when project summary is not provided', () => {
    it('should return all the groups with count and percent as 0', () => {
      const result = getProjectSummaryGroupedByCategory();
      expect(result).toEqual(projectGroupSummaryForNoStats);
    });
  });
});
