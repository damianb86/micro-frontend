import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DragDropComponent from '../DragDropComponent';
import './index.scss';

const DragDropWithList = ({ attachments, onAddFile, onRemoveFile, setErrors, existingAttachments, onRemoveExistingFile, showDragDrop, className, allowedFileTypes, isVisible }) => {
  const handleAddFile = (file) => {
    // The last condition validates file extension from the file.name incase file.type is blank
    if (!allowedFileTypes.length || allowedFileTypes.includes(file.type) || allowedFileTypes.includes(`.${file.name.substr(file.name.lastIndexOf('.') + 1)}`)) {
      onAddFile(file);
    }
  };

  return (
    <div className={classNames('full-width dnd-list__files', className)}>
      <div>
        {existingAttachments.map(file => (
          <p key={file.fileFileName} className="full-width dnd-list__files__file">
            <span className="name">{file.fileFileName}</span>
            <a role="button" tabIndex="-1" className="delete" id={file.id} onClick={onRemoveExistingFile}>Delete</a>
          </p>
        ))}
        {attachments.map((file, index) => (
          <p key={file.name} className="full-width dnd-list__files__file">
            <span className="name">{file.name}</span>
            <a role="button" tabIndex="-1" className="delete" id={index} onClick={onRemoveFile}>Delete</a>
          </p>
        ))}
      </div>
      <DragDropComponent
        addedFile={handleAddFile}
        removedfile={onRemoveFile}
        setErrors={setErrors}
        className="full-width dnd-list"
        displayMessage="Drag and drop files or click to select from your device."
        allowedFileTypes={allowedFileTypes}
        showDragDrop={showDragDrop}
        isVisible={isVisible}
      />
    </div>
  );
};

export default DragDropWithList;

DragDropWithList.defaultProps = {
  isVisible: true,
  existingAttachments: [],
  attachments: [],
  showDragDrop: true,
  setErrors: () => null,
  allowedFileTypes: []
};

DragDropWithList.propTypes = {
  attachments: PropTypes.array,
  onAddFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
  existingAttachments: PropTypes.array,
  onRemoveExistingFile: PropTypes.func,
  showDragDrop: PropTypes.bool,
  isVisible: PropTypes.bool,
  className: PropTypes.string,
  setErrors: PropTypes.func,
  allowedFileTypes: PropTypes.array
};
