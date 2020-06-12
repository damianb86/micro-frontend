import React, { Fragment, useState, useEffect } from 'react';

import useToggle from '../../../hooks/useToggle';
import DropdownButton, { DropdownContentButtons } from '../DropdownButton';
import { SearchMultiSelect } from '../SearchMultiSelect';
import { filterArray } from '../../../helpers/common';
import { Desktop, Mobile } from '../Responsive';
import CollapsibleFilterContainer from '../CollapsibleFilterContainer';
import searchListPropTypes from './propTypes';
import './index.scss';

const SearchListDropdown = ({
  id,
  title,
  placeholder,
  items,
  options,
  onSearchAdd,
  onSearchRemove,
  handleInputChange,
  onApply,
  onCancel,
  onOpen,
  onClose,
  disabled,
  className,
  isMobileResponsive
}) => {
  const [isOpen, setOpen, setClose, setToggle] = useToggle(false);
  const [selectedItems, setSelectedItems] = useState(items || []);
  const baseClass = 'search-list-dropdown';

  useEffect(() => {
    setSelectedItems(items || []);
  }, [items]);

  const handleOpen = () => {
    setOpen();
    onOpen(id);
  };

  const handleToggle = () => {
    setToggle();
    if (isOpen) {
      onClose(id);
    } else {
      onOpen(id);
    }
  };

  const handleApply = () => {
    onApply(selectedItems, id);
    setClose();
    onClose(id);
  };

  const handleCancel = () => {
    setSelectedItems(items || []);
    onCancel(id);
    setClose();
    onClose(id);
  };

  const handleSearchAdd = (item) => {
    setSelectedItems(selectedItems.concat(item));
    onSearchAdd(item, id);
  };

  const handleSearchRemove = (itemId) => {
    setSelectedItems(selectedItems.filter(({ id }) => id !== itemId));
    onSearchRemove(itemId, id);
  };

  return (
    <Fragment>
      <Desktop isVisible={!isMobileResponsive}>
        <DropdownButton
          id={id}
          title={title}
          open={isOpen}
          onOpen={handleOpen}
          onClose={setClose}
          onClickOutside={setClose}
          disabled={disabled}
          className={className}
        >
          <DropdownContentButtons
            onApply={handleApply}
            onCancel={handleCancel}
          >
            <SearchMultiSelect
              className={`${baseClass}__search`}
              options={filterArray(options, selectedItems)}
              items={selectedItems}
              onSelection={handleSearchAdd}
              onRemove={handleSearchRemove}
              placeholder={placeholder || title}
              handleInputChange={handleInputChange}
              debounceInputChange
              dropdownVisible
            />
          </DropdownContentButtons>
        </DropdownButton>
      </Desktop>
      <Mobile isHidden={!isMobileResponsive}>
        <CollapsibleFilterContainer
          className={`${baseClass}__mobile`}
          isOpen={isOpen}
          title={title}
          onToggle={handleToggle}
        >
          <DropdownContentButtons
            onApply={handleApply}
            onCancel={handleCancel}
            isMobileResponsive={isMobileResponsive}
          >
            <SearchMultiSelect
              className={`${baseClass}__mobile__search`}
              options={filterArray(options, selectedItems)}
              items={selectedItems}
              onSelection={handleSearchAdd}
              onRemove={handleSearchRemove}
              placeholder={placeholder || title}
              handleInputChange={handleInputChange}
              debounceInputChange
              dropdownVisible
            />
          </DropdownContentButtons>
        </CollapsibleFilterContainer>
      </Mobile>
    </Fragment>
  );
};

SearchListDropdown.defaultProps = {
  options: [],
  onSearchAdd: () => null,
  onSearchRemove: () => null,
  onApply: () => null,
  onOpen: () => null,
  onClose: () => null,
  onCancel: () => null,
  isMobileResponsive: false
};

SearchListDropdown.propTypes = { ...searchListPropTypes };

export default SearchListDropdown;
