import IconEdit from '../assets/images/icon-12-edit.svg';
import IconDelete from '../assets/images/icon-12-trash.svg';

export const STATUS_REPORT = 'statusReport';
export const CANDIDATES = 'candidates';
export const GRID_VIEW = 'gridView';
export const LONG_LIST = 'longList';
export const DASHBOARD = 'dashboard';
export const POSITION = 'position';
export const STRATEGY = 'strategy';
export const MILESTONES = 'milestones';
export const CONTRACT = 'contract';
export const ASSESSMENTS = 'assessments';
export const CONFIDENTIAL = 'confidential';
export const INTERNAL = 'internal';
export const NAME = 'name';
export const CLIENT_INVITE = 'clientInvite';

export const ACTIVE_MENU_OPTIONS_MAPPINGS = [
  { key: STATUS_REPORT, value: 'Status Report', checked: true },
  { key: CANDIDATES, value: 'Candidates', checked: true },
  { key: GRID_VIEW, value: 'Grid View', checked: true },
  { key: LONG_LIST, value: 'Long List', checked: true },
  { key: DASHBOARD, value: 'Dashboard', checked: true },
  { key: POSITION, value: 'Position', checked: true },
  { key: STRATEGY, value: 'Strategy', checked: true },
  { key: ASSESSMENTS, value: 'Assessments', checked: true },
  // { key: MILESTONES, value: 'Milestones', checked: true },
  { key: CONTRACT, value: 'Contract', checked: true }
];

export const HEADER = [
  { key: 'blank', title: ' ', width: 40 },
  { key: NAME, title: 'Name', widthRatio: 1 },
  { key: 'activeMenuOptions', title: 'Active Menu Options', widthRatio: 1 },
  { key: CLIENT_INVITE, title: 'Client Invite', widthRatio: 1 },
  { key: 'action', title: '' }
];

export const PROJECT_TYPES_ACTION_OPTIONS = [
  { id: 'edit', value: 'Edit', icon: IconEdit },
  { id: 'delete', value: 'Delete', icon: IconDelete, className: 'delete-icon-link' }
];

const ACTIVE_MENU_OPTIONS_KEY_ORDER = [STATUS_REPORT, POSITION, CANDIDATES, STRATEGY, ASSESSMENTS, GRID_VIEW, LONG_LIST, CONTRACT, DASHBOARD];

export const ACTIVE_MENU_OPTIONS_SETTINGS_COLUMN = ACTIVE_MENU_OPTIONS_KEY_ORDER.map(
  columnName => ACTIVE_MENU_OPTIONS_MAPPINGS.find(item => item.key === columnName)
);

export const PROJECT_TYPE_DEFAULT_OPTIONS = [
  { key: CONFIDENTIAL, value: 'Confidential', checked: false },
  { key: INTERNAL, value: 'Internal', checked: false }
];
