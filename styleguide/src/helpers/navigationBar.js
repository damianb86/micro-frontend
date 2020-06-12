/* eslint-disable import/prefer-default-export */
import { defaultMemoize } from 'reselect';

import * as NBI from '../constants/navigationBar';
import { ROLES } from '../constants/userRoles';
import { isActiveFirmUser, isClient } from '../helpers/common';
import { selectProjectTabsItems } from '../selectors/navigationBar';

export const getMainItems = defaultMemoize((firmFeatures, currentUser) => {
  let sidebarlinks = [];

  if (firmFeatures && firmFeatures.dashboard) {
    sidebarlinks = sidebarlinks.concat(NBI.DASHBOARD_SIDEBAR_LINKS);
  }

  if (isActiveFirmUser(currentUser)) {
    sidebarlinks = sidebarlinks.concat(NBI.FIRM_USER_SIDEBAR_LINKS);

    if (firmFeatures && firmFeatures.newPeoplePage) {
      sidebarlinks = sidebarlinks.map((elem) => {
        if (elem.title === 'People') {
          return { ...elem, url: '/firm/people/gridview' };
        }

        return elem;
      });
    }
  } else if (isClient(currentUser)) {
    sidebarlinks = NBI.CLIENT_USER_SIDEBAR_LINKS;
  } else {
    sidebarlinks = NBI.EXTERNAL_RECRUITER_USER_SIDEBAR_LINKS;
  }

  if (firmFeatures && firmFeatures.reports && [ROLES.ADMIN, ROLES.PARTNER].includes(currentUser.role)) {
    sidebarlinks = sidebarlinks.concat(NBI.ANALYTICS_SIDEBAR_LINKS);
  }

  return sidebarlinks;
});

export const getNavigationBarItems = defaultMemoize((section, match, tabsItems, firmFeatures, currentUser, projectFeatures) => {
  const mainItems = getMainItems(firmFeatures, currentUser);

  switch (section) {
    case 'project':
      const reselectedTabsItems = selectProjectTabsItems(match, tabsItems, projectFeatures);

      return {
        mainItems,
        tabsItems: reselectedTabsItems,
        activeTabItem: match.params.tab,
        withTabs: true,
        clientView: projectFeatures && projectFeatures.clientView
      };

    default: return { withTabs: false };
  }
});
