import React from 'react';
import PropTypes from 'prop-types';

import Popover from './Popover';
import useDelayedToggle from '../../../hooks/useDelayedToggle';
import './index.scss';

const IconPopover = ({ icon, loadContent, closeDelay = 400, className }) => {
  const [isOpen, setOpen, setClose] = useDelayedToggle(false, closeDelay);

  return (
    <div className="pop-over" onMouseEnter={setOpen} onMouseLeave={setClose}>
      {icon}
      {isOpen && <Popover className={className} loadContent={loadContent} />}
    </div>
  );
};

Popover.propTypes = {
  icon: PropTypes.node,
  closeDelay: PropTypes.number,
  loadContent: PropTypes.func,
  className: PropTypes.string
};

export default IconPopover;
