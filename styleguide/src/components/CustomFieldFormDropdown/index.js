import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectCheckboxDropdown from '../SelectCheckboxDropdown';
import DynamicSearchListDropdown from '../DynamicSearchListDropdown';
import SelectOptions from '../SelectOptions';

import { getFilterItemCount } from '../../../helpers';
import { customFieldPropTypes } from '../../../propTypes';
import { requestAutocompleteCompanyList } from '../../../api/autocomplete';
import SearchSelect from '../SearchSelect';

const CustomFieldFormDropdown = ({
  customField,
  onApply,
  onCancel,
  searchItems,
  onSearchAdd,
  onSearchRemove,
  isFilterKeyId,
  items,
  value
}) => {
  const [options, setOptions] = useState([]);
  const { id, inputType, fieldName, selectOptions, lookupResource } = customField;

  const customFilterKey = isFilterKeyId ? id : fieldName;

  const handleSearchAdd = item => onSearchAdd(customFilterKey, item.id);
  const handleSearchRemove = item => onSearchRemove(customFilterKey, item);

  const handleSelect = (item) => {
    if (searchItems.includes(item)) {
      onSearchRemove(customFilterKey, item);
    } else {
      onSearchAdd(customFilterKey, item);
    }
  };

  const handleOnLoadOptions = (term) => {
    switch (lookupResource) {
      case 'companies':
        return requestAutocompleteCompanyList({ filter: JSON.stringify({ name: term }) }).then(({ data }) => {
          const newOptions = data.map(s => ({ id: s.id, name: s.attributes.name, value: s.attributes.name }));
          setOptions(newOptions);
          return newOptions;
        });
      default: return null;
    }
  };

  const handleApply = ({ id: optionId }) => onApply([{ value: optionId }], id);

  switch (inputType) {
    case 'multi_select':
      if (lookupResource) {
        return (
          <DynamicSearchListDropdown
            id={id}
            title={getFilterItemCount(fieldName, searchItems)}
            placeholder={fieldName}
            onSearchAdd={handleSearchAdd}
            onSearchRemove={handleSearchRemove}
            onApply={onApply}
            onCancel={onCancel}
            onLoadOptions={handleOnLoadOptions}
            items={items}
          />
        );
      }

      return (
        <SelectCheckboxDropdown
          id={id}
          title={getFilterItemCount(fieldName, searchItems)}
          items={selectOptions.split('\n').map(i => ({ name: i, value: i, label: i, checked: searchItems.includes(i) }))}
          onSelect={handleSelect}
          onApply={onApply}
          onCancel={onCancel}
        />
      );
    case 'select':
      if (lookupResource) {
        return (
          <SearchSelect
            autoSuggest
            useDebounce
            id={id}
            name={fieldName}
            placeholder={fieldName}
            options={options}
            autoComplete={handleOnLoadOptions}
            value={value}
            onSubmit={handleApply}
            onChange={handleApply}
          />
        );
      }

      return (
        <SelectOptions
          id={id}
          label={fieldName}
          prompt={fieldName}
          placeholder={fieldName}
          onSelect={(value, id) => onApply([{ value }], id)}
          options={selectOptions.split('\n').map(i => ({ id: i, value: i }))}
          value={value}
        />
      );
    default:
      return '';
  }
};

CustomFieldFormDropdown.defaultProps = {
  searchItems: [],
  value: '',
  onSearchAdd: () => {},
  onSearchRemove: () => {},
  onCancel: () => {},
  isFilterKeyId: false // TODO: When we refactor people custom filters to work on ids we will remove this option
};

CustomFieldFormDropdown.propTypes = {
  customField: customFieldPropTypes,
  searchItems: PropTypes.arrayOf(PropTypes.string),
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onSearchAdd: PropTypes.func,
  onSearchRemove: PropTypes.func,
  isFilterKeyId: PropTypes.bool
};

export default CustomFieldFormDropdown;
