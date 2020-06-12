import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import UserNavigation from '../UserNavigation';
//import HeaderSearch from '../HeaderSearch';
import PageTitle from '../PageTitle';
import NotificationBadge from '../Badge/NotificationBadge';
import { isActiveFirmUser } from '../../helpers/common';

import '../../styles/base.scss';
import '../../styles/header.scss';
import '../../styles/header_search.scss';
import '../../styles/search.scss';
import '../../styles/sidebar.scss';


export const Header = ({ currentUser, currentAccount, pageTitle, firmLogoUrl, firmName, logout }) => {
  //const newPeoplePageEnabled = useFeature('gridview/new_people_view');
  let firmLogoView;

  if (firmLogoUrl) {
    firmLogoView = <img src={firmLogoUrl} alt={firmName} className="current-firm-logo" />;
  } else {
    firmLogoView = firmName;
  }

  return (
    <header className="site-header">
      <h3 className="site-header__title">
        {firmLogoView}
        {pageTitle &&
          <span className="site-header__page-title">
            <PageTitle title={pageTitle} />
          </span>
        }
      </h3>
      <ul className="site-header-actions">
        {currentUser && isActiveFirmUser(currentUser) && (
          <li className="site-header-actions__item">
            <form className="site-search header-search">
              <input
                type="text"
                id="search-q"
                placeholder="Search"
                autoComplete="off"
              />
            </form>
          </li>
        )}
        {currentUser && isActiveFirmUser(currentUser) && (
          <TaskLink tasksCount={2} />
        )}
        <li className="site-header-actions__item">
          <UserNavigation
            currentUser={currentUser}
            account={currentAccount}
            logout={logout}
            emailUsLink=""
          />
        </li>
      </ul>
    </header>
  );
};

Header.defaultProps = {
  firmLogoUrl: 'https://s3-us-west-2.amazonaws.com/clkwkdev-images/qa/f85/company_image/000/000/002/129/cd4bb35/logo.png?1582111576'
}

Header.propsType = PropTypes.shape({
  firmName: PropTypes.string,
  firmLogoUrl: PropTypes.string,
  currentUser: PropTypes.shape({ role: PropTypes.string }),
  pageTitle: PropTypes.shape({ title: PropTypes.string })
});

export default Header;

const TaskLink = ({ tasksCount }) => (
  <li className="site-header-actions__item">
    <a className="site-header__link" href="/firm/tasks">
      {tasksCount > 0 && <NotificationBadge />}
      Tasks
    </a>
  </li>
);
