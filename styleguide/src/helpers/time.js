/* eslint-disable import/prefer-default-export */
import Moment from 'moment';

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function timeAgo(date) {
  const today = new Date();
  const difference = (today - date) / 1000 / 60;

  if (difference > 0) {
    if (difference < 60) {
      return `${Math.round(difference)} min ago`;
    } else if (difference < 80) {
      return '1 hour ago';
    }
  }

  if (today.getFullYear() !== date.getFullYear()) {
    return [date.getMonth() + 1, date.getDate(), date.getYear() % 100].join('/');
  } else if (today.getMonth() !== date.getMonth() || today.getDate() !== date.getDate()) {
    return `${months[date.getMonth()]} ${date.getDate()}`;
  } else if (date.getHours() < 12) {
    return `${date.getHours()}:${date.getMinutes()} am`;
  } else if (date.getHours() === 12) {
    return `${date.getHours()}:${date.getMinutes()} pm`;
  }

  return `${date.getHours() - 12}:${date.getMinutes()} pm`;
}

export const getYears = (
  startYear = 1960,
  endYear = new Date().getFullYear(),
  desc = true
) => {
  const yrs = [];

  for (let i = endYear; i >= startYear; i -= 1) {
    yrs.push(i);
  }

  return desc ? yrs : yrs.reverse();
};

export function getFileTimestamp() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}_${d.getHours()}-${d.getMinutes()}`;
}

export const firstDayOfTheYear = (year = (new Date()).getFullYear()) => {
  return Moment().year(year).startOf('year');
};

export const sanitizeDate = date => (date && typeof date === 'string' ? Moment.parseZone(date) : date);

export const dateRange = (startDate, endDate) => {
  let formatedDate = '';
  const sanitizedStartDate = sanitizeDate(startDate);
  const sanitizedEndDate = sanitizeDate(endDate);

  if (!sanitizedStartDate && !sanitizedEndDate) {
    formatedDate = 'Time Frame';
  } else if (!sanitizedStartDate) {
    formatedDate = ` - ${sanitizedEndDate.format('MM/DD/YY')}`;
  } else if (!sanitizedEndDate) {
    formatedDate = `${sanitizedStartDate.format('MM/DD/YY')} - `;
  } else {
    formatedDate = `${sanitizedStartDate.format('MM/DD/YY')} - ${sanitizedEndDate.format('MM/DD/YY')}`;
  }

  return formatedDate;
};

export const getConsecutiveMonths = (no_of_months = 1, date = new Date()) => {
  if (typeof no_of_months === 'number' && typeof date === 'object' && no_of_months > 0) {
    let dates = [{ year: date.getFullYear(), month: date.getMonth() + 1 }];

    /* eslint-disable no-plusplus */
    for (let i = 1; i < no_of_months; i++) {
      if (date.getMonth() === 11) {
        date = new Date(date.getFullYear() + 1, 0, 1);
      } else {
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      }

      dates.push({ year: date.getFullYear(), month: date.getMonth() + 1 });
    }

    return dates;
  }

  return [{ year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 }];
};

export const isSameDate = (dateA, dateB) => {
  if (!dateA || !dateB) {
    return dateA === dateB;
  }

  return dateA.isSame(dateB);
};
