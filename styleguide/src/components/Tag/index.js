import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { truncate } from '../../helpers/stringHelpers';
import CloseIcon from '../../icons/icon-12-close.svg';
import './index.scss';

const Tag = ({ id, className, multiple, truncateLength, color, onClose, children }) => {
  const style = classNames('tag-item', {
    'tag-item--multiple': multiple,
    [className]: className
  });

  return (
    <span style={{ backgroundColor: color }} className={style}>
      {truncate(children, truncateLength)}
      {onClose && <CloseIcon data-id={id} onClick={onClose} />}
    </span>
  );
};

Tag.defaultProps = { truncateLength: 27, multiple: false };

Tag.propTypes = {
  truncateLength: PropTypes.number,
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  multiple: PropTypes.bool,
  color: PropTypes.string
};

export default Tag;
