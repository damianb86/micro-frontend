import { isCustomFieldFormDisabled, getFirmFieldsFilters } from './customField';
import FIRM_FIELD_ENTITIES from '../../__test__/fixtures/firms/firmFields';

describe('isCustomFieldFormDisabled fn', () => {
  const record = { id: 1, fieldName: 'Field 1', inputType: 'text', placeholder: 'placeholder text 1', selectOptions: 'a\nb', includeOnDashboard: false, objectType: 'project' };
  let result;

  describe('when fieldName is empty - should always be return disabled as true', () => {
    it('should return true even when record is empty hash', () => {
      result = isCustomFieldFormDisabled('', '', '', {});
      expect(result).toBeTruthy();
    });
  });

  describe('when fieldName is not empty', () => {
    it('should return true if fieldName, inputType or placeholder have not changed', () => {
      result = isCustomFieldFormDisabled(record.fieldName, '', '', '', false, record, record.objectType);
      expect(result).toBeTruthy();

      result = isCustomFieldFormDisabled(record.fieldName, record.inputType, '', '', false, record, record.objectType);
      expect(result).toBeTruthy();

      result = isCustomFieldFormDisabled(record.fieldName, record.inputType, record.placeholder, '', false, record, record.objectType);
      expect(result).toBeTruthy();

      result = isCustomFieldFormDisabled(record.fieldName, 'select', record.placeholder, record.selectOptions, false, { ...record, inputType: 'select' }, record.objectType);
      expect(result).toBeTruthy();
    });

    it('should return false if fieldName has not changed but other values have changed', () => {
      result = isCustomFieldFormDisabled(record.fieldName, 'select', '', '', false, record, record.objectType);
      expect(result).toBeFalsy();

      result = isCustomFieldFormDisabled(record.fieldName, 'text', 'placeholder 2', '', false, record, record.objectType);
      expect(result).toBeFalsy();
    });

    it('should return true if fieldName is present even though record empty hash', () => {
      // record will be empty hash for new record, i.e., while adding a record
      result = isCustomFieldFormDisabled('field name', '', '', '', false, {}, '');
      expect(result).toBeTruthy();
    });

    it('should return false only if fieldName and objectType is present even though record empty hash', () => {
      // record will be empty hash for new record, i.e., while adding a record
      result = isCustomFieldFormDisabled('field name', '', '', '', false, {}, 'project');
      expect(result).toBeFalsy();
    });
  });

  it('should return false when inputType has changed', () => {
    result = isCustomFieldFormDisabled(record.fieldName, 'multi_select', record.placeholder, '', false, record, record.objectType);
    expect(result).toBeFalsy();
  });

  it('should return false when placeholder has changed', () => {
    result = isCustomFieldFormDisabled(record.fieldName, record.inputType, 'placeholder text 2', '', false, record, record.objectType);
    expect(result).toBeFalsy();
  });
});

describe('getFirmFieldsFilters', () => {
  it('should provide list of firm fields in key-name-label format', () => {
    const result = getFirmFieldsFilters([FIRM_FIELD_ENTITIES[5], FIRM_FIELD_ENTITIES[6]]);
    expect(result).toEqual([
      { key: 'custom_field_5', name: 'custom_field_5', label: 'ProjectCF1' },
      { key: 'custom_field_6', name: 'custom_field_6', label: 'ProjectCF2' }
    ]);
  });
});
