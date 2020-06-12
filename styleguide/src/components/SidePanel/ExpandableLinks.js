import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import FullScreenIcon from '../../../icons/icon-16-fullscreen.svg';
import CollapseIcon from '../../../icons/icon-16-collapse-window.svg';
import MinimizeIcon from '../../../icons/icon-16-subtract.svg';

const ExpandableLinks = ({ expandLink, expand, onMinimize }) => (
  <Fragment>
    <li className="side-panel__controls__item expand-collapse-item">
      <a href={expandLink} target="_blank" role="button" tabIndex="0">
        {expand ? <CollapseIcon /> : <FullScreenIcon />}
      </a>
    </li>
    <li className="side-panel__controls__item minimize-item">
      <a onClick={onMinimize} role="button" tabIndex="0">
        <MinimizeIcon />
      </a>
    </li>
  </Fragment>
);

ExpandableLinks.propTypes = {
  expandLink: PropTypes.string,
  expand: PropTypes.bool,
  onMinimize: PropTypes.func
};

export default ExpandableLinks;
