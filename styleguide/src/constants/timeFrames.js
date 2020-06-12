import moment from 'moment';

export const PRESETS = [
  { id: 'Today', value: 'Today', startDate: moment(), endDate: moment() },
  { id: 'Yesterday', value: 'Yesterday', startDate: moment().subtract(1, 'days'), endDate: moment().subtract(1, 'days') },
  { id: 'This Week', value: 'This Week', startDate: moment().startOf('week'), endDate: moment().endOf('week') },
  { id: 'This Month', value: 'This Month', startDate: moment().startOf('month'), endDate: moment().endOf('month') },
  {
    id: 'This Quarter',
    value: 'This Quarter',
    startDate: moment().startOf('quarter'),
    endDate: moment().endOf('quarter')
  },
  { id: 'This Year', value: 'This Year', startDate: moment().startOf('year'), endDate: moment().endOf('year') },
  { id: 'Last 7 Days', value: 'Last 7 Days', startDate: moment().subtract(7, 'days'), endDate: moment() },
  { id: 'Last 30 Days', value: 'Last 30 Days', startDate: moment().subtract(30, 'days'), endDate: moment() },
  { id: 'Last 90 Days', value: 'Last 90 Days', startDate: moment().subtract(90, 'days'), endDate: moment() },
  {
    id: 'Last Month',
    value: 'Last Month',
    startDate: moment().subtract(1, 'month').startOf('month'),
    endDate: moment().subtract(1, 'month').endOf('month')
  },
  {
    id: 'Last Quarter',
    value: 'Last Quarter',
    startDate: moment().subtract(1, 'quarter').startOf('quarter'),
    endDate: moment().subtract(1, 'quarter').endOf('quarter')
  },
  {
    id: 'Last Year',
    value: 'Last Year',
    startDate: moment().subtract(1, 'year').startOf('year'),
    endDate: moment().subtract(1, 'year').endOf('year')
  },
  { id: 'Since Inception', value: 'Since Inception', startDate: null, endDate: null }
];

export const PROJECTS_DATE_FORMAT = 'MM/DD/YYYY';

export const PEOPLE_PRESETS = [
  { id: 'Person Created', value: 'Person Created', startDate: moment(), endDate: moment() },
  { id: 'Person Updated', value: 'Person Updated', startDate: moment().subtract(1, 'days'), endDate: moment().subtract(1, 'days') },
  { id: 'Last Import', value: 'Last Import', startDate: moment().startOf('week'), endDate: moment().endOf('week') },
  { id: 'Last Note Update', value: 'Last Note Update', startDate: moment().startOf('month'), endDate: moment().endOf('month') },
  { id: 'Last Candidacy', value: 'Last Candidacy', startDate: moment().startOf('month'), endDate: moment().endOf('month') }
];
