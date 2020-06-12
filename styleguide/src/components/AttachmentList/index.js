import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const AttachmentList = ({ attachments, handleAttachmentRemove, className, editableAccess }) => (
  <ul className={classNames('attachment-list', className)}>
    {attachments.map(({ id, name, fileFileName, downloadUrl }, index) => (
      <li key={`${id}_${name || fileFileName}`} className="attachment-list__item">
        {downloadUrl ? <a href={downloadUrl} className="name">{name || fileFileName}</a> : <span className="name">{name || fileFileName}</span>}
        {editableAccess &&
        <a
          role="button"
          tabIndex={-1}
          className="delete"
          onClick={handleAttachmentRemove}
          data-attachment-id={id || index}
          data-attachment-name={name || fileFileName}
        >
          Delete
        </a>}
      </li>
    ))}
  </ul>
);

export default AttachmentList;

AttachmentList.propTypes = {
  attachments: PropTypes.array,
  className: PropTypes.string,
  handleAttachmentRemove: PropTypes.func
};
