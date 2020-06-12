import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import useToggle from '../../../hooks/useToggle';
import DropdownButton, { DropdownContentButtons } from '../DropdownButton';
import MultiCriteriaInputField from '../MultiCriteriaInputField';
import RadioInputGroup from '../RadioInputGroup';
import CollapsibleFilterContainer from '../CollapsibleFilterContainer';
import { Desktop, Mobile } from '../Responsive';
import './index.scss';

const searchRefs = {};

const SearchSelectRadioDropdown = ({
  id,
  title,
  placeholder,
  searchItems,
  radioItems,
  onSearchAdd,
  onSearchRemove,
  onRadioSelect,
  onApply,
  onCancel,
  isMobileResponsive
}) => {
  const [isOpen, setOpen, setClose, handleToggle] = useToggle(false);
  const baseClass = 'search-select-radio-dropdown';

  const handleApply = () => {
    const promises = Object.values(searchRefs).map(sr => sr && sr.addTermToSelectedList()).filter(sr => sr);
    Promise.all(promises).then(() => onApply(searchItems, radioItems.find(item => item.checked)));
    setClose();
  };
  const handleCancel = () => {
    onCancel();
    setClose();
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
        >
          <DropdownContentButtons
            onApply={handleApply}
            onCancel={handleCancel}
          >
            <MultiCriteriaInputField
              className={`${baseClass}__search`}
              placeholder={placeholder || title}
              items={searchItems}
              onSelection={onSearchAdd}
              onRemove={onSearchRemove}
              ref={(el) => { searchRefs[id] = el; }}
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
          title={title}
          onToggle={handleToggle}
        >
          <MultiCriteriaInputField
            className={`${baseClass}__mobile__search`}
            placeholder={placeholder || title}
            items={searchItems}
            onSelection={onSearchAdd}
            onRemove={onSearchRemove}
            ref={(el) => { searchRefs[id] = el; }}
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

SearchSelectRadioDropdown.defaultProps = {
  radioItems: [],
  onRadioSelect: () => null,
  onApply: () => null,
  onCancel: () => null,
  isMobileResponsive: false
};

SearchSelectRadioDropdown.propTypes = {
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
  isMobileResponsive: PropTypes.bool
};

export default SearchSelectRadioDropdown;
