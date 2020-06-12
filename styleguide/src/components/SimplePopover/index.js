import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.scss';
import useDelayedToggle from '../../hooks/useDelayedToggle';

const SimplePopover = ({ className, children, content, width, height, closeDelay, openDelay }) => {
  const [isOpen, setOpen, setClose] = useDelayedToggle(false, closeDelay, openDelay);

  return (
    <div className="simple-pop-over-container" onMouseOver={setOpen} onMouseLeave={setClose} title="">
      <div>
        {children}
      </div>
      {isOpen && (
        <div className={classNames('simple-pop-over', className)}>
          <div className="simple-pop-over__content" style={{ width, height }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

SimplePopover.defaultProps = {
  closeDelay: 400,
  openDelay: 0
};

SimplePopover.propTypes = {
  content: PropTypes.any,
  width: PropTypes.number,
  height: PropTypes.number,
  closeDelay: PropTypes.number,
  openDelay: PropTypes.number,
  className: PropTypes.string
};

export default SimplePopover;
