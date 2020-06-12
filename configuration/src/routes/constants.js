export const ROUTES = {
  projects: {
    dashboard: {
      default: '/firm/projects/:projectId/dashboard'
    },
    statusReport: {
      default: '/firm/projects/:projectId/status_report'
    },
    longList: {
      default: '/firm/projects/:projectId/long_list'
    },
    position: {
      default: '/firm/projects/:projectId/position'
    },
    contract: {
      default: '/firm/projects/:projectId/contract'
    },
    strategy: {
      default: '/firm/projects/:projectId/strategy',
      v2: '/firm/projects/:projectId/strategy_v2'
    },
  },
  login: {
    default: '/login'
  },
  app: {
    default: '/app',
    content: {
      default: '/app/content'
    },
    cards: {
      default: '/app/cards'
    }
  },
  storybook: {
    default: '/storybook',
    collapsibleCard: {
      default: '/storybook/collapsible-card',
      v2: '/storybook/collapsible-card-v2',
      v3: '/storybook/collapsible-card-v3'
    },
    projectList: {
      default: '/storybook/project-list'
    },
    loading: {
      default: '/storybook/loading'
    }
  }
};

export default ROUTES;
