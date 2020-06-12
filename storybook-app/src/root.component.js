import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { linkTo } from '@clockwork/configuration';
import CollapsibleCardStory from "./components/CollapsibleCardStory";
import ProjectListStory from "./components/ProjectListStory";
import LoadingStory from "./components/LoadingStory";

export default function Root() {
  return (
    <Router>
      <Switch>
        <Route path={linkTo('storybook.collapsibleCard.default')} strict>
          <CollapsibleCardStory version={1} />
        </Route>
        <Route path={linkTo('storybook.collapsibleCard.v2')} strict>
          <CollapsibleCardStory version={2} />
        </Route>
        <Route path={linkTo('storybook.collapsibleCard.v3')} strict>
          <CollapsibleCardStory version={3} />
        </Route>
        <Route path={linkTo('storybook.projectlist')} strict>
          <ProjectListStory />
        </Route>
        <Route path={linkTo('storybook.loading')} strict>
          <LoadingStory />
        </Route>
      </Switch>
    </Router>
  );
}
