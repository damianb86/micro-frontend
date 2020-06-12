import React from 'react';
import { array, arrayOf, object } from 'prop-types';

import ThumbUp from '../../../icons/thumb_up.svg';
import ThumbDown from '../../../icons/thumb_down.svg';
import './index.scss';

const ThumbsFeedback = ({ up, down, onClickUp, onClickDown }) => (
  <div className="thumbs-feedback">
    <div className="thumbs-feedback__up">
      <ThumbUp onClick={onClickUp} />
      <span>{up.length || ''}</span>
    </div>
    <div className="thumbs-feedback__down">
      <ThumbDown onClick={onClickDown} />
      <span>{down.length || ''}</span>
    </div>
  </div>
);

ThumbsFeedback.defaultProps = {
  up: [],
  down: []
};

ThumbsFeedback.propTypes = {
  up: array,
  down: array
};

export default ThumbsFeedback;

const ThumbsFeedbackPopoverContent = ({ users }) => (
  <div className="thumbs-feedback__popover">
    {users.map(({ name }) => (
      <span>{name}</span>
    ))}
  </div>
);

ThumbsFeedbackPopoverContent.defaultProps = {
  users: []
};

ThumbsFeedbackPopoverContent.propTypes = {
  users: arrayOf(object)
};
