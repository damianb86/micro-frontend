import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-wrapper';

import './index.scss';

class TextEditorInline extends Component {
  state = { editing: false };

  componentDidMount() {
    this.nodeRef = createRef();
    this.editorRef = createRef();

    if (this.props.editable) {
      document.body.addEventListener('click', this.handleClickOutside);
      document.body.addEventListener('touchstart', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
    document.body.removeEventListener('touchstart', this.handleClickOutside);
  }

  handleKeyPress = (e) => {
    if (e.data && e.data.keyCode === 27) {
      this.props.onCancel();
      this.setState({ editing: false });
    }
  };

  handleStartEditing = () => this.setState({ editing: true }, () => {
    if (this.editorRef.current.instance) {
      this.editorRef.current.instance.on('key', this.handleKeyPress);
    }
  });

  handleClickOutside = (e) => {
    if (this.nodeRef.current && !this.nodeRef.current.contains(e.target)) {
      this.props.onSave();
      this.setState({ editing: false });
    }
  };

  render() {
    const { editing } = this.state;
    const { id, content, onChange, placeholder, config, editable } = this.props;

    return (
      <div className="text-editor-inline" ref={this.nodeRef} onClick={editable ? this.handleStartEditing : null} role="button" tabIndex={0}>
        {editable && editing ? (
          <CKEditor
            ref={this.editorRef}
            id={id}
            value={content}
            onChange={onChange}
            config={config}
          />
        ) : (
          <div
            className="text-editor-inline__content"
            dangerouslySetInnerHTML={{ __html: content || `<span class="empty-message">${placeholder}</span>` }}
          />
        )}
      </div>
    );
  }
}

TextEditorInline.defaultProps = {
  config: {
    toolbar: [
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'BGColor', 'TextColor'] },
      { name: 'paragraph', items: ['NumberedList', 'BulletedList'] }
    ]
  },
  editable: true
};

TextEditorInline.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  content: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  config: PropTypes.object,
  editable: PropTypes.bool
};

export default TextEditorInline;
