import ProjectIcon from '../icons/icon-24-nav-projects-off.svg';
import PeopleIcon from '../icons/icon-24-nav-people-off.svg';
import CompnayIcon from '../icons/icon-24-nav-companies-off.svg';
import SchoolIcon from '../icons/icon-24-nav-schools-off.svg';
import DealIcon from '../icons/icon-24-nav-deals-off.svg';
import EventIcon from '../icons/icon-24-nav-events-off.svg';
import HomeIcon from '../icons/icon-home-off.svg';
import ReportIcon from '../icons/icon-24-report.svg';
import IconTag from '../icons/Tag-Off.svg';

export const FIRM_USER_SIDEBAR_LINKS = [
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

export const DASHBOARD_SIDEBAR_LINKS = [
  { title: 'Home', url: '/firm/dashboard', icon: HomeIcon }
];

export const ANALYTICS_SIDEBAR_LINKS = [
  { title: 'Analytics', url: '/firm/analytics', icon: ReportIcon }
];
