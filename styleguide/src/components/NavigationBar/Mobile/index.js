import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import IconLink from '../../../common/IconLink';
import CloseIcon from '../../../../icons/icon-16-close.svg';
import BackIcon from '../../../../icons/icon-16-chevron-left.svg';
import ClientViewIcon from '../../../../icons/client-view-on.svg';
import './index.scss';

export const NavigationBarMobile = ({
  title,
  items,
  currentItem,
  backLinkUrl,
  className,
  showViewAsClient,
  clientViewLink,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toogleIsOpen = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <div className={`navigation-bar-link ${className || ''}`} onClick={toogleIsOpen} role="button" tabIndex="0">
        {children}
      </div>
      <div className={`navigation-bar ${isOpen ? '' : 'closed'}`}>
        <div className="navigation-bar__controls">
          <a className="navigation-bar__controls__back" href={backLinkUrl}>
            <BackIcon />
          </a>
          <div className="navigation-bar__controls__close" onClick={toogleIsOpen} role="button" tabIndex="-1">
            <CloseIcon />
          </div>
        </div>
        <div className="navigation-bar__content">
          <div className="navigation-bar__title">
            {title}
          </div>
          <div className="navigation-bar__items">
            <ul>
              {items.map((group, index) => (
                <div className="navigation-bar__group" key={index}>
                  {group.map(({ key, url, title: itemTitle, icon }) => (
                    <li key={key} className={`${currentItem === key ? 'active' : ''}`}>
                      <IconLink
                        noPushState
                        href={url}
                        title={itemTitle}
                        linkIcon={icon}
                        className="navigation-bar__items__icon"
                      >
                        <span className="text">{itemTitle}</span>
                      </IconLink>
                    </li>
                  ))}
                </div>
              ))}
            </ul>
            {showViewAsClient && (
              <section className="navigation-bar__view-as-client">
                <IconLink
                  href={clientViewLink}
                  noPushState
                  title="View as Client"
                  linkIcon={ClientViewIcon}
                  className="navigation-bar__view-as-client__icon"
                >
                  <span className="text">View as Client</span>
                </IconLink>
              </section>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

NavigationBarMobile.defaultProps = { showViewAsClient: true };

NavigationBarMobile.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  currentItem: PropTypes.string,
  backLinkUrl: PropTypes.string,
  showViewAsClient: PropTypes.bool,
  clientViewLink: PropTypes.string,
  className: PropTypes.string
};

export default NavigationBarMobile;
