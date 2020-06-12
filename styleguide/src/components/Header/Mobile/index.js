import React from 'react';
import PropTypes from 'prop-types';


import NavigationBar from '../../../../containers/NavigationBar';
import TaskIcon from '../../../../icons/task.svg';
import './index.scss';

export const MobileHeader = ({ title, menuTitle, currentItem, backLinkUrl, tasksUrl, avatarLink, avatar, className }) => (
  <div className={`page-header ${className || ''}`}>
    <div className="page-header__navigation_bar">
      <NavigationBar
        section="project"
        title={menuTitle}
        currentItem={currentItem}
        backLinkUrl={backLinkUrl}
        mobile
      />
    </div>
    <div className="page-header__title">
      {title}
    </div>
    <div className="page-header__right">
      <a className="page-header__right__task" href={tasksUrl}>
        <TaskIcon />
      </a>
      <a className="page-header__right__avatar" href={avatarLink}>
        {avatar}
      </a>
    </div>
  </div>
);

MobileHeader.propTypes = {
  title: PropTypes.string,
  menuTitle: PropTypes.string,
  currentItem: PropTypes.string,
  backLinkUrl: PropTypes.string,
  tasksUrl: PropTypes.string,
  avatar: PropTypes.object,
  avatarLink: PropTypes.string,
  className: PropTypes.string
};

export default MobileHeader;
