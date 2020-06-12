import React, { useState, useEffect } from "react";
import { map } from 'rxjs/operators';

import {
  EVENTS,
  addEventListener,
  removeEventListener,
  rxjsExportEvent,
  rxjsCreateEvent,
  rxjsRemoveEvent,
  useFeatures
} from '@clockwork/configuration';
import { NavigationBarWithTabs } from '@clockwork/styleguide';
import { getNavigationBarLinks } from './constants/navigationBar';

import './styles.css';

const Root = () => {
  useFeatures();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInOverMode, setIsInOverMode] = useState(false);

  const handleToggleSidebar = (data) => {
    setIsCollapsed(!isCollapsed);
    setIsInOverMode(false);
  };

  useEffect(() => {
    rxjsExportEvent(
      EVENTS.LEFT_APP.toggleCollapsed,
      rxjsCreateEvent().pipe(map((value) => ({ ...value, mapped: true })))
    ).subscribe(handleToggleSidebar);

    addEventListener(EVENTS.LEFT_APP.toggleCollapsed, handleToggleSidebar);

    return () => {
      rxjsRemoveEvent(EVENTS.LEFT_APP.toggleCollapsed);
      removeEventListener(EVENTS.LEFT_APP.toggleCollapsed, handleToggleSidebar);
    };
  }, [isCollapsed]);

  const NBI = getNavigationBarLinks();
  const mainItems = NBI.DASHBOARD_SIDEBAR_LINKS.concat(NBI.ANALYTICS_SIDEBAR_LINKS).filter(Boolean);
  
  const handleMouseOver = () => {
    setIsCollapsed(false);
    setIsInOverMode(true);
  }
  const handleMouseLeave = () => {
    if (isInOverMode) {
      setIsCollapsed(true);
      setIsInOverMode(false);
    }
  }

  return (
    <div className="left-app">
      <NavigationBarWithTabs
        collapsed={isCollapsed}
        onOverMode={isInOverMode}
        onToggleSidebar={handleToggleSidebar}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        mainItems={mainItems}
        tabsItems={NBI.NAVIGATION_MENU_ITEMS_GROUPED}
        activeTabItem="candidates"
        currentUser={{}}
        clientViewLink="/firm/client_mode"
        currentFirmId="1"
        firms={{}}
        users={[]}
        fetchRecentVisitedEntities={() => null}
        fetchAllCurrentAccountUsers={() => null}
        recentEntities={[]}
        showViewAsClient
        showRecentlyVisited
      />
    </div>
  );
};

export default Root;
