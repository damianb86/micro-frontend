import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';

import DeleteConfirmPopup from '../DeleteConfirmPopup';
import StackedListWithThreads from '../StackedListWithThreads';
import ErrorBoundary from '../ErrorBoundary';

import {
  requestAggregateNotes,
  updateAggregateNotes,
  removeAggregateNote,
  updateCandidacyUnreadNotification,
  createPinNote,
  destroyPinNote,
  fetchPinNote,
  fetchCandidacyPinNote,
  updateShowRepliesList,
  requestCandidacyNotes,
  requestNoteContextList,
  fetchNote,
  addAggregateNotes,
  replyAggregateNote
} from '../../../actions/aggregateNotes';
import { updateNote } from '../../../actions/notes';
import { requestNoteCategories } from '../../../actions/noteCategories';
import { updateCandidacyPanelTabViews, updatePersonCandidacies } from '../../../actions/people';

import { reselectAggregateNotes } from './selectors/NotesList';
import FilterRow from './FilterRow';
import InlineNoteForm from './../InlineNoteForm';

import IconAdd from '../../../icons/icon-24-add-filled.svg';
import { MENU_OPTIONS, RESTRICTED_USER_MENU_OPTIONS, TIMESTAMPS } from '../../gridview/constants/notes';
import './index.scss';
import Loading from '../Loading';

import { isActiveFirmUser, isClient } from '../../../helpers/common';
import { noteCategoriesOptionsProject } from '../../../selectors/notes';
import { noteTemplatesOptions } from '../../../selectors';
import { requestNoteTemplates } from '../../../actions/noteTemplates';
import { requestNoteCategory } from '../../../actions/staticData';

export class PersonNotesList extends Component {
  state = { isDeleteModalOpen: false, note: null, isAddNoteFormOpen: false, isAddNoteButtonVisible: true }

  componentDidMount() {
    const { dispatch, categoriesOptions, projectId, personId, candidacy, aggregateNotes: { loading, entityId: loadedEntityId, filter }, currentUser } = this.props;
    const candidacyId = candidacy && candidacy.id;
    const activeFirmUser = isActiveFirmUser(currentUser);
    const entityId = activeFirmUser ? personId : candidacyId;

    if (!categoriesOptions.length) {
      dispatch(requestNoteCategories());
    }

    if (!loading && entityId !== loadedEntityId) {
      this.loadDataPage(1, candidacyId, personId, filter, true);
      this.otherRequests({ personId, projectId, candidacyId });
    }

    if (!isClient(currentUser)) {
      dispatch(requestNoteTemplates());
    }

    dispatch(requestNoteCategory());
  }

  componentDidUpdate() {
    const { personId, projectId, currentUser, candidacy, aggregateNotes: { loading, entityId: loadedEntityId, filter, needRefresh } } = this.props;
    const candidacyId = candidacy && candidacy.id;
    const newEntityId = isActiveFirmUser(currentUser) ? personId : candidacyId;

    if (!loading && (newEntityId !== loadedEntityId || needRefresh)) {
      this.loadDataPage(1, candidacyId, personId, filter, true);
      this.otherRequests({ personId, projectId, candidacyId });

      if (this.state.isAddNoteFormOpen) {
        this.setState({ isAddNoteFormOpen: false }); // eslint-disable-line react/no-did-update-set-state
      }
    }
  }

  componentWillUnmount() {
    const { dispatch, personId, candidacy, currentUser } = this.props;
    const candidacyId = candidacy && candidacy.id;

    if (isActiveFirmUser(currentUser)) {
      dispatch(updateCandidacyPanelTabViews({ entity_id: personId, entity_type: 'person', section: 'notes' }));
    } else if (candidacy) {
      dispatch(updateCandidacyPanelTabViews({ entity_id: candidacyId, entity_type: 'candidacy', section: 'notes' }));
    }
  }


  setAddButtonVisibility = value => this.setState({ isAddNoteButtonVisible: value });
  closeDeleteModal = () => this.setState({ isDeleteModalOpen: false, note: null });

  refreshHandler = () => {
    const { candidacy, personId, aggregateNotes: { filter } } = this.props;
    const candidacyId = candidacy && candidacy.id;

    this.loadDataPage(1, candidacyId, personId, filter);
  }

  handleFilter = (val, name) => {
    const { aggregateNotes, personId, dispatch } = this.props;

    let filter = {};

    if (name === 'author_id') {
      filter = { ...aggregateNotes.filter, [name]: val.map(u => u.id) };
    } else if (name === 'note_context_id') {
      const [attachedToId, attachedToType] = val.split('_');
      filter = { ...aggregateNotes.filter, attachedToType, attachedToId };
    } else {
      filter = { ...aggregateNotes.filter, [name]: val };
    }

    return dispatch(requestAggregateNotes(personId, 1, filter));
  }

  loadDataPage = (page = 1, candidacyId, personId, filter, entityHasChanged = false) => {
    const { dispatch, currentUser, projectId } = this.props;

    if (candidacyId && page === 1) {
      dispatch(updateCandidacyUnreadNotification(candidacyId));
    }

    if (isActiveFirmUser(currentUser)) {
      return dispatch(requestAggregateNotes(personId, page, filter));
    } else if (candidacyId) {
      return dispatch(requestCandidacyNotes(candidacyId, projectId));
    }
  }

