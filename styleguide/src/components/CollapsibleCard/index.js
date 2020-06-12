import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ChevronDownIcon from '../../icons/icon-16-chevron-down.svg';
import ChevronUpIcon from '../../icons/icon-16-chevron-up.svg';
import './index.scss';

const CollapsibleCard = ({
  children,
  title,
  subtitle,
  icons,
  isOpen,
  onOpen,
  onClose,
  className,
  printMode,
  id,
  style: { body: bodyStyle, header: headerStyle }
}) => {
  const handleOpen = e => onOpen(e, id);
  const handleClose = e => onClose(e, id);

  return (
    <section className={classNames('collapsible-card', className, { open: isOpen })}>
      <div className="collapsible-card__header" style={headerStyle}>
        <div className="collapsible-card__header__title">
          <span>{title}</span>
          {subtitle && <span className="collapsible-card__header__title__subtitle">&#40;{subtitle}&#41;</span>}
        </div>
        {!printMode &&
          <div className="collapsible-card__header__icons">
            {icons}
            {isOpen ? (
              <ChevronUpIcon id={id} role="button" tabIndex="0" onClick={handleClose} className="cc-close-icon" />
            ) : (
              <ChevronDownIcon id={id} role="button" tabIndex="0" onClick={handleOpen} className="cc-open-icon" />
            )}
          </div>}
      </div>
      {isOpen && (
        <div className="collapsible-card__body" style={bodyStyle}>
          {children}
        </div>
      )}
    </section>
  );
};

CollapsibleCard.defaultProps = {
  isOpen: true,
  printMode: false,
  id: 'toggle-icon',
  style: {}
};

CollapsibleCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icons: PropTypes.oneOfType([PropTypes.node]),
  isOpen: PropTypes.bool,
  printMode: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  style: PropTypes.shape({
    header: PropTypes.object,
    body: PropTypes.object
  })
};

export default CollapsibleCard;
