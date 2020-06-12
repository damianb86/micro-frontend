import Moment from 'moment';
import MockDate from 'mockdate';
import { timeAgo, getYears, firstDayOfTheYear, dateRange, getConsecutiveMonths, isSameDate } from './time';

describe('timeAgo', () => {
  const minute = 1000 * 60;
  const hour = minute * 60;

  it('should return time in min ago format', () => {
    const result = timeAgo(new Date(new Date() - (3 * minute)));
    expect(result).toEqual('3 min ago');
  });

  it('should return time in hour ago format', () => {
    const result = timeAgo(new Date(new Date() - (60 * minute)));
    expect(result).toEqual('1 hour ago');
  });

  it('should return time in hr:min am format', () => {
    const now = new Date();
    const newTime = new Date(now.getHours() < 7 ? now.setHours(10) : now.setHours(5));

    const result = timeAgo(newTime);
    expect(result).toEqual(`${newTime.getHours()}:${newTime.getMinutes()} am`);
  });

  xit('should return time in hr:min pm format', () => {
    const now = new Date();
    const newTime = new Date(now.setHours(12));

    const result = timeAgo(newTime);
    expect(result).toEqual(`${newTime.getHours()}:${newTime.getMinutes()} pm`);
  });

  it('should return time in hr:min pm format', () => {
    const now = new Date();
    const newTime = new Date(now.getHours() > 17 ? now.setHours(15) : now.setHours(20));

    const result = timeAgo(newTime);
    expect(result).toEqual(`${newTime.getHours() - 12}:${newTime.getMinutes()} pm`);
  });

  it('should return time in mm/dd/yy format', () => {
    const newTime = new Date(new Date() - (365 * 24 * hour));

    const result = timeAgo(newTime);
    expect(result).toEqual(`${newTime.getMonth() + 1}/${newTime.getDate()}/${newTime.getFullYear() % 100}`);
  });

  it('should return time in Mon Day format', () => {
    const newTime = new Date(new Date() - (24 * hour));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const result = timeAgo(newTime);

    if (newTime.getFullYear() !== (new Date()).getFullYear()) {
      expect(result).toEqual(`${newTime.getMonth() + 1}/${newTime.getDate()}/${newTime.getFullYear() % 100}`);
    } else {
      const [mon, day] = result.split(' ');
      expect(day).toEqual(newTime.getDate().toString());
      expect(mon).toEqual(months[newTime.getMonth()]);
    }
  });

  it('should return time in Mon Day format', () => {
    const now = new Date();

    if (now.getMonth() > 0) {
      const newTime = new Date(now.setMonth(now.getMonth() - 1));
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const [mon, day] = timeAgo(newTime).split(' ');
      expect(day).toEqual(newTime.getDate().toString());
      expect(mon).toEqual(months[newTime.getMonth()]);
    }
  });
});

describe('getYears', () => {
  describe('when passed no values', () => {
    it('should return an array of years from year 1960', () => {
      const res = getYears();
      expect(res.includes(1960)).toBeTruthy();
    });

    it('should return an array of years up to current year', () => {
      const res = getYears();
      expect(res.includes(new Date().getFullYear())).toBeTruthy();
    });

    it('should return an array of years up in descending order', () => {
      const res = getYears();
      expect(res[0]).toBeGreaterThan(res[1]);
    });
  });

  describe('when custom values are passed', () => {
    it('should return an array of years from given year', () => {
      const res = getYears(1990);
      expect(res.includes(1960)).toBeFalsy();
      expect(res.includes(1990)).toBeTruthy();
    });

    it('should return an array of years up to given year', () => {
      const res = getYears(1990, 2010);
      expect(res.includes(new Date().getFullYear())).toBeFalsy();
      expect(res.includes(2010)).toBeTruthy();
    });

    it('should return an array of years up in ascending order', () => {
      const res = getYears(1990, 2010, false);
      expect(res[0]).toBeLessThan(res[1]);
    });
  });
});

describe('firstDayOfTheYear', () => {
  describe('when year is not passed', () => {
    it('should return the first day of the current year', () => {
      const date = firstDayOfTheYear();
      const defaultDate = Moment().year((new Date()).getFullYear()).startOf('year');
      expect(date).toEqual(defaultDate);
    });
  });

  describe('when year is passed', () => {
    it('should return the first day of that year', () => {
      const date = firstDayOfTheYear(2000);
      const defaultDate = Moment().year(2000).startOf('year');
      expect(date).toEqual(defaultDate);
    });
  });
});

