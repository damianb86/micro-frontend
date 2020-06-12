import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useToggle from '../../../hooks/useToggle';
import SearchMultiSelect from '../SearchMultiSelect';

import './index.scss';
import DropdownButton, { DropdownContentButtons } from '../DropdownButton';

const SelectMultipleDropdown = ({ name, itemsSelected, options, id, title, onApply, onCancel, buttonText, customClassName, noButtonBorder }) => {
  const [isOpen, setOpen, setClose] = useToggle(false);
  const [currentItemsSelected, setCurrentItemsSelected] = useState(itemsSelected);
  const baseClass = 'search-multiple-dropdown';

  const handleSelect = (item) => {
    setCurrentItemsSelected(currentItemsSelected.concat(item));
  };

  const handleRemove = (itemId) => {
    setCurrentItemsSelected(currentItemsSelected.filter(({ id: currentItemId }) => currentItemId !== itemId));
  };

  const handleApply = () => {
    onApply(currentItemsSelected, name);
    setClose();
  };

  const handleCancel = () => {
    setCurrentItemsSelected(itemsSelected);

    if (onCancel) {
      onCancel();
    }

    setClose();
  };

  return (
    <DropdownButton
      id={id}
      title={buttonText || title}
      open={isOpen}
      onOpen={setOpen}
      onClose={setClose}
      onClickOutside={setClose}
      className={classNames(baseClass, customClassName, { borderLess: noButtonBorder })}
    >
      <DropdownContentButtons
        onApply={handleApply}
        onCancel={handleCancel}
      >
        <SearchMultiSelect
          className={`${baseClass}__search`}
          options={options.filter(option => !currentItemsSelected.some(item => item.id === option.id))}
          items={currentItemsSelected}
          onSelection={handleSelect}
          onRemove={handleRemove}
          placeholder={title}
          dropdownVisible
        />
      </DropdownContentButtons>
    </DropdownButton>
  );
};

SelectMultipleDropdown.defaultProps = {
  name: null,
  itemsSelected: [],
  customClassName: '',
  noButtonBorder: false
};

SelectMultipleDropdown.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  itemsSelected: PropTypes.array,
  customClassName: PropTypes.string,
  noButtonBorder: PropTypes.bool
};

export default SelectMultipleDropdown;
