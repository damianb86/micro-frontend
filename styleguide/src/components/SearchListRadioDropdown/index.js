import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useToggle from '../../../hooks/useToggle';
import DropdownButton, { DropdownContentButtons } from '../DropdownButton';
import { SearchMultiSelect } from '../SearchMultiSelect';
import { filterArray } from '../../../helpers/common';
import { Desktop, Mobile } from '../Responsive';
import CollapsibleFilterContainer from '../CollapsibleFilterContainer';
import RadioInputGroup from '../RadioInputGroup';
import './index.scss';

const SearchListRadioDropdown = ({
  id,
  title,
  placeholder,
  items,
  radioItems,
  options,
  onSearchAdd,
  onSearchRemove,
  onRadioSelect,
  handleInputChange,
  onLoadMore,
  onApply,
  onCancel,
  disabled,
  className,
  isMobileResponsive
}) => {
  const [isOpen, setOpen, setClose, handleToggle] = useToggle(false);
  const [selectedItems, setSelectedItems] = useState(items || []);
  const baseClass = 'search-list-radio-dropdown';

  useEffect(() => {
    setSelectedItems(items || []);
  }, [items]);

  const handleApply = () => {
    onApply(selectedItems, id);
    setClose();
  };
  const handleCancel = () => {
    setSelectedItems(items || []);
    onCancel(id);
    setClose();
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
          onOpen={setOpen}
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
              onLoadMore={onLoadMore}
              debounceInputChange
              dropdownVisible
            />
            <div className={`${baseClass}__select`}>
              <RadioInputGroup
                items={radioItems}
                onChange={onRadioSelect}
              />
            </div>
          </DropdownContentButtons>
        </DropdownButton>
      </Desktop>
      <Mobile isHidden={!isMobileResponsive}>
        <CollapsibleFilterContainer
          className={`${baseClass}__mobile`}
          isOpen={isOpen}
          title="Compensation"
          onToggle={handleToggle}
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
          <div className={`${baseClass}__select`}>
            <RadioInputGroup
              items={radioItems}
              onChange={onRadioSelect}
            />
          </div>
        </CollapsibleFilterContainer>
      </Mobile>
    </Fragment>
  );
};

SearchListRadioDropdown.defaultProps = {
  onApply: () => null,
  onCancel: () => null,
  onRadioSelect: () => null
};

SearchListRadioDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  radioItems: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      label: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.any,
      tabIndex: PropTypes.string,
      disabled: PropTypes.bool,
      className: PropTypes.string,
      labelClassName: PropTypes.string
    }),
  ),
  onRadioSelect: PropTypes.func,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onLoadMore: PropTypes.func,
  isMobileResponsive: PropTypes.bool
};

export default SearchListRadioDropdown;
