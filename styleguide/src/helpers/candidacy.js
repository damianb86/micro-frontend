import { isEmpty, keyBy } from 'lodash';
import { defaultMemoize } from 'reselect';

export const memoizedKeyBy = defaultMemoize((entities, key) => keyBy(entities, key));

export const getCandidacyStats = defaultMemoize((candidacyStatsEntities, candidacyId) => {
  const candidacyStatByCandidacyId = memoizedKeyBy(candidacyStatsEntities, 'candidacyId');
  return candidacyStatByCandidacyId[candidacyId];
});

export const mapScreeningQuestionsWithRating = (screeningQuestionsRatings, screeningQuestions) => {
  if (!isEmpty(screeningQuestionsRatings) && !isEmpty(screeningQuestions)) {
    const ratingsByScreeningQuestionId = memoizedKeyBy(screeningQuestionsRatings, 'screeningQuestionId');

    return screeningQuestions.map(question => ({
      ...question,
      rating: (ratingsByScreeningQuestionId[question.id] && ratingsByScreeningQuestionId[question.id].rating) || 0
    }));
  }

  return [];
};

export const changeRatingDataFormat = defaultMemoize(screeningQuestionsRatings =>
  (screeningQuestionsRatings && screeningQuestionsRatings.reduce((acc, q) => { acc[q.screeningQuestionId] = q.rating; return acc; }, {})) || {});

export const getStatusesWithSelectedOption = (selectedStatus, statuses) => {
  if (selectedStatus && !statuses.find(option => option.id === selectedStatus.id)) {
    return [{ id: selectedStatus.id, value: selectedStatus.name }, ...statuses];
  }

  return statuses;
};
