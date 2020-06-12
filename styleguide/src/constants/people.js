import IconImport from '../assets/images/icon-12-export.svg';
import IconAdd from '../assets/images/icon-12-add.svg';

export const CANDIDATE_STATUS = 'candidateStatus';
export const TAG = 'tag';
export const COMPANY = 'company';
export const JOB_TITLE = 'jobTitle';
export const ON_PROJECT = 'onProject';
export const DATE = 'date';
export const SETTING = 'setting';
export const HAS_EMAIL = 'hasEmail';
export const HAS_PHONE_NUMBER = 'hasPhoneNumber';
export const HAS_RESUME = 'hasResume';
export const IS_FIRM_USER = 'isFirmUser';
export const IS_CLIENT = 'isClient';
export const DNC = 'doNotContact';
export const REGION = 'region';
export const LOCATION = 'location';
export const USERS = 'users';
export const NOTE_TYPE = 'noteType';

export const ALL = 'all';
export const CURRENT = 'current';
export const PAST = 'past';
export const PAST_NOT_CURRENT = 'pastNotCurrent';
export const UNDATED = 'undated';
export const MIN_CANDIDATE_STATUS = 'minCandidateStatus';
export const PEAK_CANDIDATE_STATUS = 'peakCandidateStatus';
export const MIN_PEAK_CANDIDATE_STATUS = 'minPeakCandidateStatus';
export const CANDIDATE_STATUS_PARAM = 'candidateStatus';

export const FILTER_FIELDS = [
  { key: JOB_TITLE, name: 'Job Title' },
  { key: COMPANY, name: 'Company' },
  { key: CANDIDATE_STATUS, name: 'Candidate Status' },
  { key: ON_PROJECT, name: 'On Project' },
  { key: SETTING, name: 'Settings' },
  { key: DATE, name: 'Date' },
  { key: TAG, name: 'Tag' },
  { key: REGION, name: 'Region' },
  { key: LOCATION, name: 'Location' },
  { key: USERS, name: 'Users' },
  { key: NOTE_TYPE, name: 'Note Type' }
];

export const ALL_FILTER_FIELD_KEYS = FILTER_FIELDS.map(i => i.key);

export const NAME = 'name';
export const COMPANY_KEY = 'company';
export const TITLE = 'position';
export const PHONE_NUMBER = 'phoneNumber';
export const EMAIL = 'email';
export const WEBSITE = 'website';
export const EDUCATION = 'education';
export const LINKEDIN_URL = 'linkedinUrl';
export const RESUME = 'resume';
export const ADDRESS = 'address';
export const ASSISTANT_NAME = 'assistantName';
export const BIOGRAPHY = 'biography';
export const COMPENSATION = 'compensation';
export const DATE_ADDED = 'dateAdded';
export const DATE_UPDATED = 'dateUpdated';
export const TAGS = 'tags';
export const LAST_IMPORT_DATE = 'lastImportDate';
export const LAST_NOTE_UPDATED = 'lastNoteUpdated';
export const LAST_CANDIDACY = 'lastCandidacy';

export const ALLOWED_CSV_FILE_IMPORT_TYPES = ['text/csv', '.csv'];
export const ALLOWED_VCARD_FILE_IMPORT_TYPES = ['text/x-vcard', 'text/vcard', '.vcf'];
export const ALLOWED_RESUME_FILE_IMPORT_TYPES = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', '.docx', '.doc'];

export const SEND_EMAIL = 'sendEmail';
export const ADD_NOTE = 'addNote';
export const ADD_PERSON = 'addPerson';
export const IMPORT_VCARD = 'vcard';
export const IMPORT_CSV = 'csv';
export const PARSE_RESUME = 'resume';
export const EXPORT = 'export';
export const BULK_EDIT = 'bulkEdit';

export const ALLOWED_FILE_IMPORT_TYPES = ['text/csv', '.csv', 'text/x-vcard', 'text/vcard', '.vcf'];

export const IMPORT_TYPE_TITLE = { csv: 'Import CSV File', vcard: 'Import vCard', resume: 'Parse Resume' };

export const MENU_ACTION_OPTIONS = [
  { id: ADD_PERSON, value: 'Add Person', icon: IconAdd, className: 'add-link' },
  { id: 'export', value: 'Export', icon: IconImport, className: 'export-link' },
  { id: IMPORT_VCARD, value: 'Import vCard', icon: IconImport, className: 'import-link' },
  { id: IMPORT_CSV, value: 'Import CSV File', icon: IconImport, className: 'import-link' },
  { id: PARSE_RESUME, value: 'Parse Resume', icon: IconImport, className: 'import-link' }
];

export const PEOPLE_EXPORT_FIELDS = [
  {
    title: 'Recommended',
    key: 'recommended',
    values: [
      { key: 'name', label: 'Name' },
      { key: 'position', label: 'Position' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'street', label: 'Address' },
      { key: 'linkedin_url', label: 'LinkedIn Url' },
      { key: 'do_not_contact', label: 'Do Not Contact' }
    ]
  },
  {
    title: 'Optional Fields To Export',
    key: 'optional',
    values: [
      { key: 'all_positions', label: 'All Positions' },
      { key: 'education', label: 'All Education' },
      { key: 'all_emails', label: 'All Emails' },
      { key: 'all_linkedin_urls', label: 'All Linkedin URLs' },
      { key: 'all_phone', label: 'All Phone' },
      { key: 'other_addresses', label: 'Other Addresses' },
      { key: 'biography', label: 'Biography' },
      { key: 'compensation', label: 'Compensation' },
      { key: 'tags', label: 'Tags' },
      { key: 'project_candidacies', label: 'Project Candidacies' },
      { key: 'deals', label: 'Deals' },
      { key: 'instant_messaging', label: 'Instant Messaging' },
      { key: 'skype_name', label: 'Skype' }
      // { key: 'person_custom_fields', label: 'Custom Fields' } - this option has been removed from the UI
    ]
  }
];

export const DEFAULT_SELECTED_KEYS = PEOPLE_EXPORT_FIELDS[0].values.map(f => f.key);
export const DEFAULT_COLUMNS_FOR_CSV = ['name', 'position', 'company', 'email', 'phone', 'tags'];

export const MAX_NUMBER_OF_PROJECTS = 3;

export const HEADER_SELECT_FIELDS_DATA = [
  { key: TITLE, value: 'Title' },
  { key: PHONE_NUMBER, value: 'Phone' },
  { key: EMAIL, value: 'Email' },
  { key: WEBSITE, value: 'Website' },
  { key: EDUCATION, value: 'Education' },
  { key: LINKEDIN_URL, value: 'LinkedIn' },
  { key: RESUME, value: 'Resume' },
  { key: ADDRESS, value: 'Address' },
  { key: ASSISTANT_NAME, value: 'Assistant Name' },
  { key: BIOGRAPHY, value: 'Biography' },
  { key: COMPENSATION, value: 'Compensation' },
  { key: TAGS, value: 'Tags' },
  { key: DATE_ADDED, value: 'Date Added' },
  { key: DATE_UPDATED, value: 'Date Updated' },
  { key: LAST_IMPORT_DATE, value: 'Last Import Date' },
  { key: LAST_NOTE_UPDATED, value: 'Most Recent Note Update' },
  { key: LAST_CANDIDACY, value: 'Most Recent Candidacy' }
];
