import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../common/Loading';
import Projects from './Projects';
import CardView from '../common/CardView';

export class MyProjects extends React.Component {
  render() {
    if (this.props.projects.loading) {
      return <Loading />;
    }

    const projects = this.props.projects.map(id => this.props.entities[id]);
    let filter;

    if (this.props.firmSpecific) {
      const currentUser = this.props.currentUser;
      filter = { user: [{ value: currentUser.id, label: currentUser.name }], status: ['active'] };
    }

    let users = this.props.users && this.props.account.userIds.map(id => this.props.users[id]);

    const title = this.props.firmSpecific ? (
      <Link to={`/projects?filter=${encodeURIComponent(JSON.stringify(filter))}`}>{this.props.title}</Link>
    ) : (
      this.props.title
    );

    return (
      <CardView title={title} draggable={this.props.draggable}>
        <Projects
          projects={projects}
          users={users}
          account={this.props.account}
          firms={this.props.firms}
          firmSpecific={this.props.firmSpecific}
          clientProjectIds={this.props.clientProjectIds}
        />
      </CardView>
    );
  }
}

function mapStateWithProps(state) {
  return {
    entities: state.entities.projects,
    account: state.account
  };
}

export default connect(mapStateWithProps)(MyProjects);
