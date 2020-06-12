import {
  memoizedKeyBy,
  getCandidacyStats,
  mapScreeningQuestionsWithRating,
  getStatusesWithSelectedOption
} from './candidacy';

import { statusesByIdValue } from './../../__test__/fixtures/statuses';
import CANDIDACIES_STATS_ENTITIES from '../../__test__/fixtures/candidacy/candidacyStatsEntities';
import SCREENING_QUESTIONS_ENTITIES from '../../__test__/fixtures/project/ScreeningQuestions';
import SCREENING_QUESTIONS_RATINGS from '../../__test__/fixtures/candidacy/screeningQuestionsRatings';

describe('memoizedKeyBy', () => {
  const entities = [
    { id: 1, candidacyId: 100 },
    { id: 2, candidacyId: 200 }
  ];

  it('should return expected result', () => {
    const result = memoizedKeyBy(entities, 'candidacyId');
    const expectedResult = {
      100: { id: 1, candidacyId: 100 },
      200: { id: 2, candidacyId: 200 }
    };

    expect(result).toEqual(expectedResult);
  });
});

describe('getCandidacyStats', () => {
  const { candidacyId } = CANDIDACIES_STATS_ENTITIES[0];

  it('should return expected result', () => {
    const result = getCandidacyStats(CANDIDACIES_STATS_ENTITIES, candidacyId);
    const expectedResult = CANDIDACIES_STATS_ENTITIES[0];

    expect(result).toEqual(expectedResult);
  });
});

describe('mapScreeningQuestionsWithRating', () => {
  it('should return null when screening questions is empty', () => {
    const result = mapScreeningQuestionsWithRating([], []);
    expect(result).toEqual([]);
  });

  it('should map screeningQuestions with there ratings', () => {
    const result = mapScreeningQuestionsWithRating(SCREENING_QUESTIONS_RATINGS, SCREENING_QUESTIONS_ENTITIES.data);
    const ratingArray = result.map(question => question.rating);
    const expectedRatingArray = SCREENING_QUESTIONS_RATINGS.map(ratingEntity => ratingEntity.rating);

    expect(ratingArray.sort()).toEqual(expectedRatingArray.sort());
  });
});

describe('getStatusesWithSelectedOption', () => {
  it('should return original statuses when selectedStatus is null', () => {
    const result = getStatusesWithSelectedOption(null, statusesByIdValue);
    expect(result).toEqual(statusesByIdValue);
  });

  it('should return original statuses when selectedStatus is already present in the statuses array', () => {
    const result = getStatusesWithSelectedOption(statusesByIdValue[0], statusesByIdValue);
    expect(result).toEqual(statusesByIdValue);
  });

  it('should add selected status when it is not present in the statuses array', () => {
    const selectedStatus = { id: 999999, name: 'selected status for candidate' };
    const result = getStatusesWithSelectedOption(selectedStatus, statusesByIdValue);
    expect(result).toEqual([{ id: selectedStatus.id, value: selectedStatus.name }, ...statusesByIdValue]);
  });
});
