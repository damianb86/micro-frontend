import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import moment from 'moment';

import './index.scss';
import CardView from '../CardView';
import TextEditor from '../TextEditor';
import ToggleSwitch from '../ToggleSwitch';
import CheckBox from '../CheckBox';
import TooltipConfirm from '../TooltipConfirm';
import ActiveForm from '../ActiveForm';
import FormDropDowns from './FormDropDowns';
import { getAttachedTo, getNoteProjectId } from './../../../helpers/aggregateNotes';
import { isClient } from '../../../helpers/common';

import { saveNote, getNote, clearNoteAutoSave } from '../../../appLocalStorage';
import DragDropWithList from '../DragDropWithList';
import DeleteConfirmPopup from '../DeleteConfirmPopup';

import { noteTemplatesPropType } from './../../../propTypes/entities';
import { templateOptionsPropType } from './inlineNoteFormPropTypes';

export class InlineNoteForm extends Component {
  constructor(props) {
    super(props);

    const { note, isEdit, currentUser, candidacy, personId, aggregateNotes: { filter } } = this.props;
    const [attachedToId, attachedToType] = getAttachedTo(filter, candidacy, personId, note);
    const clientUser = isClient(currentUser);

    this.state = {
      canceling: false,
      content: isEdit ? note.content : '',
      emailTeam: clientUser,
      emailClient: clientUser,
      visibility: clientUser || (isEdit ? note.visible : false),
      visibilityConfirm: false,
      categoryId: isEdit ? note.categoryId : null,
      attachments: [],
      existingAttachments: isEdit ? note.attachments : [],
      removeAttachmentIds: [],
      notification: null,
      draftLoaded: false,
      disabled: false,
      attachedToId,
      attachedToType
    };
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

  getDraftNoteId = () => {
    const { isReply, isEdit, note } = this.props;

    if (note) {
      if (isEdit) {
        return `edit-${note.id}`;
      } else if (isReply) {
        return `reply-${note.id}`;
      }
    }
    return 'new-note';
  }

  getDraftKey = () => {
    const { attachedToId, attachedToType } = this.state;
    const { projectId, personId, note } = this.props;

    return ({
      attachedToType: (note && note.type) || attachedToType,
      attachedToId: (note && note.id) || attachedToId,
      currentUserId: projectId || personId
    });
  }

  handleAddFile = file => this.setState(({ attachments }) => ({ attachments: [...attachments, file] }));
  handleRemoveFile = ({ target: { id } }) => this.setState(({ attachments }) => ({ attachments: attachments.filter((file, index) => `${index}` !== id) }));
  handleToggleEmailTeam = e => this.setState({ emailTeam: e.target.checked }, this.saveDraft);
  handleToggleEmailClient = e => this.setState({ emailClient: e.target.checked }, this.saveDraft);
  handleToggleVisibilityConfirm = () => this.setState({ visibilityConfirm: false }, this.saveDraft);
  handleTemplateSelect = templateId => this.setState({ content: this.props.noteTemplates[templateId].content }, this.saveDraft);
  handleChangeContent = content => this.setState({ content }, this.saveDraft);
  handleSelectType = categoryId => this.setState({ categoryId }, this.saveDraft);
  handleCancelVisibilityConfirm = () => this.setState({ visibilityConfirm: false });

  handleRemoveExistingFile = ({ target: { id } }) =>
    this.setState(({ removeAttachmentIds, existingAttachments }) =>
      ({ removeAttachmentIds: [...removeAttachmentIds, id], existingAttachments: existingAttachments.filter(file => file.id !== id) })
    );

  handleSetVisibilityOn = () => {
    this.props.onSetVisibilityOn().then(() => {
      this.setState({ visibilityConfirm: false }, this.saveDraft);
    });
  }

  handleToggleSwitchChange = () => {
    const { candidacy: { stoplightStatus } = { stoplightStatus: 'red' } } = this.props;

    this.setState(({ visibility }) => {
      if (visibility) {
        this.saveDraft();
        return { visibility: false };
      }

      if (stoplightStatus === 'green') {
        this.saveDraft();
        return { visibility: true };
      }

      return { visibilityConfirm: true, visibility: true };
    });
  }

  handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const { emailTeam, emailClient, visibility, content, categoryId, attachments, removeAttachmentIds, attachedToId, attachedToType } = this.state;
    const { personId, projectId, onClose, refreshHandler, note, isReply, isEdit, aggregateNotes, onUpdate, onReply, onCreate, onFetchNote } = this.props;
    const parentId = (isReply && !isEdit) ? note.id : null;

    const filedInOptions = aggregateNotes.filedInOptions && aggregateNotes.filedInOptions[personId];
    const noteProjectId = getNoteProjectId(filedInOptions, attachedToId, attachedToType) || projectId;

    const noteParams = {
      emailTeam,
      emailClient,
      attachments,
      removeAttachmentIds,
      stoplightStatus: visibility ? 'green' : 'red',
      note: {
        content,
        category_id: categoryId,
        parent_id: parentId
      }
    };

    this.setState({ disabled: true });

    if (isEdit) {
      const noteId = note.id.split('_')[0];
      const editNoteParams = {
        ...noteParams,
        notableType: note.attachedToType,
        attachedToId,
        attachedToType
      };

      onUpdate(noteId, editNoteParams).then(() => {
        refreshHandler();
        this.setState({ disabled: false });
        clearNoteAutoSave(this.getDraftNoteId(), this.getDraftKey());
        onClose();
      }).catch(() => this.setState({ disabled: false }));
    } else if (isReply) {
      onReply(personId, note, noteParams).then(() => {
        onFetchNote(personId, note);
        this.setState({ disabled: false });
        clearNoteAutoSave(this.getDraftNoteId(), this.getDraftKey());
        onClose();
      }).catch(() => this.setState({ disabled: false }));
    } else {
      onCreate(noteParams, personId, noteProjectId, attachedToId, attachedToType).then(() => {
        refreshHandler();
        this.setState({ disabled: false });
        clearNoteAutoSave(this.getDraftNoteId(), this.getDraftKey());
        onClose();
      }).catch(() => this.setState({ disabled: false }));
    }
  }

