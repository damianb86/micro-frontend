export const LEAD = 'lead';
export const USER = 'user';
export const STATUS = 'status';
export const STAGE = 'stage';
export const TAG = 'tag';
export const START_DATE = 'startDate';
export const CLOSE_DATE = 'closeDate';

export const FILTER_FIELDS = [
  { key: LEAD, name: LEAD, label: 'Lead' },
  { key: USER, name: USER, label: 'User' },
  { key: STATUS, name: STATUS, label: 'Status' },
  { key: STAGE, name: STAGE, label: 'Stage' },
  { key: TAG, name: TAG, label: 'Tag' },
  { key: START_DATE, name: START_DATE, label: 'Start Date' },
  { key: CLOSE_DATE, name: CLOSE_DATE, label: 'Close Date' }
];

export const DEFAULT_FILTER_FIELD_KEYS = [LEAD, USER, STATUS, STAGE, TAG, START_DATE, CLOSE_DATE];
