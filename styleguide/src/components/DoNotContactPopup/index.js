import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import ActiveForm from '../ActiveForm';

class DoNotContactPopup extends Component {
  handleSubmit = () => {
    return this.props.onSubmit()
      .then((res) => {
        if (!res.error) this.props.onClose();
        return res;
      });
  }

  render() {
    const { isOpen, title, style, onClose } = this.props;
    return (
      <Modal onClose={onClose} title={title} isOpen={isOpen} style={style} closeIcon>
        <ActiveForm onSubmit={this.handleSubmit} submitButton="Apply" cancelButton="Cancel" onCancel={onClose}>
          <span>Are you sure you want to add a Do Not Contact to these candidates?</span>
        </ActiveForm>
      </Modal>
    );
  }
}

DoNotContactPopup.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.any,
  style: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default DoNotContactPopup;
