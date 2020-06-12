import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../common/Modal';
import NoteView from './NoteView';

import { requestNoteCategory } from '../../../actions/staticData';
import { requestNoteTemplates } from '../../../actions/noteTemplates';
import { noteCategoriesOptionsProject } from '../../../selectors/notes';
import { noteTemplatesOptions } from '../../../selectors';
import { getAttachedTo } from './../../../helpers/aggregateNotes';

import './index.scss';
import { requestBulkNoteAdd, addNoteToCandidacy } from '../../../actions/candidacies';
import { addNoteToPerson } from '../../../actions/people';
import { addNoteToDealTarget } from '../../../actions/deals';
import { aggregateNotesNeedsRefresh } from '../../../actions/aggregateNotes';
import { fetchNoteContextList } from '../../../api/aggregateNotes';
import { createNotes } from '../../../actions/notes';

export class NotePopup extends Component {
  state = { filedInOptions: null };

  componentDidMount() {
    if (this.props.showNoteCategories) {
      this.props.dispatch(requestNoteCategory());
    }

    if (this.props.renderNoteTemplate) {
      this.props.dispatch(requestNoteTemplates());
    }

    if (this.props.showFiledInOptions) {
      this.getFiledInOptions();
    }
  }

  getFiledInOptions = () => {
    const { entities, projectId } = this.props;
    if (entities.length !== 1) return null;

    const personId = projectId ? entities[0].person.id : entities[0];
    return fetchNoteContextList(personId).then((response) => {
      this.setState({ filedInOptions: response.data });
    });
  };

  handleSubmit = (formData) => {
    const { dispatch, projectId, entities } = this.props;

    // projectId will not be present for People page
    if (projectId) {
      if (entities.length > 1) {
        const data = { ids: entities.map(el => el.id).join(','), ...formData, projectId };
        return dispatch(requestBulkNoteAdd(projectId, data));
      }

      const id = entities[0] && [entities[0].id];
      return this.handleSingleNoteAdd(id, formData);
    }

    const idsParams = entities.length > 1 ? { peopleIds: entities.join(',') } : { personId: entities[0] };
    return dispatch(createNotes({ ...formData, ...idsParams })).then(() => dispatch(aggregateNotesNeedsRefresh()));
  }

  handleSingleNoteAdd = (candidacyId, formData) => {
    const { dispatch, projectId } = this.props;

    if (formData.attachedToType === 'person') {
      return dispatch(addNoteToPerson(formData.attachedToId, formData)).then(() => dispatch(aggregateNotesNeedsRefresh()));
    } else if (formData.attachedToType === 'dealTarget' || formData.attachedToType === 'deal_target') {
      return dispatch(addNoteToDealTarget(formData.attachedToId, formData)).then(() => dispatch(aggregateNotesNeedsRefresh()));
    } else if (formData.attachedToType === 'candidacy') {
      return dispatch(addNoteToCandidacy(formData.projectId, formData.attachedToId, formData)).then(() => dispatch(aggregateNotesNeedsRefresh()));
    }
    return dispatch(addNoteToCandidacy(projectId, candidacyId, formData)).then(() => dispatch(aggregateNotesNeedsRefresh()));
  }

  render() {
    const {
      onClose,
      showVisibilityStatus,
      showNoteCategories,
      notesCategories,
      showNotifyClient,
      showNotifyTeam,
      attachedToId,
      attachedToType,
      attachedToName,
      templateOptions,
      noteTemplates,
      projectId,
      entities
    } = this.props;

    const candidacyRecord = projectId && entities[0];
    const personId = (projectId && entities[0].person.id) || entities[0];
    const [modifiedAttachedToId, modifiedAttachedToType] = getAttachedTo(null, candidacyRecord, personId, null);

    return (
      <Modal
        closeTimeoutMS={20}
        onClose={this.props.onClose}
        title={this.props.title || 'Add Note'}
        isOpen={this.props.isOpen}
        style={this.props.style}
        closeIcon
      >
        <NoteView
          onSubmit={this.handleSubmit}
          onClose={onClose}
          showVisibilityStatus={showVisibilityStatus}
          notesCategories={showNoteCategories ? notesCategories : null}
          showNotifyClient={showNotifyClient}
          showNotifyTeam={showNotifyTeam}
          filedInOptions={this.state.filedInOptions}
          attachedToId={attachedToId || modifiedAttachedToId}
          attachedToType={attachedToType || modifiedAttachedToType}
          attachedToName={attachedToName}
          templateOptions={templateOptions}
          noteTemplates={noteTemplates}
          personId={personId}
          projectId={projectId}
          isBulk={entities.length > 1}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  notesCategories: noteCategoriesOptionsProject(state),
  templateOptions: noteTemplatesOptions(state),
  noteTemplates: state.entities.noteTemplates
});

export default connect(mapStateToProps)(NotePopup);

NotePopup.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  style: PropTypes.object,
  showNoteCategories: PropTypes.bool,
  showVisibilityStatus: PropTypes.bool,
  showFiledInOptions: PropTypes.bool,
  showNotifyClient: PropTypes.bool,
  showNotifyTeam: PropTypes.bool,
  attachedToId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  attachedToType: PropTypes.string,
  attachedToName: PropTypes.string,
  onClose: PropTypes.func
};
