import {
  sortArray,
  getLinkedInSearchURL,
  parseJSON,
  updateOptionsArray,
  addOrRemoveArrayItem,
  featureEnabled,
  recordsWithSelectionDetails,
  isValidEmail,
  isRich,
  getEntityMappedItems,
  getCurrenciesSelectList,
  filterArrayById,
  findEntityById,
  parseSettings,
  calculatePercentage,
  getKeyValueFromQueryString,
  exportFieldsWithCustomFields
} from './common';
import { peopleRows } from '../../__test__/fixtures/people';
import noteCategories, { CALL, INTERVIEW, NEXTSTEP } from '../../__test__/fixtures/notes/NoteCategories';
import { PEOPLE_EXPORT_FIELDS } from '../constants/people';

import { ASC, DESC } from '../constants/common';

const currencies = {
  1: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    id: '1'
  },
  72: {
    code: 'INR',
    symbol: null,
    name: 'Indian Rupee',
    id: '72'
  }
};

const DEMO_FIELD_1 = 'demoField1';
const DEMO_FIELD_2 = 'demoField2';

const DEMO_OPTIONS = [
  { key: DEMO_FIELD_1, defaultValue: true },
  { key: DEMO_FIELD_2, defaultValue: true }
];

describe('sortArray fn', () => {
  it('should return empty array if arr is null', () => {
    expect(sortArray(null, ASC)).toEqual([]);
  });

  it('should sort array of strings with ascending order', () => {
    const arr = ['abc', 'xyz', 'mno'];
    expect(sortArray(arr, ASC)).toEqual(['abc', 'mno', 'xyz']);
  });

  it('should sort array of strings with descending order', () => {
    const arr = ['abc', 'xyz', 'mno'];
    expect(sortArray(arr, DESC)).toEqual(['xyz', 'mno', 'abc']);
  });
});

describe('getLinkedInSearchURL', () => {
  it('should return formatted linkedin search url when name and company name is provided', () => {
    expect(
      getLinkedInSearchURL('Benedict Cumberbatch', 'Marvel Cinematic Universe')
    ).toEqual('https://www.linkedin.com/search/results/index/?keywords=Benedict%20Cumberbatch%20Marvel%20Cinematic%20Universe');
  });

  it('should return formatted linkedin search url when only name provided', () => {
    expect(
      getLinkedInSearchURL('Benedict Cumberbatch')
    ).toEqual('https://www.linkedin.com/search/results/index/?keywords=Benedict%20Cumberbatch%20');
  });

  it('should return formatted linkedin search url when only company name provided', () => {
    expect(
      getLinkedInSearchURL('', 'Marvel Cinematic Universe')
    ).toEqual('https://www.linkedin.com/search/results/index/?keywords=%20Marvel%20Cinematic%20Universe');
  });

  it('should return linkedin search website link when no data is sent', () => {
    expect(
      getLinkedInSearchURL()
    ).toEqual('https://www.linkedin.com/search/results/index/?keywords=%20');
  });
});

describe('parseJSON fn', () => {
  describe('when defaultVal is not passed', () => {
    it('should return empty hash for malformed string JSON', () => {
      expect(parseJSON('')).toEqual({});
    });

    it('should return empty hash for malformed string JSON', () => {
      expect(parseJSON(null)).toEqual({});
    });

    it('should return empty hash for malformed string JSON', () => {
      expect(parseJSON(undefined)).toEqual({});
    });

    it('should return parsed hash otherwise', () => {
      expect(parseJSON('{"candidates":"only_visible_candidates"}')).toEqual({ candidates: 'only_visible_candidates' });
    });
  });

  describe('when defaultVal is passed as an empty array', () => {
    it('should return empty array for malformed string JSON', () => {
      expect(parseJSON('', [])).toEqual([]);
    });

    it('should return empty array for malformed string JSON', () => {
      expect(parseJSON(null, [])).toEqual([]);
    });

    it('should return empty array for malformed string JSON', () => {
      expect(parseJSON(undefined, [])).toEqual([]);
    });

    it('should return parsed array otherwise', () => {
      expect(parseJSON('[1,2,3]', [])).toEqual([1, 2, 3]);
    });
  });
});

