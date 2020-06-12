import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchMultiCriteriaDropdown from '../SearchMultiCriteriaDropdown';
import SelectCheckboxDropdown from '../SelectCheckboxDropdown';
import DynamicSearchListDropdown from '../DynamicSearchListDropdown';

import { getFilterItemCount } from '../../../helpers';
import { customFieldPropTypes } from '../../../propTypes';
import { requestAutocompleteCompanyList } from '../../../api/autocomplete';

const CustomFieldFilters = ({
  customField,
  onApply,
  onCancel,
  searchItems,
  onSearchAdd,
  onSearchRemove,
  isFilterKeyId
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { id, inputType, fieldName, selectOptions, lookupResource } = customField;

  const customFilterKey = isFilterKeyId ? id : fieldName;

  const handleSearchAdd = item => onSearchAdd(customFilterKey, item.id);
  const handleSearchRemove = item => onSearchRemove(customFilterKey, item);

  const onSelect = (item) => {
    if (searchItems.includes(item)) {
      onSearchRemove(customFilterKey, item);
    } else {
      onSearchAdd(customFilterKey, item);
    }
  };

  const handleOnLoadOptions = (term) => {
    if (lookupResource === 'companies') {
      return requestAutocompleteCompanyList({ filter: JSON.stringify({ name: term }) }).then(response =>
        response.data.map(s => ({ id: s.id, name: s.attributes.name }))
      );
    }
  };

  useEffect(() => {
    if (lookupResource === 'companies') {
      const missingCompanyInfoIds = searchItems.filter(itemId => !selectedOptions.find(option => option[id] === itemId));

      if (missingCompanyInfoIds.length) {
        requestAutocompleteCompanyList({ filter: JSON.stringify({ ids: missingCompanyInfoIds.join(',') }) }).then(response =>
          setSelectedOptions(response.data.map(s => ({ id: s.id, name: s.attributes.name })))
        );
      }
    }
  }, []);

  if (lookupResource) {
    return (
      <DynamicSearchListDropdown
        id={id}
        title={getFilterItemCount(fieldName, searchItems)}
        items={selectedOptions}
        placeholder={fieldName}
        onSearchAdd={handleSearchAdd}
        onSearchRemove={handleSearchRemove}
        onApply={onApply}
        onCancel={onCancel}
        onLoadOptions={handleOnLoadOptions}
      />
    );
  } else if (inputType === 'text') {
    return (
      <SearchMultiCriteriaDropdown
        id={id}
        title={getFilterItemCount(fieldName, searchItems)}
        placeholder={fieldName}
        searchItems={searchItems.map(i => ({ id: i, name: i }))}
        onSearchAdd={handleSearchAdd}
        onSearchRemove={handleSearchRemove}
        onApply={onApply}
        onCancel={onCancel}
      />
    );
  }

  return (
    <SelectCheckboxDropdown
      id={id}
      title={getFilterItemCount(fieldName, searchItems)}
      items={selectOptions.split('\n').map(i => ({ name: i, value: i, label: i, checked: searchItems.includes(i) }))}
      onSelect={onSelect}
      onApply={onApply}
      onCancel={onCancel}
    />
  );
};

CustomFieldFilters.defaultProps = {
  searchItems: [],
  onSearchAdd: () => {},
  onSearchRemove: () => {},
  onCancel: () => {},
  isFilterKeyId: false // TODO: When we refactor people custom filters to work on ids we will remove this option
};

CustomFieldFilters.propTypes = {
  customField: customFieldPropTypes,
  searchItems: PropTypes.arrayOf(PropTypes.string),
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onSearchAdd: PropTypes.func,
  onSearchRemove: PropTypes.func,
  isFilterKeyId: PropTypes.bool
};

export default CustomFieldFilters;
