import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import useToggle from '../../../hooks/useToggle';
import { Desktop, Mobile } from '../Responsive';
import DropdownButton, { DropdownContentButtons } from '../DropdownButton';
import MultiCriteriaInputField from '../MultiCriteriaInputField';
import './index.scss';
import CollapsibleFilterContainer from '../CollapsibleFilterContainer';

const searchRefs = {};

const SearchMultiCriteriaDropdown = ({
  id,
  title,
  placeholder,
  searchItems,
  onSearchAdd,
  onSearchRemove,
  onApply,
  onCancel,
  isMobileResponsive
}) => {
  const [isOpen, setOpen, setClose, handleToggle] = useToggle(false);
  const baseClass = 'search-select-multi-criteria-dropdown';

  const handleApply = () => {
    const promises = Object.values(searchRefs).map(sr => sr && sr.addTermToSelectedList()).filter(sr => sr);
    Promise.all(promises).then(() => onApply(searchItems));
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
          <MultiCriteriaInputField
            className={`${baseClass}_mobile__search`}
            placeholder={placeholder || title}
            items={searchItems}
            onSelection={onSearchAdd}
            onRemove={onSearchRemove}
            ref={(el) => { searchRefs[id] = el; }}
          />
        </CollapsibleFilterContainer>
      </Mobile>
    </Fragment>
  );
};

SearchMultiCriteriaDropdown.defaultProps = {
  searchItems: [],
  onApply: () => null,
  onCancel: () => null,
  isMobileResponsive: false
};

SearchMultiCriteriaDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  searchItems: PropTypes.array,
  isMobileResponsive: PropTypes.bool
};

export default SearchMultiCriteriaDropdown;