describe('updateOptionsArray fn', () => {
  const optionsArray = [{ id: '1', key: 'key1', value: 'Key 1', checked: true }, { id: '2', key: 'key2', value: 'Key 2', checked: false }];

  it('should return updated option array', () => {
    expect(updateOptionsArray(optionsArray, 'key2', true)).toEqual([
      { id: '1', key: 'key1', value: 'Key 1', checked: true },
      { id: '2', key: 'key2', value: 'Key 2', checked: true }
    ]);
  });

  it('should return the same option array when key is incorrect', () => {
    expect(updateOptionsArray(optionsArray, 'key7', true)).toEqual([
      { id: '1', key: 'key1', value: 'Key 1', checked: true },
      { id: '2', key: 'key2', value: 'Key 2', checked: false }
    ]);
  });
});

describe('addOrRemoveArrayItem', () => {
  it('should add the item to the array if not present already', () => {
    expect(addOrRemoveArrayItem(['1', '2', '3'], '5')).toEqual(['1', '2', '3', '5']);
  });

  it('should remove the item from the array if present already', () => {
    expect(addOrRemoveArrayItem(['1', '2', '3'], '3')).toEqual(['1', '2']);
  });
});

describe('featureEnabled', () => {
  const features = {
    1: {
      firmId: 1,
      newPeoplePage: true,
      longList: false
    },
    2: {
      firmId: 2,
      newPeoplePage: false,
      longList: true
    }
  };

  it('should return true since the feature is enabled in the firm', () => {
    expect(featureEnabled(features, 1, 'newPeoplePage')).toEqual(true);
  });

  it('should return false since the feature is disabled in the firm', () => {
    expect(featureEnabled(features, 2, 'newPeoplePage')).toEqual(false);
  });
});

describe('recordsWithSelectionDetails', () => {
  it('should return selected true for selected records only', () => {
    expect(recordsWithSelectionDetails(peopleRows, ['2', '4']).filter(i => i.selected).map(f => f.id)).toEqual(['2', '4']);
  });
});


describe('isValidEmail', () => {
  it('should true if valid emails is supplied', () => {
    expect(isValidEmail('abc@gmail.com')).toBeTruthy();
  });

  it('should true if valid emails is supplied', () => {
    expect(isValidEmail('a')).toBeFalsy();
  });
});

describe('isRich', () => {
  it('should true if string contains HTML tags', () => {
    expect(isRich('Hi <strong>World</strong>')).toBeTruthy();
  });

  it('should true if string does not contains HTML tags', () => {
    expect(isRich('Hi world')).toBeFalsy();
  });
});

describe('getEntityMappedItems', () => {
  const arrayOfObjectEntity = Object.keys(noteCategories).map(i => noteCategories[i]);
  it('should send back entities mapped as per provided first argument', () => {
    const result = getEntityMappedItems(['1', '2'], arrayOfObjectEntity);
    expect(result.find(r => r.name === CALL)).toBeTruthy();
    expect(result.find(r => r.name === INTERVIEW)).toBeTruthy();
  });

  it('should not send back entities whose ids are not provided in first argument', () => {
    const result = getEntityMappedItems(['1', '2'], arrayOfObjectEntity);
    expect(result.find(r => r.name === NEXTSTEP)).toBeFalsy();
  });
});

describe('getCurrenciesSelectList', () => {
  it('should return formatted equity', () => {
    const result = getCurrenciesSelectList(currencies);
    expect(result).toContainEqual({ id: '1', value: 'USD' });
  });
});

describe('filterArrayById fn', () => {
  const optionsArray = [
    { id: '1', key: 'key1', value: 'Key 1' },
    { id: '2', key: 'key2', value: 'Key 2' },
    { id: '3', key: 'key3', value: 'Key 3' }
  ];

  it('should return filtered array', () => {
    expect(filterArrayById(optionsArray, 1)).toEqual([
      { id: '2', key: 'key2', value: 'Key 2' },
      { id: '3', key: 'key3', value: 'Key 3' }
    ]);
  });

  it('should handle null values', () => {
    expect(filterArrayById(optionsArray, null)).toEqual([
      { id: '1', key: 'key1', value: 'Key 1' },
      { id: '2', key: 'key2', value: 'Key 2' },
      { id: '3', key: 'key3', value: 'Key 3' }
    ]);
  });
});