  otherRequests({ personId, candidacyId, projectId }) {
    const { dispatch, currentUser, candidacy, filedInOptions } = this.props;
    const activeFirmUser = isActiveFirmUser(currentUser);

    if (activeFirmUser) {
      dispatch(updateCandidacyPanelTabViews({ entity_id: personId, entity_type: 'person', section: 'notes' }));
      dispatch(fetchPinNote(personId));
      if (!filedInOptions) { dispatch(requestNoteContextList(personId)); }
    } else if (candidacy) {
      dispatch(updateCandidacyPanelTabViews({ entity_id: candidacyId, entity_type: 'candidacy', section: 'notes' }));
      dispatch(fetchCandidacyPinNote(projectId, candidacyId));
    }
  }

  handleMenuSelect = (menu, noteId, replyNoteId) => {
    const { dispatch, personId, aggregateNotesEntities } = this.props;
    let note = aggregateNotesEntities.find(noteEntity => noteEntity.id === noteId);

    if (replyNoteId) {
      note = note.thread.find(noteEntity => noteEntity.id === replyNoteId);
    }

    if (note) {
      switch (menu) {
        case 'makeVisible':
        case 'hideVisibility':
          return dispatch(updateAggregateNotes(personId, note, { stoplightStatus: note.visible ? 'red' : 'green' }));
        case 'delete':
          return this.setState({ isDeleteModalOpen: true, note });
        case 'pin':
          return dispatch(createPinNote(personId, { note_type: note.type, note_id: note.id.split('_')[0] }));
        case 'unpin':
          return dispatch(destroyPinNote(personId));
        default:
      }
    }
  };

  handleDelete = () => {
    const { note } = this.state;
    const { dispatch, aggregateNotesEntities, personId } = this.props;

    dispatch(removeAggregateNote(personId, note)).then(() => {
      if (note.parentId) {
        const noteToReFetch = aggregateNotesEntities.find(noteEntity => noteEntity.id === note.parentId);
        dispatch(fetchNote(personId, noteToReFetch));
      }
    });

    this.closeDeleteModal();
  };

  handleToggleAddNote = () => {
    this.setState(({ isAddNoteFormOpen }) => ({ isAddNoteFormOpen: !isAddNoteFormOpen }));
    this.props.onToggleAddNote();
  };

  handleScroll = ({ target: { scrollHeight, scrollTop, clientHeight } }) => this.throttledHandleScroll(scrollHeight, scrollTop, clientHeight);

  throttledHandleScroll = throttle((scrollHeight, scrollTop, clientHeight) => {
    const { personId, candidacy, aggregateNotes: { loading, currentPage, pagesCount, filter } } = this.props;
    const candidacyId = candidacy && candidacy.id;

    if (!loading && currentPage < pagesCount) {
      if ((scrollHeight - clientHeight) <= (scrollTop + 25)) {
        this.loadDataPage(currentPage + 1, candidacyId, personId, filter);
      }
    }
  }, 100);

  toggleShowReplies = noteId => this.props.dispatch(updateShowRepliesList(noteId));

  handleSetVisibilityOn = () => {
    const { dispatch, projectId, candidacy: { id } } = this.props;

    return dispatch(updatePersonCandidacies(projectId, id, { candidacy: { stoplight_status: 'green' } }));
  }

  handleNoteFetch = (personId, note) => this.props.dispatch(fetchNote(personId, note));
  handleNoteUpdate = (noteId, editNoteParams) => this.props.dispatch(updateNote(noteId, editNoteParams));
  handleNoteReply = (personId, note, noteParams) => this.props.dispatch(replyAggregateNote(personId, note, noteParams));
  handleNoteCreate = (noteParams, personId, noteProjectId, attachedToId, attachedToType) =>
    this.props.dispatch(addAggregateNotes(noteParams, personId, noteProjectId, attachedToId, attachedToType));

