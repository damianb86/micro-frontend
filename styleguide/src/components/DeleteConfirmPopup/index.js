import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

import './index.scss';
import '../../../styles/form.scss';

const DeleteConfirmPopup = (props) => {
  let yesButton;
  let noButton;

  if (props.onYes) {
    yesButton = (
      <button className="delete-button" onClick={props.onYes} disabled={props.yesButtonDisable}>
        {props.yesLabel}
      </button>
    );
  }

  if (props.onNo) {
    noButton = (
      <button className="sec-button" onClick={props.onNo}>
        {props.noLabel}
      </button>
    );
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onNo} title={props.title} closeIcon style={{ content: { overflow: 'visible' } }}>
      {props.children}
      <div className="clearfix delete-modal-button-wrapper">
        {yesButton}
        {noButton}
      </div>
    </Modal>
  );
};

DeleteConfirmPopup.defaultProps = {
  yesLabel: 'Delete',
  noLabel: 'Cancel',
  isOpen: true,
  yesButtonDisable: false
};

DeleteConfirmPopup.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  yesLabel: PropTypes.string,
  noLabel: PropTypes.string,
  yesButtonDisable: PropTypes.bool,
  isOpen: PropTypes.bool
};

export default DeleteConfirmPopup;
