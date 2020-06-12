import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import DragDropComponent from './DragDropComponent';
import PersonImage from './PersonImage';
import CompanyLogo from './CompanyLogo';
import ActiveForm from './ActiveForm';

export default class EditableImageModal extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: null, editMode: true, files: [] };
  }

  componentWillMount() {
    if (this.props.attachment) {
      this.setState({ editMode: false });
    }
  }

  setErrors(error){ return this.setState({ errors: error }) };

  handleUpload(event) {
    if (this.state.editMode && this.state.files && this.state.files[0]) {
      return this.props.uploadFile(event, this.state.files[0]);
    }

    this.setState({ editMode: true, files: [] });
  };

  handleCancel(){ return this.props.closeModal(); }

  handleDelete () {
    this.props.removeFile();
    this.setState({ editMode: true, files: [] });
  };

  handleAddedFile = file => this.setState({ errors: null, files: [file, ...this.state.files] });
  handleRemovedFile = file => this.setState({ files: this.state.files.filter(f => f === file) });

  renderContent() {
    const { attachableType, attachable } = this.props;

    if (!this.state.editMode) {
      switch (attachableType) {
        case 'person':
          return (
            <div className="text-center" style={{ backgroundColor: 'black' }}>
              <PersonImage size="original" person={attachable} />
            </div>
          );
        case 'company':
          return (
            <div className="text-center">
              <CompanyLogo size="original" company={attachable} />
            </div>
          );
        default:
          return null;
      }
    } else {
      return (
        <DragDropComponent
          multiple={false}
          addedFile={this.handleAddedFile}
          removedfile={this.handleRemovedFile}
          allowedFileTypes={this.props.allowedFileTypes}
          setErrors={this.setErrors}
          invalidFileTypeErrorMessage={this.props.invalidFileTypeErrorMessage}
          className="full-width"
          maxFiles={1}
        />
      );
    }
  }

  render() {
    const formProps = {
      onSubmit: this.handleUpload,
      onCancel: this.handleCancel,
      submitButton: this.state.editMode ? 'Save Upload' : 'Upload New',
      disabled: this.state.editMode ? !this.state.files || !this.state.files[0] : false,
      errors: this.state.errors
    };

    if (!this.state.editMode) {
      formProps.onDelete = this.handleDelete;
    }

    return (
      <Modal
        title={this.state.editMode ? 'Upload Image' : 'Current Image'}
        isOpen
        onClick={this.closeModal}
        closeIcon={!this.state.editMode}
        onClose={this.handleCancel}
      >
        <ActiveForm {...formProps}>{this.renderContent()}</ActiveForm>
      </Modal>
    );
  }
}

EditableImageModal.propTypes = {
  closeModal: PropTypes.func,
  handleAddedFile: PropTypes.func,
  handleRemovedFile: PropTypes.func,
  attachableType: PropTypes.string,
  attachable: PropTypes.object,
  attachment: PropTypes.object,
  allowedFileTypes: PropTypes.array,
  uploadFile: PropTypes.func,
  removeFile: PropTypes.func
};