  render() {
    const {
      users,
      aggregateNotesEntities,
      filedInOptions,
      aggregateNotes,
      candidacy,
      projectId,
      currentUser,
      personId,
      projects,
      projectTypes,
      categoriesOptions,
      templateOptions,
      noteTemplates,
      isFiltersVisible,
      isAddButtonVisible,
      isAddCardVisible,
      isAddFormOpen,
      isContextFilterVisible,
      isPopconfirmVisible
    } = this.props;
    const { isDeleteModalOpen, isAddNoteFormOpen, isAddNoteButtonVisible } = this.state;
    const { pinnedNoteId, showRepliesList } = aggregateNotes;
    const activeFirmUser = isActiveFirmUser(currentUser);
    const menuOptions = activeFirmUser ? MENU_OPTIONS : RESTRICTED_USER_MENU_OPTIONS;
    const project = (projectId && projects[projectId]) || {};
    const projectType = projectTypes[project.projectTypeId];

    if (aggregateNotes.loading && aggregateNotesEntities.length === 0) {
      return (<div className="notes-list"><Loading /></div>);
    }

    const inlineNoteFormProps = {
      onClose: this.handleToggleAddNote,
      refreshHandler: this.refreshHandler,
      onSetVisibilityOn: this.handleSetVisibilityOn,
      onFetchNote: this.handleNoteFetch,
      onUpdate: this.handleNoteUpdate,
      onReply: this.handleNoteReply,
      onCreate: this.handleNoteCreate,
      currentUser,
      candidacy,
      projectId,
      personId,
      categoriesOptions,
      templateOptions,
      noteTemplates,
      aggregateNotes,
      projectTypes,
      projects,
      isContextFilterVisible,
      isPopconfirmVisible
    };

    if (isAddNoteFormOpen || isAddFormOpen) {
      return (
        <div className="person-notes-list">
          <InlineNoteForm
            {...inlineNoteFormProps}
            isCardVisible={isAddCardVisible}
            title="Add Note"
          />
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <div className="person-notes-list" onScroll={this.handleScroll}>
          {activeFirmUser && isFiltersVisible &&
            <FilterRow
              className="person-notes-list__filter-row"
              users={users}
              noteTypes={categoriesOptions}
              noteContexts={filedInOptions}
              timestamps={TIMESTAMPS}
              filter={aggregateNotes.filter}
              onFilter={this.handleFilter}
            />
          }
          <StackedListWithThreads
            className="person-notes-list__items"
            items={aggregateNotesEntities}
            menuOptions={menuOptions}
            pinnedItemId={pinnedNoteId}
            onMenuSelect={this.handleMenuSelect}
            showRepliesList={showRepliesList}
            onToggleShowReplies={this.toggleShowReplies}
            candidacy={candidacy}
            projectId={projectId}
            personId={personId}
            setAddButtonVisibility={this.setAddButtonVisibility}
            currentUser={currentUser}
            projectType={projectType}
            editForm={
              ({ item, onFormClose }) => (
                <InlineNoteForm
                  {...inlineNoteFormProps}
                  onClose={onFormClose}
                  note={item}
                  title="Edit Note"
                  isEdit
                />
              )
            }
            replyForm={
              ({ item, onFormClose, isEdit }) => (
                <InlineNoteForm
                  {...inlineNoteFormProps}
                  isVisibilityOptionsVisible={false}
                  onClose={onFormClose}
                  note={item}
                  isEdit={isEdit}
                  isReply
                />
              )
            }
          />
          {isDeleteModalOpen &&
            <DeleteConfirmPopup
              onYes={this.handleDelete}
              onNo={this.closeDeleteModal}
              title="Delete Note"
            >
              <span>Are you sure you want to delete this note?</span>
            </DeleteConfirmPopup>
          }
          {isAddNoteButtonVisible && isAddButtonVisible &&
            <a role="button" tabIndex={-1} className="person-notes-list__add" onClick={this.handleToggleAddNote}>
              <IconAdd />
            </a>
          }
        </div>
      </ErrorBoundary>
    );
  }
}

PersonNotesList.defaultProps = {
  isFiltersVisible: true,
  isAddButtonVisible: true,
  isAddCardVisible: true,
  isAddFormOpen: false,
  isContextFilterVisible: true,
  isPopconfirmVisible: true,
  onToggleAddNote: () => null
};

PersonNotesList.propTypes = {
  candidacy: PropTypes.shape({
    id: PropTypes.string,
    stoplightStatus: PropTypes.string
  }),
  projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  personId: PropTypes.number,
  aggregateNotes: PropTypes.shape({
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    total: PropTypes.number,
    loading: PropTypes.bool,
    filter: PropTypes.shape({
      attachedToId: PropTypes.string,
      attachedToType: PropTypes.string
    })
  }),
  filedInOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      attributes: PropTypes.shape({
        contextGroup: PropTypes.string,
        contextId: PropTypes.number,
        contextType: PropTypes.string,
        metaId: PropTypes.number,
        name: PropTypes.string,
        personId: PropTypes.number
      })
    })
  ),
  onToggleAddNote: PropTypes.func,
  isFiltersVisible: PropTypes.bool,
  isAddCardVisible: PropTypes.bool,
  isAddButtonVisible: PropTypes.bool,
  isAddFormOpen: PropTypes.bool,
  isContextFilterVisible: PropTypes.bool,
  isPopconfirmVisible: PropTypes.bool
};

const mapStateToProps = (state, { personId }) => ({
  currentUser: state.currentUser,
  aggregateNotes: state.aggregateNotes,
  aggregateNotesEntities: reselectAggregateNotes(state.aggregateNotes.ids, state.entities, state.aggregateNotes.pinnedNoteId),
  users: state.entities.users,
  filedInOptions: state.aggregateNotes.filedInOptions[personId],
  projects: state.entities.projects,
  projectTypes: state.entities.projectTypes,
  categoriesOptions: noteCategoriesOptionsProject(state),
  templateOptions: noteTemplatesOptions(state),
  noteTemplates: state.entities.noteTemplates
});

export default connect(mapStateToProps)(PersonNotesList);
