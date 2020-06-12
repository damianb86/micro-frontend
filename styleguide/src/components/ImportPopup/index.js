import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ImportFilesForm from '../ImportFilesForm';

import Modal from '../Modal';

import {
  ALLOWED_CSV_FILE_IMPORT_TYPES,
  ALLOWED_VCARD_FILE_IMPORT_TYPES,
  ALLOWED_RESUME_FILE_IMPORT_TYPES,
  IMPORT_TYPE_TITLE,
  IMPORT_CSV,
  IMPORT_VCARD,
  PARSE_RESUME
} from '../../../constants/people';

import { getPresignedUrl, uploadFileToS3 } from '../../../api/s3Signatures';

const getFileTypes = (importType) => {
  switch (importType) {
    case IMPORT_CSV:
      return ALLOWED_CSV_FILE_IMPORT_TYPES;
    case IMPORT_VCARD:
      return ALLOWED_VCARD_FILE_IMPORT_TYPES;
    case PARSE_RESUME:
      return ALLOWED_RESUME_FILE_IMPORT_TYPES;
    default:
      return [];
  }
};

const getDescription = (importType) => {
  switch (importType) {
    case IMPORT_CSV:
      return (
        <div>
          <p>This import method supports any Outlook compatible CSV file. You can also manually list one or more people tags in the final column of your CSV file. Use a semicolon to separate multiple tags.<br /><br /></p>
          <p>After uploading your CSV file, your batch import will run behind the scenes. You will receive an email when your import is finished.</p>
        </div>
      );
    case IMPORT_VCARD:
      return (
        <div>
          <p>Make sure you are uploading a vCard 2.1 or 3.0 file. If your address book doesn&apos;t tell you what version its creating you are probably fine. We support multiple contacts per file, though some address books (notably Outlook) insist on exporting only a single contact per file.<br /><br /></p>
          <p>If you want to import all your contacts from Outlook we highly recommend the &quot;Outlook CSV&quot; import option instead.</p>
        </div>
      );
    case PARSE_RESUME:
      return (
        <div>
          <p>To parse a resume file, upload the file here. The information in the resume will be extracted and added to the contact record. The resume file will also be attached to the record.<br /><br /></p>
          <p>After uploading, the parsing process will run behind the scenes. You will receive an email when your import is finished.</p>
        </div>
      );
    default:
      return '';
  }
};

export const ImportPopup = ({ importType, onImportCancel, onImportSubmit }) => {
  const [files, setFiles] = useState([]);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleImportSubmit = () => {
    setSubmitDisabled(true);
    const fileNames = files.map(file => file.name);
    return (
      getPresignedUrl({ fileNames }).then((payload) => {
        const presignedUrls = payload.presigned_urls;

        Promise.all(presignedUrls.map((presignedUrl, index) => uploadFileToS3(presignedUrl.url, files[index]))).then((values) => {
          const uploadedFileKeys = values.map((value, index) => (value.status === 200 ? presignedUrls[index].key : null)).filter(i => i);
          onImportSubmit(uploadedFileKeys);
        });
      })
    );
  };

  const handleAddFile = newFiles => setFiles([...files, newFiles]);
  const handleRemoveFile = ({ target }) => setFiles(files.filter((file, index) => !target || `${index}` !== target.id));

  return (
    <Modal
      closeIcon
      title={IMPORT_TYPE_TITLE[importType]}
      isOpen
      onClose={onImportCancel}
    >
      <ImportFilesForm
        description={getDescription(importType)}
        allowedFileTypes={getFileTypes(importType)}
        onSubmit={handleImportSubmit}
        onCancel={onImportCancel}
        onAddFile={handleAddFile}
        onRemoveFile={handleRemoveFile}
        files={files}
        isSubmitDisabled={isSubmitDisabled}
      />
    </Modal>
  );
};

ImportPopup.propTypes = {
  importType: PropTypes.string,
  onImportCancel: PropTypes.func,
  onImportSubmit: PropTypes.func
};

export default ImportPopup;
