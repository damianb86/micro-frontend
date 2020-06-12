import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import TextEditorInline from './TextEditorInline';

class TextEditorInlineContainer extends React.Component {
  state = { newContent: '', oldContent: '' }

  componentDidMount() {
    this.setState({ newContent: this.props.content, oldContent: this.props.content });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState({ newContent: nextProps.content, oldContent: nextProps.content });
    }
  }

  handleChange = (editedContent) => {
    this.setState({ newContent: editedContent });
  }

  handleSave = () => {
    if (this.state.oldContent !== this.state.newContent) {
      this.setState({ oldContent: this.state.newContent });
      this.props.onSave(this.state.newContent);
    }
  };

  handleCancel = () => {
    const { oldContent } = this.state;

    this.setState({ newContent: oldContent });
    this.props.onCancel();
  };

  render() {
    const { newContent } = this.state;
    const { id, placeholder, config, editable } = this.props;

    return (
      <TextEditorInline
        placeholder={placeholder}
        content={newContent}
        onChange={this.handleChange}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        id={id}
        config={config}
        editable={editable}
      />
    );
  }
}

TextEditorInlineContainer.defaultProps = {
  config: {},
  onSave: () => null,
  onCancel: () => null
};

TextEditorInlineContainer.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  content: PropTypes.string,
  config: PropTypes.object,
  editable: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

export default TextEditorInlineContainer;