  handleContextOptionChange = (id) => {
    const [attachedToId, attachedToType] = id.split('_');
    this.setState({ attachedToId, attachedToType });
  }

  handleCancel = () => {
    if (this.state.content) {
      this.setState({ canceling: true });
    } else {
      clearNoteAutoSave(this.getDraftNoteId(), this.getDraftKey());
      this.props.onClose();
    }
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
    const {
      content,
      visibility,
      visibilityConfirm,
      emailTeam,
      emailClient,
      categoryId,
      attachments,
      notification,
      disabled,
      canceling,
      existingAttachments,
      attachedToId,
      attachedToType
    } = this.state;
    const {
      templateOptions,
      categoriesOptions,
      title,
      isReply,
      isEdit,
      aggregateNotes,
      currentUser,
      personId,
      projectId,
      projectTypes,
      projectObject,
      projects,
      isVisibilityOptionsVisible,
      isCardVisible,
      isContextFilterVisible,
      isPopconfirmVisible,
      abandonMessage
    } = this.props;

    const project = projectObject || (projectId && projects[projectId]) || {};
    const projectType = projectTypes[project.projectTypeId];
    const isClientInvitePresent = !projectType || projectType.clientInvite;
    const filedInOptions = aggregateNotes.filedInOptions && aggregateNotes.filedInOptions[personId];
    const showEmailTeamOption = !isReply && attachedToType !== 'person';
    const showEmailClientOption = !isReply && (attachedToType === 'candidacy' || attachedToType === 'project') && isClientInvitePresent;
    const showVisibilityOption = projectId && (attachedToType === 'candidacy' || attachedToType === 'project') && isVisibilityOptionsVisible && isClientInvitePresent;
    const clientUser = isClient(currentUser);

    return (
      <CardView title={title} className="add-inline-note" isHeaderVisible={isCardVisible}>
        <ActiveForm
          onSubmit={this.handleSubmit}
          submitButton={(isReply && !isEdit) ? 'Reply' : 'Save'}
          onCancel={this.handleCancel}
          disabled={disabled}
          submitButtonClass=""
        >
          <FormDropDowns
            currentUser={currentUser}
            filedInOptions={filedInOptions}
            templateOptions={templateOptions}
            attachedToId={attachedToId}
            attachedToType={attachedToType}
            onTemplateSelect={this.handleTemplateSelect}
            onContextOptionChange={this.handleContextOptionChange}
            onSelectType={this.handleSelectType}
            isReply={isReply}
            categoriesOptions={categoriesOptions}
            categoryId={categoryId}
            isContextVisible={isContextFilterVisible}
          />

          <TextEditor
            content={content}
            onChange={this.handleChangeContent}
          />
          {notification && <p className="editor-draft-notice">{notification}</p>}

          {!clientUser &&
            <div className="add-inline-note__configuration clearfix">
              {showVisibilityOption &&
                <TooltipConfirm
                  confirmationText="Do you want to make this candidate visible?"
                  showTooltip={visibilityConfirm && isPopconfirmVisible}
                  onConfirm={this.handleSetVisibilityOn}
                  onCancel={this.handleCancelVisibilityConfirm}
                >
                  <ToggleSwitch
                    checked={visibility}
                    name="visibility"
                    className="add-inline-note__configuration__visibility"
                    onChange={clientUser ? null : this.handleToggleSwitchChange}
                  />
                </TooltipConfirm>
              }

              <div className="add-inline-note__emails">
                {showEmailTeamOption &&
                  <CheckBox name="emailTeam" label="Email Team" disabled={clientUser} onChange={this.handleToggleEmailTeam} checked={emailTeam} />
                }
                {showEmailClientOption &&
                  <CheckBox name="emailClient" label="Email Client" disabled={clientUser} onChange={this.handleToggleEmailClient} checked={emailClient} />
                }
              </div>
            </div>
          }

          {!isReply &&
            <DragDropWithList
              attachments={attachments}
              onAddFile={this.handleAddFile}
              onRemoveFile={this.handleRemoveFile}
              existingAttachments={existingAttachments}
              onRemoveExistingFile={this.handleRemoveExistingFile}
              className={!(showEmailTeamOption || showEmailClientOption || showVisibilityOption) ? 'add-inline-note__files' : ''}
            />
          }
        </ActiveForm>

        {canceling &&
          <DeleteConfirmPopup
            isOpen
            title="Abandon Confirmation"
            yesLabel="Abandon"
            onYes={() => {
              clearNoteAutoSave(this.getDraftNoteId(), this.getDraftKey());
              this.props.onClose();
            }}
            onNo={() => this.setState({ canceling: false })}
          >
            {abandonMessage}
          </DeleteConfirmPopup>
        }
      </CardView>
    );
  }
}

