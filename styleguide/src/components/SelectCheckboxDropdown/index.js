import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import find from 'lodash/find';

import { Desktop, Mobile } from '../Responsive';
import DropdownButton, { DropdownContentButtons } from '../DropdownButton';
import CheckBox from '../CheckBox';
import CollapsibleFilterContainer from '../CollapsibleFilterContainer';
import useToggle from '../../../hooks/useToggle';
import './index.scss';

const SelectCheckboxDropdown = ({ id, title, items, onOpen, onClose, onSelect, onApply, onCancel, isMobileResponsive }) => {
  const [isOpen, setOpen, setClose, setToggle] = useToggle(false);
  const [selectedItems, setSelectedItems] = useState(filter(items, 'checked'));
  const baseClass = 'select-checkbox-dropdown';

  useEffect(() => {
    setSelectedItems(filter(items, 'checked'));
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
    setSelectedItems(filter(items, 'checked'));
    onCancel(id);
    setClose();
    onClose(id);
  };

  const handleSelect = ({ target: { value } }) => {
    onSelect(value);
    const selectedItem = find(selectedItems, ['value', value]);
    if (selectedItem) {
      setSelectedItems(selectedItems.filter(({ value: itemValue }) => itemValue !== value));
    } else {
      setSelectedItems([...selectedItems, find(items, ['value', value])]);
    }
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
        >
          <DropdownContentButtons
            onApply={handleApply}
            onCancel={handleCancel}
          >
            <div className={`${baseClass}__select`}>
              {items.map(item => (
                <CheckBox
                  {...item}
                  key={item.value}
                  onChange={handleSelect}
                  checked={selectedItems.some(({ value }) => value === item.value)}
                />
              ))}
            </div>
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
            <div className={`${baseClass}__mobile__select`}>
              {items.map(item => (
                <CheckBox
                  {...item}
                  key={item.value}
                  onChange={handleSelect}
                  checked={selectedItems.some(({ value }) => value === item.value)}
                />
              ))}
            </div>
          </DropdownContentButtons>
        </CollapsibleFilterContainer>
      </Mobile>
    </Fragment>
  );
};

SelectCheckboxDropdown.defaultProps = {
  items: [],
  onOpen: () => null,
  onClose: () => null,
  onApply: () => null,
  onCancel: () => null,
  onSelect: () => null,
  isMobileResponsive: false
};

SelectCheckboxDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      label: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.any,
      tabIndex: PropTypes.string,
      disabled: PropTypes.bool
    })),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onApply: PropTypes.func,
  onSelect: PropTypes.func,
  onCancel: PropTypes.func,
  isMobileResponsive: PropTypes.bool
};

export default SelectCheckboxDropdown;
