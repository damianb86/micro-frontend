import { defaultMemoize } from 'reselect';
import isEmpty from 'lodash/isEmpty';

export const isCustomFieldFormDisabled = (fieldName, inputType, placeholder, selectOptions, includeOnDashboard, record, objectType) => {
  if (isEmpty(record)) {
    return !fieldName || !objectType;
  }

  const hasFieldNameNotChanged = fieldName === record.fieldName;
  const hasInputTypeNotChanged = !inputType || inputType === record.inputType;
  const hasIncludeOnDashboardNotChanged = includeOnDashboard === record.includeOnDashboard;

  let hasTextAreaDataNotChanged = true;
  if (inputType === 'text') {
    hasTextAreaDataNotChanged = !placeholder || placeholder === record.placeholder;
  } else {
    hasTextAreaDataNotChanged = !selectOptions || selectOptions === record.selectOptions;
  }

  return !fieldName || (hasFieldNameNotChanged && hasInputTypeNotChanged && hasTextAreaDataNotChanged && hasIncludeOnDashboardNotChanged);
};

export const getFirmFieldsFilters = defaultMemoize(fields =>
  fields.map(field => ({ key: `custom_field_${field.id}`, name: `custom_field_${field.id}`, label: field.fieldName })));
