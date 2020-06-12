import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from './Loading';
import Projects from './Projects';
import CardView from '../common/CardView';

class RecentProjects extends React.Component {
  render() {
    if (this.props.projects.loading) {
      return <Loading />;
    }

    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let filter;
    const projects = this.props.projects.map(id => this.props.projectEntities[id]);

    if (this.props.mode === 'created') {
      filter = { startDate: date, status: ['active'] };
    }

    const title = filter ? (
      <Link to={`/projects?filter=${encodeURIComponent(JSON.stringify(filter))}`}>{this.props.title}</Link>
    ) : (
      this.props.title
    );

    return (
      <CardView title={title} draggable={this.props.draggable}>
        <Projects
          projects={projects}
          account={this.props.account}
          firmSpecific={this.props.firmSpecific}
          mode={this.props.mode}
          firms={this.props.firms}
          clientProjectIds={this.props.clientProjectIds}
        />
      </CardView>
    );
  }
}

function mapStateWithProps(state) {
  return {
    projectEntities: state.entities.projects,
    account: state.account
  };
}

RecentProjects.defaultProps = {
  clientProjectIds: []
};

export default connect(mapStateWithProps)(RecentProjects);
