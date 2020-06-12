import { linkTo } from '@clockwork/configuration';

import ProjectIcon from '../icons/icon-24-nav-projects-off.svg';
import PeopleIcon from '../icons/icon-24-nav-people-off.svg';
import CompnayIcon from '../icons/icon-24-nav-companies-off.svg';
import SchoolIcon from '../icons/icon-24-nav-schools-off.svg';
import DealIcon from '../icons/icon-24-nav-deals-off.svg';
import EventIcon from '../icons/icon-24-nav-events-off.svg';
import HomeIcon from '../icons/icon-home-off.svg';
import ReportIcon from '../icons/icon-24-report.svg';
import IconTag from '../icons/Tag-Off.svg';
import DashboardIcon from '../icons/dashboard-on.svg';
import StatusReportIcon from '../icons/status-report-on.svg';
import CandidatesIcon from '../icons/candidates-on.svg';
import LongListIcon from '../icons/long-list-on.svg';
import PositionIcon from '../icons/position.svg';
import StrategyIcon from '../icons/strategy-on.svg';
import AssessmentIcon from '../icons/assessment-on.svg';
import IternalIcon from '../icons/internal-on.svg';
import AdminIcon from '../icons/admin-on.svg';
import ContractIcon from '../icons/contract-on.svg';
import MilestonesIcon from '../icons/milestones-on.svg';
import WinListIcon from '../icons/win-list-on.svg';
import GridViewIcon from '../icons/grid-view-on.svg';

const FIRM_USER_SIDEBAR_LINKS = [
  { title: 'Projects', url: '/firm/projects', icon: ProjectIcon },
  { title: 'People', url: '/firm/people', icon: PeopleIcon },
  { title: 'Companies', url: '/firm/companies', icon: CompnayIcon, style: { height: 30 } },
  { title: 'Schools', url: '/firm/schools', icon: SchoolIcon },
  { title: 'Deals', url: '/firm/deals', icon: DealIcon, style: { height: 35 } },
  { title: 'Events', url: '/firm/events', icon: EventIcon, style: { height: 20 } },
  { title: 'Tags', url: '/firm/tags', icon: IconTag, style: { height: 40 } }
];

export const CLIENT_USER_SIDEBAR_LINKS = [
  { title: 'My Projects', url: '/firm/client_projects', icon: ProjectIcon }
];

export const EXTERNAL_RECRUITER_USER_SIDEBAR_LINKS = [
  { title: 'My Projects', url: '/firm/external_recruiter_projects', icon: ProjectIcon }
];

export const STATUS_REPORT = 'statusReport';
export const CANDIDATES = 'candidates';
export const LONG_LIST = 'longList';
export const DASHBOARD = 'dashboard';
export const POSITION = 'position';
export const STRATEGY = 'strategy';
export const ASSESSMENTS = 'assessments';
export const INTERNAL = 'internal';
export const ADMIN = 'admin';
export const CONTRACT = 'contract';
export const NEW_GRID_VIEW = 'newGridView';
export const GRID_VIEW = 'gridView';
export const MILESTONES = 'milestones';
export const WIN_LIST = 'winList';

export const getNavigationBarLinks = () => ({
  DASHBOARD_SIDEBAR_LINKS: [
    { title: 'Home', url: linkTo('app'), icon: HomeIcon }
  ],
  ANALYTICS_SIDEBAR_LINKS: [  
    { title: 'Content', url: linkTo('app.content'), icon: LongListIcon },
    { title: 'Cards', url: linkTo('app.cards'), icon: IternalIcon }
  ],
  NAVIGATION_MENU_ITEMS_GROUPED: [
    [
      { key: DASHBOARD, title: 'Collapsible', icon: DashboardIcon, url: linkTo('storybook.collapsibleCard', 'v2', 'storybook.collapsibleCard') },
      { key: 'dashboard.v3', title: 'Collapsible V3', icon: DashboardIcon, url: linkTo('storybook.collapsibleCard.v3') },
      { key: STATUS_REPORT, title: 'Project List', icon: ProjectIcon, url: linkTo('storybook.projectList') }
    ]
  ]
})
