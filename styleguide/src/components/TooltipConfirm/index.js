import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TooltipConfirm = ({ showTooltip, children, ...props }) => (
  <React.Fragment>
    {showTooltip && <TooltipContent {...props} />}
    {children}
  </React.Fragment>
);

class TooltipContent extends Component {
  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick = ({ target }) => {
    if (target.className.indexOf('tooltip-confirm') === -1) {
      this.props.onCancel();
    }
  }

  render() {
    const { className, onConfirm, onCancel, confirmationText } = this.props;

    return (
      <div className={`tooltip-confirm ${className}`}>
        <div className="tooltip-confirm__content">
          <p className="tooltip-confirm__text">{confirmationText}</p>
          <div className="tooltip-confirm__content__options">
            <a role="button" tabIndex="-1" className="tooltip-confirm__content__options__yes" onClick={onConfirm}>Yes</a>
            <a role="button" tabIndex="-2" className="tooltip-confirm__content__options__no" onClick={onCancel}>No</a>
          </div>
          <svg role="presentation" focusable="false">
            <path d="M0,10 10,0 20,10" />
          </svg>
        </div>
      </div>
    );
  }
}

TooltipConfirm.defaultProps = { className: '' };

TooltipConfirm.propTypes = {
  className: PropTypes.string,
  showTooltip: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmationText: PropTypes.string.isRequired
};

export default TooltipConfirm;
