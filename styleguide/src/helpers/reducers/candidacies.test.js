import { handleSortState } from './candidacies';

describe('helper:candidacies', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('handleSortState', () => {
    const methodSetup = (payload = { sort: 'name', direction: true },
      prevState = { sort: [], sortAscending: [] }, maxLength = 3) => handleSortState(payload, prevState, maxLength);

    it('it should add item', () => {
      const res = methodSetup();
      expect(res).toEqual({ sortDir: [true], sortField: ['name'] });
    });

    it('should add new item to the first index', () => {
      const prevState = { sort: ['name'], sortAscending: [true] };
      const res = methodSetup({ sort: 'company', direction: false }, prevState);
      expect(res.sortField).toEqual(['company', 'name']);
      expect(res.sortDir).toEqual([false, true]);
    });

    it('should remove if item already exist', () => {
      const prevState = { sort: ['name', 'company', 'position'], sortAscending: [true, false, true] };
      const res = methodSetup({ sort: 'company', direction: true }, prevState);
      expect(res.sortField).toEqual(['company', 'name', 'position']);
      expect(res.sortDir).toEqual([true, true, true]);
    });

    it('should not allow more than maxLength', () => {
      const maxLength = 2;
      const prevState = { sort: ['name', 'company', 'rank'], sortAscending: [true, false, false] };
      const res = methodSetup({ sort: 'position', direction: false }, prevState, maxLength);
      expect(res.sortDir.length).toEqual(maxLength);
      expect(res.sortField.length).toEqual(maxLength);
    });
  });
});
