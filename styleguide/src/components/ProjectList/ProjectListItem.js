import React, { Fragment } from 'react';

import CheckBox from '../CheckBox';
import Tag from '../Tag';
import AvatarList from '../AvatarList';

import {
  CREATOR,
  LEAD,
  STARTED_AT,
  UPDATED_AT,
  CLOSED_AT,
  CLOSE_REASON,
  EXTERNAL_REFERENCE,
  LAST_UPDATED_BY,
  INDUSTRY,
  SPECIALTY,
  SENIORITY,
  FUNDING_STAGE,
  REVENUE_RANGE,
  EMPLOYEE_RANGE,
  GLOBAL_REGION,
  TAGS,
  projectTeamArray,
  projectDatesArray,
  projectProfileArray,
  IS_CONFIDENTIAL,
  IS_INTERNAL,
  CREATED_AT,
  DAYS_OPEN,
  CLIENT_TEAM,
  PROJECT_TEAM,
  HIGHEST_STATUS,
  CANDIDATES,
  TYPE,
  STATUS
} from '../../helpers/constants';

import ConfidentialIcon from '../../icons/confidential.svg';
import InternalIcon from '../../icons/internal.svg';

import './index.scss';

const ProjectListItem = ({
  project,
  visibility,
  handleProjectSelect
}) => {
  const isVisible = fields => {
    return fields.some(field => getField(field) && visibility[field]);
  }
  const getField = field => project[field] || project.attributes[field];

  const CustomField = ({ name, field, value, style = {}, makeVisible = false }) => (
    makeVisible || isVisible([field]) ? (
      <div className="field" style={style}>
        <span className="field__name" title={name}>{name}</span>
        <span className="field__value" title={value}>{value}</span>
      </div>
    ) : ('')
  );

  const DateField = ({ name, field, value, style = {}, makeVisible = false }) => (
    makeVisible || isVisible([field])) && (
      <div className="field" style={style}>
        <span className="field__name" title={name}>{name}</span>
        <span className="field__value">{value}</span>
      </div>
  );

  const Field = ({ name, field, makeVisible = false }) => {
    const value = getField(field);
    return <CustomField name={name} field={field} value={value && (value.name || value)} makeVisible={makeVisible} />;
  };

  const onProjectSelect = () => handleProjectSelect(getField('id'));

  return (
    <div className="project-list-item">
      <div className="project-list-item__top">
        <div className="project-list-item__top__left">
          <div className="project-list-item__top__left__title">
            <div className="project-list-item__top__left__title__top">
              <CheckBox
                onChange={onProjectSelect}
                checked={getField('selected') || false}
              />
              <h2>
                <a href={`/firm/projects/${getField('id')}`} target="_blank" className="project-list-item__top__left__title__top__name-link">
                  {getField('name')}
                </a>
              </h2>
              <div className="icons">
                {isVisible([IS_CONFIDENTIAL]) && getField(IS_CONFIDENTIAL) && (
                  <ConfidentialIcon />
                )}
                {isVisible([IS_INTERNAL]) && getField(IS_INTERNAL) && (
                  <InternalIcon />
                )}
              </div>
            </div>

            <div className="project-list-item__top__left__title__bottom">
              <Field key={STATUS} name="Status" field={STATUS} />
              {isVisible([CREATED_AT]) && (
                <Fragment>
                  <DateField name="Created" field={CREATED_AT} value={getField(CREATED_AT)} makeVisible />
                  <Field key={DAYS_OPEN} name="Open" field={DAYS_OPEN} makeVisible />
                </Fragment>
              )}
              <Field name="Project Type" field={TYPE} />
              <CustomField
                key={CLIENT_TEAM}
                name="Client Team"
                field={CLIENT_TEAM}
                style={{ maxWidth: 180, width: 180 }}
                value={<AvatarList avatars={getField('clientTeam')} />}
              />
              <CustomField
                key={PROJECT_TEAM}
                name="Project Team"
                field={PROJECT_TEAM}
                style={{ maxWidth: 180, width: 180 }}
                value={<AvatarList avatars={getField('projectTeam')} />}
              />
            </div>
          </div>
        </div>

        <div className="project-list-item__top__right">
          {getField('clientLogo') &&
            <div className="project-list-item__top__right__logo">
              <img src={project.attributes.clientLogo.urls.wide_large_icon} alt="client logo" />
            </div>
          }
          <div className="project-list-item__top__right__status">
            <div className="project-list-item__top__right__status__top">
              <span>Highest Status</span>
              <span>Candidates</span>
            </div>
            <div className="project-list-item__top__right__status__bottom">
              <span>{getField(HIGHEST_STATUS)}</span>
              <span>{getField(CANDIDATES)}</span>
            </div>
          </div>
        </div>
      </div>

      {isVisible(projectDatesArray.concat(projectProfileArray).concat(projectTeamArray)) && (
        <div className="project-list-item__bottom">
          {isVisible(projectTeamArray) && (
            <div className="project-list-item__bottom__project-team">
              <p>Project Team</p>
              <div className="project-list-item__bottom__project-team__fields">
                <Field key={CREATOR} name="Project Creator" field={CREATOR} />
                <Field key={LEAD} name="Project Lead" field={LEAD} />
              </div>
            </div>
          )}
          {isVisible(projectDatesArray) && (
            <div className="project-list-item__bottom__project-dates">
              <p>Project Dates</p>
              <div className="project-list-item__bottom__project-dates__fields">
                <div className="project-list-item__bottom__project-dates__first">
                  <DateField key={STARTED_AT} name="Started Date" field={STARTED_AT} value={getField(STARTED_AT)} />
                  <DateField key={UPDATED_AT} name="Updated Date" field={UPDATED_AT} value={getField(UPDATED_AT)} />
                </div>
                <div className="project-list-item__bottom__project-dates__second">
                  <DateField key={CLOSED_AT} name="Close Date" field={CLOSED_AT} value={getField(CLOSED_AT)} />
                  <Field key={CLOSE_REASON} name="Close Reason" field={CLOSE_REASON} />
                </div>
                <div className="project-list-item__bottom__project-dates__third">
                  <Field key={EXTERNAL_REFERENCE} name="External Reference" field={EXTERNAL_REFERENCE} />
                  <Field key={LAST_UPDATED_BY} name="Project Last Updated By" field={LAST_UPDATED_BY} />
                </div>
              </div>
            </div>
          )}

          {isVisible(projectProfileArray) && (
            <div className="project-list-item__bottom__project-profile">
              <p>Project Profile</p>
              <div className="project-list-item__bottom__project-profile__fields">
                <div className="project-list-item__bottom__project-profile__first">
                  <Field key={INDUSTRY} name="Industry" field={INDUSTRY} />
                  <Field key={SPECIALTY} name="Specialty" field={SPECIALTY} />
                  <Field key={SENIORITY} name="Seniority" field={SENIORITY} />
                </div>
                <div className="project-list-item__bottom__project-profile__second">
                  <Field key={FUNDING_STAGE} name="Funding Stage" field={FUNDING_STAGE} />
                  <Field key={REVENUE_RANGE} name="Revenue Range" field={REVENUE_RANGE} />
                  <Field key={EMPLOYEE_RANGE} name="Employee Range" field={EMPLOYEE_RANGE} />
                </div>
                <div className="project-list-item__bottom__project-profile__third">
                  <Field name="Global Region" field={GLOBAL_REGION} />
                  <CustomField
                    name="Tags"
                    key={TAGS}
                    field={TAGS}
                    value={
                      getField('tags') && getField('tags').map(tag => (
                        <Tag onClose={() => null} key={tag.id}>{tag.name}</Tag>
                      ))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ProjectListItem.defaultProps = { visibility: {} };

export default ProjectListItem;
