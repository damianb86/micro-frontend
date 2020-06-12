/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BrowserRouter } from 'react-router-dom';

import IconLink from '../IconLink';
import SwitchFirm from '../SwitchFirm';
import ClientViewIcon from '../../icons/client-view-on.svg';
import RecentlyVisited from '../RecentlyVisited';
import { isActiveFirmUser } from '../../helpers/common';
import { MainSkeleton, TabsSkeleton } from './Skeleton';
import './index.scss';

export const NavigationBarWithTabs = ({
  onToggleSidebar,
  fetchAllCurrentAccountUsers,
  clientViewLink,
  onMouseOver,
  onMouseLeave,
  collapsed,
  onOverMode,
  activeTabItem,
  mainItems,
  tabsItems,
  showViewAsClient,
  showRecentlyVisited,
  currentFirmId,
  firms,
  currentUser,
  recentEntities,
  fetchRecentVisitedEntities,
  users,
  loading
}) => (
  <BrowserRouter>
    <div className={classNames({ collapsed, 'over-mode': onOverMode })}>
      <div
        className="navigation-sidebar"
        onMouseOver={collapsed ? onMouseOver : undefined}
        onMouseLeave={!collapsed ? onMouseLeave : undefined}
      >
        <nav className="navigation-sidebar__right">
          {(collapsed || onOverMode) && (
            <SwitchFirm
              currentFirmId={currentFirmId}
              firms={firms}
              users={users}
              fetchAllCurrentAccountUsers={fetchAllCurrentAccountUsers}
              currentUser={currentUser}
            />
          )}
          <section className="navigation-sidebar__right__list">
            {!loading ? (
              <TabsItems items={tabsItems} activeItem={activeTabItem} showViewAsClient={showViewAsClient} clientViewLink={clientViewLink} />
            ) : (
              <TabsSkeleton />
            )}
          </section>
          {(collapsed || onOverMode) && showRecentlyVisited && currentUser && isActiveFirmUser(currentUser) && (
            <RecentlyVisited
              entities={recentEntities}
              fetchRecentVisitedEntities={fetchRecentVisitedEntities}
            />
          )}
        </nav>
        <nav className="navigation-sidebar__left">
          {!collapsed && (
            <SwitchFirm
              currentFirmId={currentFirmId}
              firms={firms}
              users={users}
              fetchAllCurrentAccountUsers={fetchAllCurrentAccountUsers}
              currentUser={currentUser}
            />
          )}
          <section className="navigation-sidebar__left__section">
            {!loading ? (
              <MainItems items={mainItems} />
            ) : (
              <MainSkeleton />
            )}
          </section>
          {!collapsed && showRecentlyVisited && currentUser && isActiveFirmUser(currentUser) && (
            <RecentlyVisited
              entities={recentEntities}
              fetchRecentVisitedEntities={fetchRecentVisitedEntities}
            />
          )}
        </nav>
      </div>
      <section className="navigation-sidebar__right__slider">
        <a
          className="icon-action-wrapper icon-sm right-arrow-icon navigation-sidebar__collapsible-icon"
          onClick={onToggleSidebar}
          role="button"
          tabIndex="0"
        />
      </section>
    </div>
  </BrowserRouter>
);

NavigationBarWithTabs.defaultProps = {
  onToggleSidebar: () => null,
  onMouseOver: () => null,
  onMouseLeave: () => null,
  showViewAsClient: true,
  loading: false,
  mainItems: [],
  tabsItems: []
};

const navigationItemProp = {
  key: PropTypes.string,
  title: PropTypes.string,
  linkIcon: PropTypes.object,
  url: PropTypes.string
};

NavigationBarWithTabs.propTypes = {
  onToggleSidebar: PropTypes.func,
  clientViewLink: PropTypes.string,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
  activeTabItem: PropTypes.string,
  showViewAsClient: PropTypes.bool,
  loading: PropTypes.bool,
  mainItems: PropTypes.arrayOf(PropTypes.shape(navigationItemProp)),
  tabsItems: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape(navigationItemProp)))
};

export default NavigationBarWithTabs;


const TabsItems = ({ items, activeItem, showViewAsClient, clientViewLink }) => (
  <Fragment>
    <ul>
      {items.map((group, index) => (
        <div className="navigation-sidebar__right__list__group" key={index}>
          {group.map(({ key, url, title, icon }) => (
            <li className="navigation-sidebar__right__list__item" key={key}>
              <IconLink
                href={url}
                title={title}
                linkIcon={icon}
                className={classNames('navigation-sidebar__right__list__item__link', { active: activeItem === key })}
              >
                <span className="text">{title}</span>
              </IconLink>
            </li>
          ))}
        </div>
      ))}
    </ul>
  </Fragment>
);

const reselectedNavigationItemProp = {
  title: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.function,
  style: PropTypes.object
};

TabsItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape(reselectedNavigationItemProp))),
  activeItem: PropTypes.string,
  showViewAsClient: PropTypes.bool,
  clientViewLink: PropTypes.string
};

const MainItems = ({ items }) => (
  <ul className="navigation-sidebar__left__section__list">
    {items.map(({ title, url, icon, style }) => (
      <li className="navigation-sidebar__left__section__list__item" key={title}>
        <IconLink
          href={url}
          title={title}
          linkIcon={icon}
          style={style}
          className="navigation-sidebar__left__section__list__item__link"
        >
          <span className="text">{title}</span>
        </IconLink>
      </li>
    ))}
  </ul>
);

MainItems.propTypes = { items: PropTypes.arrayOf(PropTypes.shape(reselectedNavigationItemProp)) };