describe('findEntityById fn', () => {
  const optionsArray = [{ id: '1', key: 'key1', value: 'Key 1' }, { id: '2', key: 'key2', value: 'Key 2' }];

  it('should return filtered array', () => {
    expect(findEntityById(optionsArray, 2)).toEqual(
      { id: '2', key: 'key2', value: 'Key 2' }
    );
  });

  it('should handle null values', () => {
    expect(findEntityById(optionsArray, null)).toEqual(undefined);
  });
});


describe('parseSettings fn', () => {
  it('should return empty default values for malformed long list settings JSON', () => {
    expect(parseSettings('', DEMO_OPTIONS)).toEqual({
      [DEMO_FIELD_1]: true,
      [DEMO_FIELD_2]: true
    });
  });

  it('should return empty default values for malformed long list settings JSON', () => {
    expect(parseSettings(null, DEMO_OPTIONS)).toEqual({
      [DEMO_FIELD_1]: true,
      [DEMO_FIELD_2]: true
    });
  });

  it('should return parsed hash otherwise', () => {
    expect(parseSettings('{"demoField1":true, "demoField2":false}', DEMO_OPTIONS)).toEqual({
      [DEMO_FIELD_1]: true,
      [DEMO_FIELD_2]: false
    });
  });
});

describe('calculatePercentage', () => {
  it('should return a percent when value and total are defined', () => {
    const result = calculatePercentage(1, 5);
    expect(result).toEqual(20);
  });
  it('should return 0 if total is undefined', () => {
    const result = calculatePercentage(5);
    expect(result).toEqual(0);
  });
  it('should return 0 if input total is null', () => {
    const result = calculatePercentage(null, 5);
    expect(result).toEqual(0);
  });
  it('should return 0 if total is null', () => {
    const result = calculatePercentage(5, null);
    expect(result).toEqual(0);
  });
});

describe('getKeyValueFromQueryString', () => {
  delete window.location;
  window.location = { search: '?existing_defined_value=3&existing_not_defined_value=' };

  describe('when valid key is passed', () => {
    describe('when parameter exists', () => {
      it('should return the parameter value in query sring', () => {
        expect(getKeyValueFromQueryString('existing_defined_value')).toEqual('3');
      });

      it('should return empty string as parameter value', () => {
        expect(getKeyValueFromQueryString('existing_not_defined_value')).toEqual('');
      });
    });

    describe('when parameter does not exists', () => {
      it('should return undefined', () => {
        expect(getKeyValueFromQueryString('non_existing_value')).toEqual(undefined);
      });
    });
  });

  describe('when invalid key is passed', () => {
    describe('when nothing is passed as key', () => {
      it('should return undefined', () => {
        expect(getKeyValueFromQueryString()).toEqual(undefined);
      });
    });

    describe('when empty string is passed as key', () => {
      it('should return undefined', () => {
        expect(getKeyValueFromQueryString('')).toEqual(undefined);
      });
    });

    describe('when null is passed as key', () => {
      it('should return undefined', () => {
        expect(getKeyValueFromQueryString(null)).toEqual(undefined);
      });
    });

    describe('when undefined is passed as key', () => {
      it('should return undefined', () => {
        expect(getKeyValueFromQueryString(undefined)).toEqual(undefined);
      });
    });

    describe('when non-string value is passed as key', () => {
      it('should return undefined', () => {
        expect(getKeyValueFromQueryString(9)).toEqual(undefined);
      });
    });
  });
});

describe('exportFieldsWithCustomFields', () => {
  const customFields = [
    { id: 1, fieldName: 'Gender', enabled: false },
    { id: 2, fieldName: 'Fav Fruit', enabled: true }
  ];

  it('should return `PEOPLE_EXPORT_FIELDS` when customFields is not present', () => {
    const result = exportFieldsWithCustomFields(PEOPLE_EXPORT_FIELDS, []);
    expect(result).toEqual(PEOPLE_EXPORT_FIELDS);
  });

  it('should add enabled customFields to the optional section of PEOPLE_EXPORT_FIELDS', () => {
    const expectedResult = [PEOPLE_EXPORT_FIELDS[0], { ...PEOPLE_EXPORT_FIELDS[1], values: [...PEOPLE_EXPORT_FIELDS[1].values, { key: 'custom_field_2', label: 'Fav Fruit' }] }];
    const result = exportFieldsWithCustomFields(PEOPLE_EXPORT_FIELDS, customFields);
    expect(result).toEqual(expectedResult);
  });
});
