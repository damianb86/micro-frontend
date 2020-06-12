import {
  getStreet,
  getLocality,
  getRegionName,
  getYear,
  getEquity,
  formatDates,
  getBonus,
  calculateExperience
} from './person';
import regionEntities from './../../__test__/fixtures/common/Regions';
import locationTypeEntities from './../../__test__/fixtures/common/CoreLocationTypes';

describe('getStreet function', () => {
  it('should return expected value when `street` and `street2` are empty string', () => {
    const result = getStreet({ street: '', street2: '' });
    expect(result).toBe('');
  });

  it('should return expected value when `street` is not empty and `street2` is empty string', () => {
    const result = getStreet({ street: "North point", street2: "" });
    expect(result).toBe('North point');
  });

  it('should return expected value when `street` and `street2` are not empty string', () => {
    const result = getStreet({ street: "North point", street2: "western road" });
    expect(result).toBe('North point western road');
  });
});

describe('getLocality function', () => {
  it('should return expected value when city, state and postalCode are empty string', () => {
    const result = getLocality({ city: '', state: '', postalCode: '' });
    expect(result).toBe('');
  });

  it('should return expected value when city, state are not empty, postalCode is empty', () => {
    const result = getLocality({ city: 'Kolkata', state: 'West Bengal', postalCode: '' });
    expect(result).toBe('Kolkata, West Bengal');
  });

  it('should return expected value for record 3', () => {
    const result = getLocality({ city: 'Kolkata', state: 'West Bengal', postalCode: "700001" });
    expect(result).toBe('Kolkata, West Bengal, 700001');
  });
});

describe('getRegionName function', () => {
  const record = {};

  it('should return null when region corresponding to given record object is not present', () => {
    expect(getRegionName({}, regionEntities)).toBeNull();
  });

  it('should return expected region name when region corresponding to given region id is present', () => {
    record.regionId = regionEntities[581].id;
    expect(getRegionName(record, regionEntities)).toBe(regionEntities[581].name);
  });
});

describe('getYear function', () => {
  it('should return expected value when both startYear and endYear are present', () => {
    const result = getYear(2000, 2002);
    expect(result).toBe('2000 - 2002');
  });

  it('should return expected value when endYear is not present', () => {
    const result = getYear(2000, '');
    expect(result).toBe('2000 - present');
  });
});

describe('getEquity function', () => {
  it('when equityType is `percent` then  for `equity = 5.0` it should return `5.0%`', () => {
    const result = getEquity('5.0', 'percent');
    expect(result).toBe('5.0%');
  });

  it('when `equityType = cash` then for `equity = 5.0` it should return `5%`', () => {
    const result = getEquity('5', 'cash');
    expect(result).toBe('$5');
  });

  it('when `equityType = share` then for `equity = 5.0` it should return `5 shares`', () => {
    const result = getEquity('5.0', 'share');
    expect(result).toBe('5 shares');
  });
});

describe('getBonus function', () => {
  it('when bonusType is cash it should return `$2,000` for bonus = 2000', () => {
    const result = getBonus('2000', 'cash');
    expect(result).toBe('$2,000');
  });

  it('when bonusType is not cash it should return `bonus + %`', () => {
    const result = getBonus('12', 'percent');
    expect(result).toBe('12%');
  });
});

describe('formatDates', () => {
  it('should return blank string if no params passed to function', () => {
    const result = formatDates();
    expect(result).toBe('');
  });

  it('should return startYear to "present" if present endYear not present', () => {
    const result = formatDates(null, 2018);
    expect(result).toBe('2018 to present');
  });

  it('should return end year if only endYear present', () => {
    const result = formatDates(null, null, null, '2018');
    expect(result).toBe('2018');
  });

  it('should return startYear to "present" if current is true', () => {
    const result = formatDates(9, 2017, null, null);
    expect(result).toBe('09/2017 to present');
  });

  it('should return startYear and endYear if both present', () => {
    const result = formatDates(null, 2017, null, 2018);
    expect(result).toBe('2017 to 2018');
  });

  it('should not append zero with number is two digit', () => {
    const result = formatDates(10, 2017);
    expect(result).not.toBe('010/2017 to present');
  });
});

describe('calculateExperience fn', () => {
  // for reference
  // calculateExperience(startMonth, startYear, endMonth, endYear)

  it('should return empty string when startYear is null', () => {
    const result = calculateExperience(null, null, null, null);
    expect(result).toBeFalsy();
  });

  it('should return expected experience when startYear is given and all other values are null', () => {
    // mocking Date.now fn
    const timeStamp = new Date("March 1, 2002").getTime();
    Date.now = jest.fn(() => timeStamp);

    const result = calculateExperience(null, 2000, null, null);
    expect(result).toBe('2 yrs 2 mo');
  });

  it('should return expected experience when startYear & startMonth are only given', () => {
    // mocking Date.now fn
    const timeStamp = new Date("April 1, 2002").getTime();
    Date.now = jest.fn(() => timeStamp);

    const result = calculateExperience(3, 2000, null, null);
    expect(result).toBe('2 yrs 1 mo');
  });

  it('should return expected experience when startYear, startMonth, and endYear are present', () => {
    const result = calculateExperience(3, 2000, null, 2002);
    expect(result).toBe('1 yr 10 mo');
  });

  it('should return expected experience when all parameters are given', () => {
    const result = calculateExperience(3, 2000, 12, 2002);
    expect(result).toBe('2 yrs 9 mo');
  });

  it('should show not show month in experiment field when month diff is 0', () => {
    const result = calculateExperience(3, 2000, 3, 2002);
    expect(result).toBe('2 yrs');
  });

  it('should show not show year in experiment field when year diff is 0', () => {
    const result = calculateExperience(3, 2000, 6, 2000);
    expect(result).toBe('3 mo');
  });
});
