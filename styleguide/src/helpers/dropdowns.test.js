import { formatAutoCompleteResponseData, formatProjectAutoCompleteResponseData } from './dropdowns';

const autoCompleteResponseData = [
  { id: 1, attributes: { name: 'abcd' } },
  { id: 2, attributes: { name: 'xyz' } }
];

const projectAutoCompleteResponseData = [
  { id: 1, attributes: { name: 'abcd', clientCompanyName: 'c1' } },
  { id: 2, attributes: { name: 'xyz', clientCompanyName: 'c2' } }
];

describe('formatAutoCompleteResponseData fn', () => {
  it('should return an array of object with id and name property', () => {
    const expectedResult = [{ id: 1, name: 'abcd' }, { id: 2, name: 'xyz' }];
    expect(formatAutoCompleteResponseData(autoCompleteResponseData)).toEqual(expectedResult);
  });
});

describe('formatProjectAutoCompleteResponseData fn', () => {
  it('should return an array of object with id and name property', () => {
    const expectedResult = [{ id: 1, name: 'c1 / abcd' }, { id: 2, name: 'c2 / xyz' }];
    expect(formatProjectAutoCompleteResponseData(projectAutoCompleteResponseData)).toEqual(expectedResult);
  });
});
