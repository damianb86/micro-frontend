import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChevronDownIcon from '../../../icons/icon-16-chevron-down.svg';
import ChevronUpIcon from '../../../icons/icon-16-chevron-up.svg';
import './index.scss';

const CollapsibleFilterContainer = ({ title, id, className, isOpen, onToggle, children }) => {
  const handleToggle = () => onToggle(id);

  return (
    <section className={classNames('collapsible-filter-container', className, { open: isOpen })}>
      <div className="collapsible-filter-container__header" onClick={handleToggle} role="button" tabIndex="0">
        <div className="collapsible-filter-container__header__title">
          <span>{title}</span>
        </div>
        <div className="collapsible-card__header__icons">
          {isOpen ? (
            <ChevronUpIcon className="cc-close-icon" />
          ) : (
            <ChevronDownIcon className="cc-open-icon" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="collapsible-filter-container__body">
          {children}
        </div>
      )}
    </section>
  );
};

CollapsibleFilterContainer.defaultProps = { isOpen: true, id: 'collapsible-filter-container' };

CollapsibleFilterContainer.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  isOpen: PropTypes.bool
};

export default CollapsibleFilterContainer;
