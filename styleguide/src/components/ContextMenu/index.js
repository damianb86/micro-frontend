import React from 'react';
import PropTypes from 'prop-types';
import SelectOptions from '../SelectOptions';
import MoreIcon from '../../../assets/images/icon-16-more.svg';
import './index.scss';

export const ContextMenu = ({ id, options, onSelect, menuIcon: MenuIcon, className }) => (
  <SelectOptions
    id={id}
    isCaretVisible={false}
    prompt={<img src={MenuIcon || MoreIcon} alt="MoreMenuIcon" />}
    className={`${className} context-menu`}
    options={options}
    onSelect={onSelect}
  />
);

ContextMenu.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ContextMenu;
