import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import TextEditor from '../TextEditor';
import LabelledInput from '../LabelledInput';
import ActiveForm from '../ActiveForm';
import SelectOptions from '../SelectOptions';
import { requestNoteTemplates } from '../../../actions/noteTemplates';
import { noteTemplatesOptions } from '../../../selectors';

import './index.scss';

export class MassMailerPopup extends Component {
  state = { content: 'Hi %FNAME%,', subject: '' };

  componentDidMount() {
    this.props.dispatch(requestNoteTemplates());
  }

  onSubjectChange = e => this.setState({ subject: e.target.value });
  onTextEditorChange = content => this.setState({ content });

  onTemplateSelect = (templateId) => {
    const noteTemplate = this.props.noteTemplates[templateId];
    this.setState({ content: noteTemplate.content });
  }

  handleSubmit = () => {
    const { content, subject } = this.state;
    const data = { content, subject };
    return this.props.handleSubmit(data)
      .then((res) => {
        if (!res.error) this.props.onClose();
        return res;
      });
  }

  render() {
    const { subject, content } = this.state;
    const { isOpen, title, style, receiver, onClose, templateOptions } = this.props;

    const properties = {
      disabled: !content,
      onCancel: onClose,
      onSubmit: this.handleSubmit,
      submitButton: 'Send'
    };

    return (
      <Modal onClose={onClose} title={title} isOpen={isOpen} style={style} closeIcon>
        <ActiveForm {...properties}>
          <div className="mass-mailer-top-text">
            <span>{`This message will be sent to ${receiver}.`}</span>
            {templateOptions && templateOptions.length > 0 &&
              <SelectOptions
                bsStyle="primary"
                prompt="Template"
                options={templateOptions}
                onSelect={this.onTemplateSelect}
                id="NoteTemplates"
              />}
          </div>
          <LabelledInput type="text" name="subject" label="Subject Line" value={subject} onChange={this.onSubjectChange} />
          <LabelledInput type="custom" className="ck-editor" label="Message">
            <TextEditor content={content} id="note-ckeditor" onChange={this.onTextEditorChange} />
          </LabelledInput>
        </ActiveForm>
      </Modal>
    );
  }
}

MassMailerPopup.defaultProps = { receiver: 'none' };

MassMailerPopup.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  isOpen: PropTypes.bool,
  receiver: PropTypes.string,
  onClose: PropTypes.func,
  handleSubmit: PropTypes.func
};

const mapStateToProps = state => ({
  templateOptions: noteTemplatesOptions(state),
  noteTemplates: state.entities.noteTemplates
});

export default connect(mapStateToProps)(MassMailerPopup);
