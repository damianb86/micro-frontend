import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SimpleOption = ({ option, active, assignReference, onKeyPress, onKeyDown, onItemClick }) => {
  let { id, value } = option;
  const { icon, type, className } = option;
  if (id === undefined) {
    id = option;
    value = option;
  }

  return (
    <li
      className={classNames(type, { active: id === active, selected: option.selected }, `simple-option-${id} ${option.disabled ? 'disabled' : ''}`, className)}
      role="presentation"
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onClick={onItemClick}
      key={id}
      data-id={id}
      ref={assignReference}
      title={typeof value === 'string' ? value : ''}
    >
      <a role="menuitem" data-id={id}>
        {icon && typeof icon !== 'object' && <img src={icon} alt="" />} {value}
      </a>
    </li>
  );
};

SimpleOption.propTypes = {
  option: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]).isRequired,
        value: PropTypes.any,
        selected: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.object),
        disabled: PropTypes.bool
      }),
      PropTypes.string
    ])
  ).isRequired,
  active: PropTypes.string,
  onKeyPress: PropTypes.func,
  onKeyDown: PropTypes.func,
  onItemClick: PropTypes.func
};

export default SimpleOption;
