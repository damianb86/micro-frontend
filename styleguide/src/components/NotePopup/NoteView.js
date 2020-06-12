import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import moment from 'moment';

import SelectOptions from '../SelectOptions';
import { truncate } from '../../../helpers/stringHelpers';
import { saveNote, getNote, clearNoteAutoSave } from '../../../appLocalStorage';

import CheckBox from '../../common/CheckBox';
import ActiveForm from '../../common/ActiveForm';
import TextEditor from '../../common/TextEditor';
import ToggleSwitch from '../../common/ToggleSwitch';
import NoteContextOptions from './NoteContextOptions';

const MAX_DRAFT_LENGTH = 65000;

class NoteView extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      content: '',
      categoryId: null,
      emailTeam: false,
      emailClient: false,
      status: false,
      attachments: [],
      notableType: null,
      attachedToId: props.attachedToId,
      attachedToType: props.attachedToType,
      attachedToName: props.attachedToName,
      draftLoaded: false,
      notification: null
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    this.saveDraft = debounce(this.saveDraft, 1000);
    const noteDraft = getNote(this.getDraftNoteId(), this.getDraftKey());

    if (noteDraft) {
      this.setState({
        ...noteDraft,
        draftLoaded: true,
        notification: 'Your draft has been restored'
      });
    }
  }

  getDraftNoteId = () => (this.props.isBulk ? 'bulk-note' : 'new-note');

  getDraftKey = () => {
    const { attachedToId, attachedToType } = this.state;
    const { personId, projectId } = this.props;

    if (this.props.isBulk) {
      return ({
        attachedToType,
        attachedToId: `bulk-note-${attachedToType}`,
        currentUserId: `bulk-note-${attachedToType}`
      });
    }

    return ({
      attachedToType,
      attachedToId: `modal-${attachedToId}`,
      currentUserId: projectId || personId
    });
  }

  onChangeFileIn = (val) => {
    const [attachedToId, attachedToType] = val.split('_');
    this.setState({ attachedToId, attachedToType });
  };

  onChange = content => this.setState({ content: truncate(content, MAX_DRAFT_LENGTH) }, this.saveDraft);
  onTemplateSelect = (id) => {
    const template = this.props.noteTemplates[id];
    this.setState({ content: template.content });
  }

  handleCategoryClick = val => this.setState({ categoryId: val });
  handleCheckboxChecked = e => this.setState({ [e.target.name]: e.target.checked });
  handleStatusUpdate = () => this.setState(prevState => ({ status: !prevState.status }));
  handleAddedFile = (files) => {
    const data = Array.from(files).map(f => f);
    return this.setState(({ attachments }) => ({ attachments: attachments.concat(data) }));
  };
  handleRemovedFile = file => this.setState(({ attachments }) => ({ attachments: attachments.filter(f => f !== file) }));

  handleCancel = (e) => {
    this.setState(this.initialState);
    this.props.onClose(e);
  };

  checkNoteValidity = () => {
    const category = this.props.notesCategories && this.props.notesCategories.find(c => c.id === this.state.categoryId);
    return (this.state.content !== '' || (category && ['left-message', 'in-mail'].includes(category.cssClass)));
  }

  handleSubmit = () => {
    if (!this.checkNoteValidity()) {
      return;
    }

    const {
      content,
      categoryId,
      notableType,
      emailTeam,
      emailClient,
      status,
      attachments,
      attachedToId,
      attachedToType
    } = this.state;

    const { projectId } = this.props;

    const note = {
      content,
      categoryId,
      notableType
    };

    const data = {
      note,
      emailTeam,
      emailClient,
      status,
      attachments,
      attachedToId,
      attachedToType,
      projectId
    };

    return this.props.onSubmit(data)
      .then((res) => {
        if (!res.error) {
          clearNoteAutoSave(this.getDraftNoteId(), this.getDraftKey());
          this.props.onClose();
        }
        return res;
      });
  };

  saveDraft() {
    const { emailTeam, emailClient, visibility, content, categoryId, draftLoaded, attachedToId, attachedToType } = this.state;

    if (content) {
      const toStore = { content, categoryId, visibility, emailTeam, emailClient, attachedToId, attachedToType };
      saveNote(toStore, this.getDraftNoteId(), this.getDraftKey());

      if (!draftLoaded) {
        this.setState({ notification: `Your draft was saved locally in your browser at ${moment().format('hh:mm A')}` });
      } else {
        this.setState({ draftLoaded: false });
      }
    }
  }

  render() {
    const notableType = this.state.attachedToType;
    const { notification, categoryId } = this.state;
    const { showNotifyTeam, showNotifyClient, filedInOptions, notesCategories } = this.props;
    const showVisibilityStatus = this.props.showVisibilityStatus && !['person', 'deal', 'dealTarget'].includes(notableType);

    const { templateOptions } = this.props;
    const { attachedToId, attachedToType } = this.state;

    const properties = {
      disabled: !this.checkNoteValidity(),
      onCancel: this.handleCancel,
      onSubmit: this.handleSubmit,
      submitButton: 'Save'
    };

    return (
      <ActiveForm {...properties}>
        <section>
          <TextEditor
            content={this.state.content}
            id="note-ckeditor"
            onChange={this.onChange}
            attachments={this.state.attachments}
            handleAddedFile={this.handleAddedFile}
            handleRemovedFile={this.handleRemovedFile}
            templateOptions={templateOptions}
            onTemplateSelect={this.onTemplateSelect}
          />
          {notification && <p className="draft-note-notice">{notification}</p>}
          <section className="notes-bottom-bar">
            {showVisibilityStatus && (
              <ToggleSwitch
                checked={this.state.status}
                name="status"
                onChange={this.handleStatusUpdate}
                title="Make this visible to all"
              />
            )}
            {filedInOptions && (
              <NoteContextOptions
                value={`${attachedToId}_${attachedToType}`}
                prompt="Type"
                onSelect={this.onChangeFileIn}
                noteContextOptions={filedInOptions}
              />
            )}
            {notesCategories && (
              <SelectOptions
                textTruncate
                name="category_id"
                id="noteTypeDropdown"
                options={notesCategories}
                value={categoryId}
                prompt="Type"
                onSelect={this.handleCategoryClick}
              />
            )}
            {showNotifyTeam && (
              <CheckBox
                label="Email Team"
                checked={this.state.emailTeam}
                name="emailTeam"
                onChange={this.handleCheckboxChecked}
              />
            )}
            {showNotifyClient && (
              <CheckBox
                label="Email Client"
                checked={this.state.emailClient}
                name="emailClient"
                onChange={this.handleCheckboxChecked}
              />
            )}
          </section>
        </section>
      </ActiveForm>
    );
  }
}

NoteView.defaultProps = { showVisibilityStatus: true };

NoteView.propTypes = {
  showVisibilityStatus: PropTypes.bool,
  showNotifyClient: PropTypes.bool,
  showNotifyTeam: PropTypes.bool,
  attachedToId: PropTypes.string,
  attachedToType: PropTypes.string,
  filedInOptions: PropTypes.array,
  notesCategories: PropTypes.array,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  templateOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string
    })
  ),
  noteTemplates: PropTypes.objectOf(PropTypes.shape({
    content: PropTypes.string,
    createdAt: PropTypes.string,
    creator: PropTypes.shape({ id: PropTypes.string, type: PropTypes.string }),
    id: PropTypes.string,
    name: PropTypes.string
  })),
  personId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isBulk: PropTypes.bool
};

export default NoteView;
