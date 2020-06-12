import { flatten } from 'lodash';

const DealExportFields = [
  {
    title: 'Recommended',
    key: 'recommended',
    values: [
      { key: 'name', label: 'Deal Name' },
      { key: 'target_companies', label: 'Target Company' },
      { key: 'state', label: 'Stage' },
      { key: 'status', label: 'Status' },
      { key: 'deal_size', label: 'Deal Size' },
      { key: 'likelihood', label: 'Likelihood' },
      { key: 'weighted_size', label: 'Weighted Size' }
    ]
  },
  {
    title: 'Optional Fields To Export',
    key: 'optional',
    values: [
      { key: 'lead', label: 'Lead' },
      { key: 'official_start_date', label: 'Official Start Date' },
      { key: 'activation_date', label: 'Activation Date' },
      { key: 'expected_close_date', label: 'Expected Close Date' },
      { key: 'official_close_date', label: 'Official Close Date' },
      { key: 'source', label: 'Source' },
      { key: 'source_note', label: 'Source Note' },
      { key: 'target_people', label: 'Target People' },
      { key: 'team', label: 'Team List' },
      { key: 'description', label: 'About' },
      { key: 'most_recent_note', label: 'Most Recent Note' },
      { key: 'tags', label: 'Tags' }
    ]
  }
];

export const defaultSelectedKeys = DealExportFields[0].values.map(f => f.key);
export const allKeys = flatten(DealExportFields.map(fieldSection => fieldSection.values.map(f => f.key)));

export default DealExportFields;
