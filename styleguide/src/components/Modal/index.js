import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import CloseIcon from '../../icons/icon-16-close.svg';
import ErrorBoundary from '../ErrorBoundary';
import ProgressIndicator from '../ProgressIndicator';

import './index.scss';

const Modal = ({
  onClose,
  closeIcon,
  closeTimeoutMS,
  shouldCloseOnOverlayClick,
  isOpen,
  style,
  title,
  progressSteps,
  scrollable,
  openAnimation,
  children
}) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  return (
    <CSSTransition
      in={show}
      timeout={250}
      classNames="closing"
      onExited={onClose}
      unmountOnExit
    >
      <ReactModal
        ariaHideApp={false}
        closeTimeoutMS={closeTimeoutMS}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        isOpen={true}
        onRequestClose={() => setShow(false)}
        style={style}
        overlayClassName={classNames('ReactModal__Overlay', openAnimation)}
      >
        {title || closeIcon ? (
          <section className="modal-title">
            {' '}
            <div className="modal-title__main">
              {title} {closeIcon ? <CloseIcon onClick={() => setShow(false)} /> : null}
            </div>
            {progressSteps && progressSteps.length > 0 ? (
              <div className="modal-title__progress-indicator-wrapper">
                <ProgressIndicator steps={progressSteps} />
              </div>
            ) : null}
          </section>
        ) : null}
        <section className={classNames('modal-content clearfix', { scrollable })}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </section>
      </ReactModal>
    </CSSTransition>
  );
};

Modal.defaultProps = {
  isOpen: true,
  shouldCloseOnOverlayClick: false,
  closeIcon: false,
  style: {},
  scrollable: false,
  openAnimation: 'SlideXIn'
};

Modal.propTypes = {
  closeTimeoutMS: PropTypes.number,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  shouldCloseOnOverlayClick: PropTypes.bool,
  onClose: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node,
  closeIcon: PropTypes.bool,
  progressSteps: PropTypes.array,
  scrollable: PropTypes.bool,
  openAnimation: PropTypes.oneOf(['SlideXIn', 'SlideYIn'])
};

export default Modal;
