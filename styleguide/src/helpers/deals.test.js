import headerWithSelectedFields from './deals';

describe('headerWithSelectedFields fn', () => {
  it('should return required header fields along with selected fields when columnWidthvalues is empty', () => {
    const selectedFields = ['dealSize', 'lead', 'description'];
    const expectedResult = [
      { key: 'checkbox', width: 40, required: true },
      { key: 'name', title: 'Name', sortable: true, width: 150, required: true, resizable: true, minWidth: 100 },
      { key: 'dealSize', title: 'Deal Size', sortable: true, width: 150, minWidth: 100, resizable: true, draggable: true },
      { key: 'lead', title: 'Lead', sortable: true, width: 150, minWidth: 100, resizable: true, draggable: true },
      { key: 'description', title: 'About', width: 300, resizable: true, minWidth: 200, draggable: true }
    ];
    const result = headerWithSelectedFields(selectedFields);
    expect(result).toEqual(expectedResult);
  });

  it('should return required header fields along with selected fields when columnWidthvalues is not empty', () => {
    const selectedFields = ['dealSize', 'lead', 'description'];
    const columnWidthValues = { name: 200 };
    const expectedResult = [
      { key: 'checkbox', width: 40, required: true },
      { key: 'name', title: 'Name', sortable: true, width: 200, required: true, resizable: true, minWidth: 100 },
      { key: 'dealSize', title: 'Deal Size', sortable: true, width: 150, minWidth: 100, resizable: true, draggable: true },
      { key: 'lead', title: 'Lead', sortable: true, width: 150, minWidth: 100, resizable: true, draggable: true },
      { key: 'description', title: 'About', width: 300, resizable: true, minWidth: 200, draggable: true }
    ];
    const result = headerWithSelectedFields(selectedFields, columnWidthValues);
    expect(result).toEqual(expectedResult);
  });

  it('should return all the selected deal custom field headers', () => {
    const selectedFields = ['dealSize', 'firm-field-10'];
    const columnWidthValues = { name: 200 };
    const dealFirmFields = [{ id: 10, fieldName: 'Deal ff10' }];
    const expectedResult = [
      { key: 'checkbox', width: 40, required: true },
      { key: 'name', title: 'Name', sortable: true, width: 200, required: true, resizable: true, minWidth: 100 },
      { key: 'dealSize', title: 'Deal Size', sortable: true, width: 150, minWidth: 100, resizable: true, draggable: true },
      { key: 'firm-field-10', title: 'Deal ff10', minWidth: 100, width: 200, resizable: true, draggable: true }
    ];

    const result = headerWithSelectedFields(selectedFields, columnWidthValues, dealFirmFields);
    expect(result).toEqual(expectedResult);
  });
});
