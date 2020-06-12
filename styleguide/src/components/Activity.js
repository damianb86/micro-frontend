import React, { Component } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

import { Link } from 'react-router-dom';

class Activity extends Component {
  fromStatus(details) {
    return ` from ${details.from}`;
  }

  toStatus(details) {
    return ` to ${details.to}`;
  }

  personLink(details) {
    if (details.personName) {
      return (
        <Link className="activity-link" to={'/people/' + details.personId}>
          {details.personName}
        </Link>
      );
    } else {
      return 'a deleted person';
    }
  }

  projectLink(details) {
    if (details.projectName) {
      return [
        'the project ',
        <Link className="activity-link" to={'/projects/' + details.projectId}>
          {details.projectName}
        </Link>
      ];
    } else {
      return 'deleted project';
    }
  }

  companyLink(details) {
    if (details.companyName) {
      return (
        <Link className="activity-link" to={'/companies/' + details.companyId}>
          {details.companyName}
        </Link>
      );
    }
  }

  dealLink(details, dealId) {
    if (details.dealName) {
      return [
        'the deal ',
        <Link className="activity-link" to={'/deals/' + dealId}>
          {details.dealName}
        </Link>
      ];
    } else {
      return 'a deleted deal';
    }
  }

  userLink(details, userId) {
    if (details.personName) {
      return details.personName;
    } else {
      return 'a deleted user';
    }
  }

  entityDetails(event, details) {
    switch (event.entityType) {
      case 'CandidacyNote':
        return this.personLink(details);
      case 'ProjectNote':
        return this.projectLink(details);
      case 'PersonNote':
        return this.personLink(details);
      case 'DealNote':
        return this.dealLink(details, details.dealId);
      default:
        return '';
    }
  }

  clientViewedProjectDetails(event, details) {
    if (event.projectClient) {
      return event.projectClient.projectId ? this.projectLink(details) : 'a deleted project';
    } else {
      return 'an unknown project';
    }
  }

  reportAttachmentLink(event) {
    if (event.reportAttachment) {
      if (event.reportAttachment.url) {
        return (
          <a target="_blank" href={event.reportAttachment.url}>
            {event.reportAttachment.description}
          </a>
        );
      } else {
        return event.reportAttachment.description;
      }
    }
  }

  formatEventDetails(event) {
    let details = event.details;
    let eventDetails;

    if (details) {
      details.projectId = details.projectId || event.contextId;

      switch (event.type) {
        case 'ProjectCreationEvent':
          eventDetails = ['created ', this.projectLink(details)];
          break;
        case 'NoteCreationEvent':
          eventDetails = ['added a ', details.noteCategory, ' note to ', this.entityDetails(event, details)];
          break;
        case 'NoteUpdateEvent':
          eventDetails = ['edited a ', details.noteCategory, ' note on ', this.entityDetails(event, details)];
          break;
        case 'NoteDeletionEvent':
          eventDetails = ['deleted a ', details.noteCategory, ' note on ', this.entityDetails(event, details)];
          break;
        case 'CandidacyCreationEvent':
          eventDetails = ['added ', this.personLink(details), ' to ', this.projectLink(details)];
          break;
        case 'CandidacyStatusChangeEvent':
          eventDetails = [
            'changed the status of ',
            this.personLink(details),
            ' on ',
            this.projectLink(details),
            this.fromStatus(details),
            this.toStatus(details)
          ];
          break;
        case 'ProjectStatusChangeEvent':
          eventDetails = [
            'changed the status of ',
            this.projectLink(details),
            this.fromStatus(details),
            this.toStatus(details)
          ];
          break;
        case 'CandidacyDeletionEvent':
          eventDetails = ['removed ', this.personLink(details), ' from ', this.projectLink(details)];
          break;
        case 'StoplightChangeEvent':
          let from = details.from === 'green' ? 'ON' : 'OFF';
          let to = details.to === 'green' ? 'ON' : 'OFF';

          if (event.entityType === 'Candidacy') {
            eventDetails = ['changed ', this.personLink(details), ` from visibility ${from} to visibility ${to}`];
          } else {
            eventDetails = ['changed note', ` from visibility ${from} to visibility ${to}`];
          }
          break;
        case 'BulkImportEvent':
          let importDetails = details.importType;
          if (details.addCount) {
            importDetails += `: ${details.addCount} 'new person added'`;
          } else {
            importDetails += `: ${details.updateCount} 'people added'`;
          }

          eventDetails = ['used the ', importDetails];
          break;
        case 'DealStatusChangedEvent':
          eventDetails = [
            'changed the status of ',
            this.dealLink(details, event.entityId),
            ` from ${details.from}`,
            ` to ${details.to}`
          ];
          break;
        case 'ExportEvent':
          eventDetails = ['exported ', this.reportAttachmentLink(event)];
          break;
        case 'FirmUserInvitedEvent':
          eventDetails = ['invited ', this.userLink(details, event.entityId), ` to join the firm ${event.firmName}`];
          break;
        case 'NetworkPersonInvitedEvent':
          eventDetails = [
            'invited ',
            this.personLink(details),
            ` to join the firm ${event.firmName} Clockwork Network`
          ];
          break;
        case 'SourceCompanyThumbsUpChangeEvent':
          eventDetails = ['changed ', this.companyLink(details), ' to ', <strong>{details.to}</strong>];
          break;
        case 'SourceCompanyCoverageChangeEvent':
          eventDetails = ['marked ', this.companyLink(details), ' coverage ', <strong>{details.to}</strong>];
          break;
        case 'UserLoginEvent':
          eventDetails = ['logged in'];
          break;
        case 'ProjectMigratedEvent':
          eventDetails = ['used the ', details.externalRef, ' for project'];
          break;
        case 'UserInvitedEvent':
          eventDetails = ['invited ', details.personName, ' as a client of a project'];
          break;
        case 'UserStatusEvent':
          eventDetails = ['updated their status'];
          break;
        case 'ProjectClientViewedProjectEvent':
          eventDetails = ['viewed ', this.clientViewedProjectDetails(event, details)];
          break;
        case 'PersonDeletionEvent':
          eventDetails = ['deleted ', this.personLink(details)];
          break;
        case 'PersonMergeEvent':
          eventDetails = [`merged ${details.victimName} into ${details.personName}`];
          break;
        case 'SourceCompanyVoteEvent':
          eventDetails = [
            'changed ',
            this.companyLink(details),
            "'s rating",
            this.fromStatus(details),
            this.toStatus(details)
          ];
          break;
        default:
          eventDetails = [];
          break;
      }
    } else {
      if (event.type === 'DealDeletionEvent') {
        eventDetails = [`deleted deal ${event.entityId}`];
      }
    }

    return [(details && details.actorName) || 'System', ' ', eventDetails];
  }

  render() {
    const events = this.props.events.map(event => this.props.activities[event]);

    return (
      <tbody>
        {events.map(event => {
          return (
            <tr key={event.id}>
              <td>
                <span className="dashboard-content-title dashboard-content-title--activity">
                  {this.formatEventDetails(event)}
                </span>
                <span className="dashboard-content-sub-title">
                  <FormattedTime value={event.createdAt} /> <FormattedDate value={event.createdAt} />
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default Activity;
