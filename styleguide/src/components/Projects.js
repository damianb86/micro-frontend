import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';

export default class Projects extends React.Component {
  renderProjectName = project => {
    return (
      <div>
        <span className="dashboard-content-title">{project.name}</span>
        <span className="dashboard-content-sub-title">{project.clientCompanyName}</span>
      </div>
    );
  };

  renderProjectNameWithFirmName = (project, firm) => {
    return (
      <div>
        <span className="dashboard-content-title">{project.name}</span>
        <span className="dashboard-content-sub-title">{firm.name}</span>
      </div>
    );
  };

  renderColumnContent(column, project) {
    const user = this.props.users && this.props.users.find(u => u.firmId === parseInt(project.firmId, 10));

    switch (column.key) {
      case 'name':
        let link;
        if (this.props.firmSpecific) {
          link = <Link to={'/projects/' + project.id}>{this.renderProjectName(project)}</Link>;
        } else {
          const firm = this.props.firms.filter(f => f).find(f => parseInt(f.id, 10) === project.firmId);
          if (this.props.mode === 'closed') {
            link =
              this.props.clientProjectIds.indexOf(parseInt(project.id, 10)) === -1 ? (
                <a href={(firm ? `//${firm.domain}` : '') + '/s/projects/' + project.id}>
                  {this.renderProjectName(project)}
                </a>
              ) : (
                this.renderProjectName(project)
              );
          } else if (user && user.role === 'Client') {
            link = (
              <a href={(firm ? `//${firm.domain}` : '') + '/s/projects/' + project.id}>
                {this.renderProjectNameWithFirmName(project, firm)}
              </a>
            );
          } else {
            link = (
              <a href={(firm ? `//${firm.domain}` : '') + '/s/projects/' + project.id}>
                {this.renderProjectName(project)}
              </a>
            );
          }
        }

        return (
          <td className="dashboard-my-projects__company" key={column.key}>
            {link}
          </td>
        );
      case 'days':
        return (
          <td key={column.key} className="dashboard-my-projects__days-active">
            <span className="dashboard-my-projects__days-active__count">{project.daysOpen}</span>
          </td>
        );
      case 'closeReason':
        const clsName = project.closingReasonName
          ? project.closingReasonName
              .split(' ')
              .map(str => str.toLowerCase())
              .join('-')
          : '';
        return (
          <td className={clsName} key={column.key}>
            {project.closingReasonName}
          </td>
        );
      case 'closeDate':
        return (
          <td key={column.key}>
            {project.closedAt ? (
              <FormattedDate value={project.closedAt} year="2-digit" day="2-digit" month="2-digit" />
            ) : null}
          </td>
        );
      default:
        return null;
    }
  }

  render() {
    let columns = [{ key: 'name', text: 'Name' }, { key: 'days', text: 'Days' }];

    if (this.props.mode === 'closed') {
      columns = [
        { key: 'name', text: 'Name' },
        { key: 'closeReason', text: 'Close Reason' },
        { key: 'closeDate', text: 'Close Date' }
      ];
    }

    return (
      <table className="table dashboard-my-projects">
        <thead>
          <tr>{columns.map(c => <th key={c.key}>{c.text}</th>)}</tr>
        </thead>
        <tbody>
          {this.props.projects.map(project => {
            return <tr key={project.id}>{columns.map(c => this.renderColumnContent(c, project))}</tr>;
          })}
        </tbody>
      </table>
    );
  }
}

Projects.defaultProps = {
  mode: 'created',
  firmSpecific: true
};
