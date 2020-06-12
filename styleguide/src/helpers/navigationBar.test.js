import { getMainItems, getNavigationBarItems } from './navigationBar';
import { NAVIGATION_MENU_ITEMS_GROUPED } from '../components/project/constants/navigationBar';
import * as NBI from '../constants/navigationBar';

const section = {};
const match = { params: { project: '1' } };
const mainItems = NBI.DASHBOARD_SIDEBAR_LINKS.concat(NBI.FIRM_USER_SIDEBAR_LINKS).concat(NBI.ANALYTICS_SIDEBAR_LINKS);
const visibility = {
  dashboard: true,
  reports: false,
  projectLongList: true,
  projectLongListAccess: true,
  projectStatusReport: false,
  projectStatusReportAccess: true,
  projectContract: true,
  projectContractAccess: true,
  newGridView: true
};
const currentUser = { role: 'Admin' };

describe('getNavigationBarItems fn', () => {
  it('should return detail of creators', () => {
    const filteredItems = getNavigationBarItems(section, match, NAVIGATION_MENU_ITEMS_GROUPED, mainItems, visibility, currentUser);
    expect(filteredItems).toEqual({ withTabs: false });
  });

  describe('when section is "project"', () => {
    it('should return tabs', () => {
      const filteredItems = getNavigationBarItems('project', match, NAVIGATION_MENU_ITEMS_GROUPED, { newPeoplePage: false }, currentUser, visibility);
      expect(filteredItems.withTabs).toEqual(true);
    });

    describe('when newPeoplePage firm feature is false', () => {
      it('returns "/firm/people" as link for people tab', () => {
        const filteredItems = getNavigationBarItems('project', match, NAVIGATION_MENU_ITEMS_GROUPED, { newPeoplePage: false }, currentUser, visibility);
        expect(filteredItems.mainItems.filter(x => x.title == 'People')[0].url).toEqual('/firm/people')
      })
    });

    describe('when newPeoplePage firm feature is true', () => {
      it('returns "/firm/people/gridview" as link for people tab', () => {
        const filteredItems = getNavigationBarItems('project', match, NAVIGATION_MENU_ITEMS_GROUPED, { newPeoplePage: true }, currentUser, visibility);
        expect(filteredItems.mainItems.filter(x => x.title == 'People')[0].url).toEqual('/firm/people/gridview')

      })
    });
  });
});

describe('getMainItems fn', () => {
  const sidebarRoutes = ['/firm/projects', '/firm/people', '/firm/companies', '/firm/schools', '/firm/deals', '/firm/events', '/firm/tags'];
  const newSidebarRoutes = ['/firm/projects', '/firm/people/gridview', '/firm/companies', '/firm/schools', '/firm/deals', '/firm/events', '/firm/tags'];

  describe('when user is active firm user', () => {
    describe('when firm does not have new people page feature', () => {
      it('should return old sidebar links', () => {
        const mainItems = getMainItems({ newPeoplePage: false }, { role: 'Admin' });
        expect(mainItems.map(x => x.url)).toEqual(sidebarRoutes);
      });
    });

    describe('when firm has new people page feature', () => {
      it('should return new sidebar links', () => {
        const filteredItems = getMainItems({ newPeoplePage: true }, { role: 'Admin' });
        expect(filteredItems.map(x => x.url)).toEqual(newSidebarRoutes);
      });
    });
  });
});