describe('dateRange', () => {
  describe('when both start and end dates are null', () => {
    const startDate = null;
    const endDate = null;
    it('should return Time Frame', () => {
      const range = dateRange(startDate, endDate);
      expect(range).toEqual('Time Frame');
    });
  });

  describe('when start date is null and end date is present', () => {
    const startDate = null;
    const endDate = Moment("12-12-2018", "MM-DD-YYYY");
    it('should return a date range from null - enddate', () => {
      const range = dateRange(startDate, endDate);
      expect(range).toEqual(' - 12/12/18');
    });
  });

  describe('when start date is empty string and end date is present', () => {
    const startDate = '';
    const endDate = Moment('12-12-2018', 'MM-DD-YYYY');
    it('should return a date range from null - enddate', () => {
      const range = dateRange(startDate, endDate);
      expect(range).toEqual(' - 12/12/18');
    });
  });

  describe('when start date is present and end date is null', () => {
    const startDate = Moment("12-01-2018", "MM-DD-YYYY");
    const endDate = null;
    it('should return a date range from start date - null', () => {
      const range = dateRange(startDate, endDate);
      expect(range).toEqual('12/01/18 - ');
    });
  });

  describe('when both start and end dates are present', () => {
    const startDate = Moment("12-01-2018", "MM-DD-YYYY");
    const endDate = Moment("12-12-2018", "MM-DD-YYYY");
    it('should return a date range in format mm/dd/yyyy', () => {
      const range = dateRange(startDate, endDate);
      expect(range).toEqual('12/01/18 - 12/12/18');
    });
  });
});

describe('getConsecutiveMonths', () => {
  let date;
  let dateFullYear;
  let dateMonth;
  beforeAll(() => {
    MockDate.set(new Date('1/1/2019'));
    date = new Date();
    dateFullYear = date.getFullYear();
    dateMonth = date.getMonth();
  });

  afterAll(() => {
    MockDate.reset();
  });

  describe('when no params are passed', () => {
    it('should return an array of length 1', () => {
      const dates = getConsecutiveMonths();
      expect(dates.length).toEqual(1);
      expect(dates).toEqual([{ year: dateFullYear, month: dateMonth + 1 }]);
    });
  });

  describe('when number of months is passed', () => {
    it('should return an array of length equal to the no of months', () => {
      const dates = getConsecutiveMonths(5);
      expect(dates.length).toEqual(5);
      expect(dates).toEqual([
        { year: dateFullYear, month: dateMonth + 1 },
        { year: dateFullYear, month: dateMonth + 2 },
        { year: dateFullYear, month: dateMonth + 3 },
        { year: dateFullYear, month: dateMonth + 4 },
        { year: dateFullYear, month: dateMonth + 5 }
      ]);
    });
  });

  describe('when number of months and date is passed', () => {
    it('should return an array of objects of length equal to the no of months', () => {
      const dates = getConsecutiveMonths(5, new Date(2018, 9));
      expect(dates.length).toEqual(5);
      expect(dates).toEqual([
        { year: 2018, month: 10 },
        { year: 2018, month: 11 },
        { year: 2018, month: 12 },
        { year: 2019, month: 1 },
        { year: 2019, month: 2 }
      ]);
    });
  });

  describe('when 0 is passed as number of months', () => {
    it('should return the current month and year', () => {
      const dates = getConsecutiveMonths(0);
      expect(dates.length).toEqual(1);
      expect(dates).toEqual([
        { year: 2019, month: 1 }
      ]);
    });
  });

  describe('when 1 is passed as number of months', () => {
    it('should return the current month and year', () => {
      const dates = getConsecutiveMonths(1);
      expect(dates.length).toEqual(1);
      expect(dates).toEqual([
        { year: 2019, month: 1 }
      ]);
    });
  });

  describe('when 2 is passed as number of months', () => {
    it('should return the present and the coming month', () => {
      const dates = getConsecutiveMonths(2);
      expect(dates.length).toEqual(2);
      expect(dates).toEqual([
        { year: 2019, month: 1 },
        { year: 2019, month: 2 }
      ]);
    });
  });

  describe('when wrong type of params are passed', () => {
    describe('when number of months is not number type', () => {
      it('should return an array of length equal 1 with present year and month', () => {
        const dates = getConsecutiveMonths('string', new Date(2018, 9));
        expect(dates.length).toEqual(1);
        expect(dates).toEqual([{ year: dateFullYear, month: dateMonth + 1 }]);
      });
    });

    describe('when date is not object type', () => {
      it('should return an array of length equal 1 with present year and month', () => {
        const dates = getConsecutiveMonths(2, 'string');
        expect(dates.length).toEqual(1);
        expect(dates).toEqual([{ year: dateFullYear, month: dateMonth + 1 }]);
      });
    });
  });
});

describe('isSameDate', () => {
  it('should return true when the dates are the same', () => {
    const dateA = Moment('12-01-2018', 'MM-DD-YYYY');
    const dateB = Moment('01-12-2018', 'DD-MM-YYYY');
    expect(isSameDate(dateA, dateB)).toBeTruthy();
  });

  it('should return false when ona date is null', () => {
    const dateA = Moment('12-01-2018', 'MM-DD-YYYY');
    const dateB = null;
    expect(isSameDate(dateA, dateB)).toBeFalsy();
  });

  it('should return true when both dates are null', () => {
    const dateA = null;
    const dateB = null;
    expect(isSameDate(dateA, dateB)).toBeTruthy();
  });

  it('should return false when the dates are different', () => {
    const dateA = Moment('11-01-2018', 'MM-DD-YYYY');
    const dateB = Moment('15-01-2018', 'MM-DD-YYYY');
    expect(isSameDate(dateA, dateB)).toBeFalsy();
  });
});
