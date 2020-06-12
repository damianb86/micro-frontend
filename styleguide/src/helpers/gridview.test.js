import { headerWithSelectedFields, allKeys, filteredCandidateExportFields, createBatch, loadNewPersonData } from './gridview';
import candidateExportFields, { candidateExportFieldsWithoutAverageRating } from './../../__test__/fixtures/gridview/candidateExportFields';
import { requestPeople, requestPeopleTags } from '../actions/people';

jest.mock('../actions/people');

describe('headerWithSelectedFields fn', () => {
  const showRatingField = jest.fn();
  const selectionHandler = jest.fn();
  const requiredHeaderKeys = ['selected', 'rank', 'action', 'name', 'status', 'categoryColor', 'visibility'];

  // This below line has been kept for reference
  // const notDraggableRequiredKeys = ['selected', 'rank', 'action'];
  // const draggableRequiredKeys = ['name', 'status', 'categoryColor', 'visibility'];

  describe('when selectedFields is empty', () => {
    it('should return only required fields', () => {
      const resultHeaderKeys = headerWithSelectedFields([], showRatingField, 'all', selectionHandler, null).map(f => f.key);
      expect(resultHeaderKeys).toEqual(requiredHeaderKeys);
    });
  });

  describe('when selectedFields is not empty', () => {
    describe('when selectedFields Array do not contain any fields which is both required and draggable', () => {
      it('should return all the required fields followed by selectedFields', () => {
        const selectedHeaders = ['phone', 'location'];
        const requiredAndSelectedKeys = requiredHeaderKeys.concat(selectedHeaders);

        const resultHeaderKeys = headerWithSelectedFields(selectedHeaders, showRatingField, 'all', selectionHandler, null).map(f => f.key);
        expect(resultHeaderKeys).toEqual(requiredAndSelectedKeys);
      });
    });

    describe('when selectedFields Array contain fields which are both required and draggable', () => {
      it('should return all required fields and selectedFields, and draggable required fields should be positioned as per selectedFields array', () => {
        // here name and status are both draggable and required
        // name and status should be positioned as per selectedHeaders array,
        // rest of the required fields should be present at the beginning of the array.
        const selectedHeaders = ['phone', 'name', 'location', 'status'];
        const expectedHeaderKeys = ['selected', 'rank', 'action', 'categoryColor', 'visibility'].concat(selectedHeaders);

        const resultHeaderKeys = headerWithSelectedFields(selectedHeaders, showRatingField, 'all', selectionHandler, null).map(f => f.key);
        expect(resultHeaderKeys).toEqual(expectedHeaderKeys);
      });
    });
  });
});

describe('allKeys fn', () => {
  it('should return expected value', () => {
    const result = allKeys(candidateExportFields);
    expect(result).toEqual(['name', 'position', 'visibility', 'overview', 'average_rating', 'all_positions', 'all_education']);
  });
});

describe('filteredCandidateExportFields fn', () => {
  it('result should contain average_rating when showAverageRating is true', () => {
    const result = filteredCandidateExportFields(candidateExportFields, true);
    expect(result).toEqual(candidateExportFields);
  });

  it('result should not contain average_rating when showAverageRating is false', () => {
    const result = filteredCandidateExportFields(candidateExportFields, false);
    expect(result).toEqual(candidateExportFieldsWithoutAverageRating);
  });
});

describe('createBatch', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  it('should return  the original array if batchSize not present', () => {
    const result = createBatch(array);
    expect(result).toEqual([array]);
  });

  it('should break the array depending upon the batchsize', () => {
    const result = createBatch(array, 3);
    expect(result.length).toEqual(3);
  });

  it('should return chunk depending upon the batchsize and initalBatch size', () => {
    const result = createBatch(array, 3, 4);
    expect(result.length).toEqual(3);
    expect(result[0]).toEqual([1, 2, 3, 4]);
    expect(result[1]).toEqual([5, 6, 7]);
    expect(result[2]).toEqual([8, 9]);
  });
});

describe('loadNewPersonData', () => {
  const response = { payload: { data: [{ relationships: { person: { data: { id: 1 } } } }] } };

  it('should dispatch request people and request people tags action', () => {
    loadNewPersonData(response, jest.fn(() => Promise.resolve()));
    expect(requestPeople).toHaveBeenCalledTimes(1);
    expect(requestPeopleTags).toHaveBeenCalledTimes(1);
  });

  it('should return the response as promise', () => loadNewPersonData(response, jest.fn(() => Promise.resolve())).then((data) => {
    expect(data).toBe(response);
  }));
});
