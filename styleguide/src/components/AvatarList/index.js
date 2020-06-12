import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { avatarPropTypes } from '../Avatar/PropTypes';
import Avatar from '../Avatar';
import Badge from '../Badge';
import ChevronUpIcon from '../../icons/icon-12-chevron-up.svg';
import LeadIcon from '../../icons/lead_blue.svg';
import './index.scss';
import SimplePopover from '../SimplePopover';
import { filterAndJoin } from '../../helpers';

const AvatarList = ({ avatars, avatarsToShowCount }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const avatarsCount = avatars.length;
  const maxWidth = 28 * avatarsToShowCount;

  const handleToggleCollapse = () => setIsCollapsed(!isCollapsed);

  // We use different classes to define the positioning of the Popover, since its height changes
  const visibleFieldsClass = fields =>
    `fields-visible-${Object.values(fields).filter(Boolean).length} ${fields.isOwner || fields.isLead ? 'has-label' : ''}`;

  return (
    <div className="avatar-list">
      <div className="avatar-list__items" style={{ maxWidth }}>
        {avatars.slice(0, isCollapsed ? avatarsToShowCount : avatarsCount).map(({ id, isOwner, isLead, name, nameInitials, telephone, email, company, profilePicture, position }) => (
          <div className="avatar-list__items__item" key={`${id}`}>
            <SimplePopover
              content={
                <Fragment>
                  <p className="name" title={name}>{name}</p>
                  <div className="telephone-email-company">
                    <p className="telephone-email" title={filterAndJoin([telephone, email], ' / ')}>{filterAndJoin([telephone, email], ' / ')}</p>
                    <p className="company" title={filterAndJoin([position, company], ' at ')}>{filterAndJoin([position, company], ' at ')}</p>
                  </div>
                  {isLead && <p className="lead">Project Lead</p>}
                  {isOwner && <p className="owner">Project Creator</p>}
                </Fragment>
              }
              closeDelay={100}
              openDelay={100}
              className={visibleFieldsClass({ isOwner, isLead, company, telephoneEmail: telephone || email })}
            >
              <Avatar name={name} nameInitials={nameInitials} size="small" type="circle" useTwoInitials src={profilePicture && profilePicture.urls.icon} />
            </SimplePopover>
            {isLead && <LeadIcon className="lead" />}
            {isOwner && <Badge colorClass="badge-project-owner" shapeClass="badge-round-on-top" />}
          </div>
        ))}
      </div>
      {avatarsCount > avatarsToShowCount && (
        <div className="avatar-list__see-more">
          {isCollapsed ? (
            <a onClick={handleToggleCollapse} role="button" tabIndex="0">+{avatarsCount - avatarsToShowCount}</a>
          ) : (
            <ChevronUpIcon className="chevron-up" onClick={handleToggleCollapse} role="button" tabIndex="0" />
          )}
        </div>
      )}
    </div>
  );
};

AvatarList.defaultProps = { avatars: [], avatarsToShowCount: 5 };

AvatarList.propTypes = {
  avatars: PropTypes.arrayOf(PropTypes.shape({
    ...avatarPropTypes,
    isOwner: PropTypes.bool,
    isLead: PropTypes.bool
  })),
  avatarsToShowCount: PropTypes.number
};

export default AvatarList;