InlineNoteForm.defaultProps = {
  isVisibilityOptionsVisible: true,
  isContextFilterVisible: true,
  isPopconfirmVisible: true,
  onUpdate: () => null,
  onReply: () => null,
  onCreate: () => null,
  onFetchNote: () => null,
  abandonMessage: <span>You have unsaved data. Are you sure you want to abandon <strong>candidate note</strong>?</span>
};

InlineNoteForm.propTypes = {
  candidacy: PropTypes.shape({
    id: PropTypes.string,
    stoplightStatus: PropTypes.string
  }),
  projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  projects: PropTypes.object, // When we use inlineNoteForm form for PersonNotesList we have multiple projects
  projectObject: PropTypes.object, // When we use inlineNoteForm form for NotesList we are dealing with a single project
  personId: PropTypes.number,
  onClose: PropTypes.func,
  refreshHandler: PropTypes.func,
  title: PropTypes.string,
  isReply: PropTypes.bool,
  currentUser: PropTypes.shape({ role: PropTypes.string }),
  note: PropTypes.object,
  isEdit: PropTypes.bool,
  noteTemplates: noteTemplatesPropType,
  templateOptions: templateOptionsPropType,
  projectTypes: PropTypes.object,
  isVisibilityOptionsVisible: PropTypes.bool,
  isContextFilterVisible: PropTypes.bool,
  isPopconfirmVisible: PropTypes.bool,
  onUpdate: PropTypes.func,
  onReply: PropTypes.func,
  onCreate: PropTypes.func,
  onFetchNote: PropTypes.func,
  abandonMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default InlineNoteForm;
