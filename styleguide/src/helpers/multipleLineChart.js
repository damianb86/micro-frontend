import moment from 'moment';

export const getDatesUnique = report =>
  Array.from(new Set(report.reduce((obj, item) => obj.concat(item.data.map(d => d.date)), []))).sort((a, b) => new Date(a) - new Date(b));

export const datesWithGaps = (dates) => {
  let prev = moment(dates[0]);
  let next;

  const allDates = [dates[0]];

  for (let i = 1; i < dates.length; i += 1) {
    next = moment(dates[i]);
    const diff = next.diff(prev, 'days');
    if (diff > 1) {
      allDates.push(prev.add(1, 'days').format('YYYY-MM-DD'));
    }
    allDates.push(dates[i]);
    prev = next;
  }

  return allDates;
};

export const getLegend = (report, colors) =>
  report.map((item, index) => ({
    key: item.name,
    label: item.name,
    color: colors[index % colors.length]
  }));

export const getColumnData = (stats, dates) => stats.map((st) => {
  return [st.name].concat(dates.map((d) => {
    const match = st.data.find(o => o.date === d);
    return match ? match.value : null;
  }));
});

export const getMaxValue = report =>
  Math.max(...report.map(item => Math.max(...item.data.map(d => d.value))));

export const getRange = maxValue =>
  (maxValue < 100 ? null : [...Array(11).keys()].map(value => Math.ceil(value * maxValue * 0.1)));
