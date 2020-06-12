import IconAddProject from '../assets/images/icon-12-add.svg';
import IconExport from '../assets/images/icon-12-export.svg';

export const CREATOR = 'creator';
export const LEAD = 'lead';
export const STARTED_AT = 'startedAt';
export const UPDATED_AT = 'updatedAt';
export const CLOSED_AT = 'closedAt';
export const CLOSE_REASON = 'closeReason';
export const EXTERNAL_REFERENCE = 'externalReference';
export const LAST_UPDATED_BY = 'lastUpdatedBy';
export const INDUSTRY = 'industry';
export const SPECIALTY = 'specialty';
export const SENIORITY = 'seniority';
export const FUNDING_STAGE = 'fundingStage';
export const REVENUE_RANGE = 'revenueRange';
export const EMPLOYEE_RANGE = 'employeeRange';
export const GLOBAL_REGION = 'globalRegion';
export const TAGS = 'tags';
export const IS_CONFIDENTIAL = 'isConfidential';
export const IS_INTERNAL = 'isInternal';
export const CREATED_AT = 'createdAt';
export const TYPE = 'type';
export const STATUS = 'status';
export const ASC = 'asc';
export const DESC = 'desc';

// Fields currently set for always visible or indirectly visible like days_open is visible if created_at is visible
export const DAYS_OPEN = 'daysOpen';
export const CLIENT_TEAM = 'clientTeam';
export const PROJECT_TEAM = 'projectTeam';
export const HIGHEST_STATUS = 'highestStatus';
export const CANDIDATES = 'candidates';

export const CLIENT_VISIBLE_FIELDS = [CREATED_AT, STATUS, CLIENT_TEAM, PROJECT_TEAM];
export const ALL_VISIBILITY_FIELDS = [
  CREATOR, LEAD, STARTED_AT, UPDATED_AT, CLOSED_AT, CLOSE_REASON, EXTERNAL_REFERENCE,
  LAST_UPDATED_BY, INDUSTRY, SPECIALTY, SENIORITY, FUNDING_STAGE, REVENUE_RANGE,
  EMPLOYEE_RANGE, GLOBAL_REGION, TAGS, IS_CONFIDENTIAL, IS_INTERNAL, CREATED_AT,
  TYPE, STATUS
];

export const projectTeamArray = [CREATOR, LEAD];
export const projectDatesArray = [STARTED_AT, UPDATED_AT, CLOSED_AT, CLOSE_REASON, EXTERNAL_REFERENCE, LAST_UPDATED_BY];
export const projectProfileArray = [INDUSTRY, SPECIALTY, SENIORITY, FUNDING_STAGE, REVENUE_RANGE, EMPLOYEE_RANGE, GLOBAL_REGION, TAGS];

export const VISIBILITY_SETTINGS_OPTIONS = [
  { key: STATUS, value: 'Status' },
  { key: EXTERNAL_REFERENCE, value: 'External Reference' },
  { key: TYPE, value: 'Project Type' },
  { key: CREATOR, value: 'Project Creator' },
  { key: CLOSE_REASON, value: 'Closing Reason' },
  { key: GLOBAL_REGION, value: 'Global Region' },
  { key: LEAD, value: 'Project Lead' },
  { key: INDUSTRY, value: 'Industry' },
  { key: LAST_UPDATED_BY, value: 'Project Last Updated By' },
  { key: SPECIALTY, value: 'Specialty' },
  { key: STARTED_AT, value: 'Started Date' },
  { key: SENIORITY, value: 'Seniority' },
  { key: CLOSED_AT, value: 'Closed Date' },
  { key: FUNDING_STAGE, value: 'Funding Stage' },
  { key: CREATED_AT, value: 'Created Date' },
  { key: REVENUE_RANGE, value: 'Revenue Range' },
  { key: UPDATED_AT, value: 'Updated Date' },
  { key: EMPLOYEE_RANGE, value: 'Employee Range' },
  { key: IS_CONFIDENTIAL, value: 'Confidential' },
  { key: TAGS, value: 'Tags' },
  { key: IS_INTERNAL, value: 'Internal' }
];

// Action menu options
export const EXPORT = 'export';
export const ADD = 'add';

export const MENU_ACTION_OPTIONS = [
  { id: ADD, value: 'Add Project', icon: IconAddProject, className: 'add-link' },
  { id: EXPORT, value: 'Export', icon: IconExport, className: 'export-project-icon-link' }
];

export const SORT_OPTIONS = [
  { id: 'client_company_name', value: 'Client Company' },
  { id: 'name', value: 'Project Title' },
  { id: 'lead_name', value: 'Project Lead' },
  { id: 'started_at', value: 'Started Date' },
  { id: 'closed_at', value: 'Closed At' },
  { id: 'days_open', value: 'Days Active' }
];

export const PROJECT_EXPORT_FIELDS = [
  {
    title: 'Recommended',
    key: 'recommended',
    values: [
      { key: 'name', label: 'Project Title' },
      { key: 'company', label: 'Project Company' },
      { key: 'status', label: 'Project Status' },
      { key: 'project_type', label: 'Project Type' },
      { key: 'started_at', label: 'Official Start Date' },
      { key: 'closed_at', label: 'Official End Date' }
    ]
  },
  {
    title: 'Optional Fields To Export',
    key: 'optional',
    values: [
      { key: 'team', label: 'Team Members' },
      { key: 'lead', label: 'Project Lead' },
      { key: 'clients', label: 'Client Team' },
      { key: 'project_candidate_info', label: 'Candidate Info' },
      { key: 'industry', label: 'Industry' },
      { key: 'seniority', label: 'Seniority' },
      { key: 'specialty', label: 'Specialty' },
      { key: 'stage', label: 'Stage' },
      { key: 'investor', label: 'Investor' },
      { key: 'revenue', label: 'Revenue' },
      { key: 'employees', label: 'Employees' },
      { key: 'project_location', label: 'Location' },
      { key: 'project_fee', label: 'Project Fee' },
      { key: 'project_comp_range', label: 'Project Comp Range' },
      { key: 'project_placement_info', label: 'Placement' },
      { key: 'project_placement_salary', label: 'Placed Salary' },
      { key: 'is_confidential', label: 'Confidential' },
      { key: 'is_internal', label: 'Internal' },
      { key: 'external_ref', label: 'External Reference' },
      { key: 'created_at', label: 'Created Date' },
      { key: 'tags', label: 'Tags' }
    ]
  }
];

export const DEFAULT_SELECTED_EXPORT_KEYS = PROJECT_EXPORT_FIELDS[0].values.map(f => f.key);

export const MAX_SELECT = 1000;
