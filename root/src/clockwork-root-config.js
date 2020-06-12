import { registerApplication, start } from "single-spa";
import { linkTo } from '@clockwork/configuration';

registerApplication({
  name: "@clockwork/login-app",
  app: () => System.import("@clockwork/login-app"),
  activeWhen: [linkTo('login')]
});

registerApplication({
  name: "@clockwork/left-app",
  app: () => System.import("@clockwork/left-app"),
  activeWhen: [linkTo('app'), linkTo('storybook')]
});

registerApplication({
  name: "@clockwork/top-app",
  app: () => System.import("@clockwork/top-app"),
  activeWhen: [linkTo('app'), linkTo('storybook')]
});

registerApplication({
  name: "@clockwork/content-app",
  app: () => System.import("@clockwork/content-app"),
  activeWhen: [linkTo('app.content')]
});

registerApplication({
  name: "@clockwork/multiple-cards-app",
  app: () => System.import("@clockwork/multiple-cards-app"),
  activeWhen: [linkTo('app.cards')]
});

registerApplication({
  name: "@clockwork/storybook-app",
  app: () => System.import("@clockwork/storybook-app"),
  activeWhen: [linkTo('storybook')]
});

registerApplication({
  name: "@clockwork/right-bar-app",
  app: () => System.import("@clockwork/right-bar-app"),
  activeWhen: [linkTo('storybook')]
});

start({
  urlRerouteOnly: true,
});
