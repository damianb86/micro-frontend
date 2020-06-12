import { headerWithSelectedFields, findSurvivor, personProjectList } from './people';
import { peopleRows } from '../../__test__/fixtures/people';
import { PEOPLE_EXPORT_FIELDS } from './../constants/people';

describe('headerWithSelectedFields fn', () => {
  const requiredHeaderKeys = ['selected', 'name', 'company'];

  it('should return only required fields when selectedFields and columnWidthvalues are empty', () => {
    expect(headerWithSelectedFields([], null).map(f => f.key)).toEqual(requiredHeaderKeys);
  });

  it('should return required header fields along with selected fields when columnWidthvalues is empty', () => {
    const selectedFields = ['position', 'biography', 'email'];
    const requiredAndSelectedKeys = requiredHeaderKeys.concat(selectedFields);
    expect(headerWithSelectedFields(selectedFields, null).map(f => f.key)).toEqual(requiredAndSelectedKeys);
  });

  it('should return required header fields along with selected fields when columnWidthvalues is present', () => {
    const selectedFields = ['position', 'biography', 'email'];
    const columnWidthValues = { name: 200, position: 170 };
    const requiredAndSelectedKeys = requiredHeaderKeys.concat(selectedFields);
    const result = headerWithSelectedFields(selectedFields, columnWidthValues);
    expect(result.map(f => f.key)).toEqual(requiredAndSelectedKeys);
    expect(result.filter(i => i.key === 'name')[0].width).toEqual(200);
    expect(result.filter(i => i.key === 'position')[0].width).toEqual(170);
  });

  it('should return master checkbox when atleast one person is selected', () => {
    const selectedFields = ['position', 'biography', 'email'];
    const selectionHandler = jest.fn();
    const result = headerWithSelectedFields(selectedFields, null, true, selectionHandler);
    expect(result[0].title.type.name).toBe('CheckBox');
  });

  it('should not return master checkbox when no person is selected', () => {
    const selectedFields = ['position', 'biography', 'email'];
    const result = headerWithSelectedFields(selectedFields, null, false, null);
    expect(result[0].title).toBe(undefined);
  });
});

describe('findSurvivor()', () => {
  it('should return last updated person id', () => {
    expect(findSurvivor(peopleRows.map(i => i.id), peopleRows)).toEqual('3');
  });
});

describe('personProjectList', () => {
  it('should not include more link when total is not more than 3', () => {
    const result = personProjectList({ list: [{ id: 1, attributes: {} }, { id: 2, attributes: {} }], total: 2 }, 1);
    expect(result[result.length - 1].title).not.toBe('more...');
  });

  it('should include more link when total is more than 3', () => {
    const result = personProjectList({ list: [{ id: 1, attributes: {} }, { id: 2, attributes: {} }, { id: 3, attributes: {} }, { id: 4, attributes: {} }], total: 4 }, 1);
    expect(result[result.length - 1].title).toBe('more...');
  });
});
