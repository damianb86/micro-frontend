import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.scss';
import ActiveForm from '../ActiveForm';
import DragDropWithList from '../DragDropWithList';

const ImportFilesForm = ({ files, filesLimit, description, allowedFileTypes, className, onAddFile, onRemoveFile, onSubmit, onCancel, isSubmitDisabled }) => (
  <ActiveForm
    className={classNames('import-files-form', className)}
    submitButtonClass=""
    submitButton="Import"
    disabled={!files.length || isSubmitDisabled}
    onSubmit={onSubmit}
    onCancel={onCancel}
  >
    <div className="import-files-form__description">
      {description}
    </div>
    <DragDropWithList
      showDragDrop={!filesLimit || files.length < filesLimit}
      attachments={files}
      onAddFile={onAddFile}
      onRemoveFile={onRemoveFile}
      className="import-files-form__dnd"
      allowedFileTypes={allowedFileTypes}
    />
  </ActiveForm>
);

ImportFilesForm.defaultProps = {
  files: [],
  filesLimit: 1,
  allowedFileTypes: [
    'image/jpg', 'image/jpeg', 'image/png', 'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  isSubmitDisabled: false
};

ImportFilesForm.propTypes = {
  className: PropTypes.string,
  files: PropTypes.array,
  filesLimit: PropTypes.number,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  allowedFileTypes: PropTypes.array,
  onAddFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isSubmitDisabled: PropTypes.bool
};

export default ImportFilesForm;
