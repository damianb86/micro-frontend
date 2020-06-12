import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-wrapper';

import AttachmentList from './AttachmentList';
import NoteTemplates from './NoteTemplates';

import './index.scss';

class TextEditor extends React.Component {
  handleFileUpload = () => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');

    if (this.props.multiAttach) {
      fileSelector.setAttribute('multiple', 'multiple');
    }

    fileSelector.click();
    fileSelector.onchange = (e) => this.handleAddedFile(e.target.files);
  }

  handleAddedFile = files => this.props.handleAddedFile(files);

  render() {
    const { id, content, onChange, attachments, handleAddedFile, handleRemovedFile, templateOptions, onTemplateSelect, config } = this.props;

    return (
      <section className="text-editor">
        {templateOptions && templateOptions.length > 0 ? <NoteTemplates
          options={templateOptions}
          onSelect={onTemplateSelect}
        /> : null }
        <div className={templateOptions && templateOptions.length > 0 ? 'editor-with-template' : ''}>
          <CKEditor value={content} id={id} onChange={onChange} config={config} />
          {handleAddedFile && <AttachmentList
            attachments={attachments}
            openFileSystem={this.handleFileUpload}
            removedfile={handleRemovedFile}
          />}
        </div>
      </section>
    );
  }
}

TextEditor.defaultProps = { multiAttach: true, config: {}, content: '' };

TextEditor.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  onChange: PropTypes.func,
  attachments: PropTypes.array,
  handleAddedFile: PropTypes.func,
  handleRemovedFile: PropTypes.func,
  onTemplateSelect: PropTypes.func,
  templateOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string
    })
  ),
  multiAttach: PropTypes.bool,
  config: PropTypes.object
};

export default TextEditor;
