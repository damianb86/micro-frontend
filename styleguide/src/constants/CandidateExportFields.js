import { flatten } from 'lodash';

const CandidateExportFields = [
  {
    title: 'Recommended',
    key: 'recommended',
    values: [
      { key: 'name', label: 'Name' },
      { key: 'position', label: 'Current Position' },
      { key: 'email', label: 'Preferred Email' },
      { key: 'phone', label: 'Preferred Phone' },
      { key: 'linkedin_url', label: 'LinkedIn URL' },
      { key: 'candidate_status', label: 'Candidate Status' },
      { key: 'category', label: 'Category' }
    ]
  },
  {
    title: 'Project Specific Fields',
    key: 'projectSpecificFields',
    values: [
      { key: 'visibility', label: 'Visibility' },
      { key: 'overview', label: 'Overview' },
      { key: 'next_steps', label: 'Next Steps' },
      { key: 'assessment', label: 'Assessment' },
      { key: 'date_added', label: 'Date Added' },
      { key: 'date_updated', label: 'Date Updated' },
      { key: 'rank', label: 'Rank' },
      { key: 'user_added', label: 'User Added' },
      { key: 'user_processed', label: 'User Processed' },
      { key: 'watermark_fields', label: 'Watermark' },
      { key: 'average_rating', label: 'Candidate Ratings' }
    ]
  },
  {
    title: 'General Contact Information',
    key: 'generalContactInformation',
    values: [
      { key: 'all_positions', label: 'All Positions' },
      { key: 'education', label: 'All Education' },
      { key: 'all_emails', label: 'All Emails' },
      { key: 'all_linkedin_urls', label: 'All Linkedin URLs' },
      { key: 'all_phone', label: 'All Phone' },
      { key: 'all_addresses', label: 'All Addresses' },
      { key: 'biography', label: 'Biography' },
      { key: 'compensation', label: 'Compensation' },
      { key: 'person_custom_fields', label: 'Custom Fields' },
      { key: 'profile_picture', label: 'Picture URL' }
    ]
  }
];

export const defaultSelectedKeys = CandidateExportFields[0].values.map(f => f.key);
export const allKeys = flatten(CandidateExportFields.map(fieldSection => fieldSection.values.map(f => f.key)));

export default CandidateExportFields;
