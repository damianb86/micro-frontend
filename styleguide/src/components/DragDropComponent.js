import React, { Component, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

import DropzoneComponent from 'react-dropzone-component';

import '../styles/drag_drop.scss';

const DropzoneConfig = {
  // default allowed fileTypes are '.jpeg', '.png', '.pdf', '.doc', '.docx'
  acceptedFiles: 'image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  autoProcessQueue: false,
  createImageThumbnails: true,
  uploadMultiple: true,
  maxFilesize: 20,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview">
      <div className="dz-details">
        <div className="drop-zone-img">
          <img data-dz-thumbnail="true" alt="thumbnail" />
        </div>
        <div className="dz-filename">
          <span data-dz-name="true" />
        </div>
        <div className="dz-size">
          <span data-dz-size="" />
        </div>
        <span className="dz-remove icon-action-wrapper icon-xs close-icon" data-dz-remove="" />
      </div>
    </div>
  )
};

// please consult http://www.dropzonejs.com/#configuration

export default class DragDropComponent extends Component {
  state = { error: null };

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetImagePreviews && !this.props.resetImagePreviews) this.dropzone.removeAllFiles();
  }

  dropzone = null;

  removeOldestDropzoneFile = () => this.dropzone.emit('removedfile', this.dropzone.files.shift());

  setErrors = (message) => {
    if (this.props.setErrors) {
      return this.props.setErrors(message);
    }
    this.setState({ error: message });
  };

  errormultiple = (files, message) => {
    files.forEach(f => this.dropzone.removeFile(f));
    this.setErrors(message);
  };

  error = (file, message) => {
    this.dropzone.removeFile(file);
    this.setErrors(message);
  };

  addedFile = (file) => {
    if (this.state.error) {
      this.setState({ error: null });
    }

    if (file.type.match(/pdf/)) {
      this.dropzone.emit('thumbnail', file, null);
    } else if (file.type.match(/msword/)) {
      this.dropzone.emit('thumbnail', file, null);
    }

    if (this.props.addedFile) {
      this.props.addedFile(file, this.dropzone.files);

      while (this.dropzone && this.dropzone.files.length > this.props.maxFiles) {
        this.removeOldestDropzoneFile();
      }
    }
  };

  removedfile = file => this.props.removedfile(file, this.dropzone.files);

  config = { postUrl: 'no-url' };

  eventHandlers = {
    init: (dz) => { this.dropzone = dz; },
    removedfile: this.removedfile,
    error: this.error,
    errormultiple: this.errormultiple,
    addedfile: this.addedFile
  };


  render() {
    const { allowedFileTypes, multiple, onDrop, invalidFileTypeErrorMessage, className, displayMessage, showDragDrop, isVisible } = this.props;
    const djsConfig = { ...DropzoneConfig, acceptedFiles: allowedFileTypes.join(',') };
    const { error } = this.state;

    if (multiple === false) {
      Object.assign(djsConfig, { uploadMultiple: false, drop: onDrop });
    }

    if (invalidFileTypeErrorMessage) {
      djsConfig.dictInvalidFileType = invalidFileTypeErrorMessage;
    }

    return isVisible && (
      <DropzoneComponent config={this.config} eventHandlers={this.eventHandlers} djsConfig={djsConfig} className={className}>
        {showDragDrop &&
          <Fragment>
            {error && <div className="dz-error">{error}</div>}
            <div className="dz-message">
              <div className="dz-message__wrapper">
                <span className="dz-message__wrapper__icon">Icon</span>
                <span className="dz-message__wrapper__display-message">{displayMessage}</span>
              </div>
            </div>
          </Fragment>
        }
      </DropzoneComponent>
    );
  }
}

DropzoneComponent.propTypes = {
  resetImagePreviews: PropTypes.func,
  setErrors: PropTypes.func,
  addedFile: PropTypes.func,
  removedfile: PropTypes.func,
  maxFiles: PropTypes.number,
  allowedFileTypes: PropTypes.array,
  multiple: PropTypes.bool,
  isVisible: PropTypes.bool,
  onDrop: PropTypes.func,
  className: PropTypes.string,
  displayMessage: PropTypes.string,
  showDragDrop: PropTypes.bool,
  invalidFileTypeErrorMessage: PropTypes.string
};

DragDropComponent.defaultProps = {
  isVisible: true,
  maxFiles: Number.MAX_VALUE,
  allowedFileTypes: ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  displayMessage: 'Drag and drop to attach files'
};
