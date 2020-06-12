import { getLocationTypeArray } from './locationType';

const locationTypeEntities = {
  3: { name: 'work', id: '3' },
  2: { name: 'home', id: '2' }
};

const expectedOutput = [
  { id: '2', value: 'home' },
  { id: '3', value: 'work' }
];

describe('getLocationTypeArray fn', () => {
  it('should return expected value', () => {
    const result = getLocationTypeArray(locationTypeEntities);
    expect(result.sort((a, b) => (a.id - b.id))).toEqual(expectedOutput);
  });

  it('should return empty array if locationTypeEntities is empty hash', () => {
    const result = getLocationTypeArray({});
    expect(result).toEqual([]);
  });
});
