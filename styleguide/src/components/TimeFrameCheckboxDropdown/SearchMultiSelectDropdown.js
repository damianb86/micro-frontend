import React from 'react';
import PropTypes from 'prop-types';

import DropdownButton, { DropdownContent } from '../DropdownButton';
import SearchMultiSelect from '../SearchMultiSelect';
import useToggle from '../../../hooks/useToggle';

import { getFilterItemCount } from '../../../helpers/stringHelpers';
import { idNameShapePropTypes } from './../../../propTypes';

const SearchMultiSelectDropdown = ({
  baseClass,
  placeholder,
  multiSelectItems,
  multiSelectOptions,
  onMultiSelectItemAdd,
  onMultiSelectItemRemove
}) => {
  const [isMultiSelectOpen, setMultiSelectOpen, setMultiSelectClose] = useToggle(false);

  return (
    <div className={`${baseClass}__multi-select`}>
      <div className={`${baseClass}__multi-select__label`}>
        <span>{placeholder}</span>
      </div>
      <DropdownButton
        id="note-type-search-multi-select-dd"
        title={getFilterItemCount(placeholder, multiSelectItems)}
        open={isMultiSelectOpen}
        onOpen={setMultiSelectOpen}
        onClose={setMultiSelectClose}
        onClickOutside={setMultiSelectClose}
        className={`${baseClass}__multi-select__dd-button`}
      >
        <DropdownContent>
          <SearchMultiSelect
            className={`${baseClass}__multi-select__dd-button__search-box`}
            options={multiSelectOptions}
            items={multiSelectItems}
            onSelection={onMultiSelectItemAdd}
            onRemove={onMultiSelectItemRemove}
            placeholder={placeholder}
            debounceInputChange
            dropdownVisible
          />
        </DropdownContent>
      </DropdownButton>
    </div>
  );
};

SearchMultiSelectDropdown.propTypes = {
  baseClass: PropTypes.string,
  placeholder: PropTypes.string,
  multiSelectItems: idNameShapePropTypes,
  multiSelectOptions: idNameShapePropTypes,
  onMultiSelectItemAdd: PropTypes.func,
  onMultiSelectItemRemove: PropTypes.func
};

export default SearchMultiSelectDropdown;
