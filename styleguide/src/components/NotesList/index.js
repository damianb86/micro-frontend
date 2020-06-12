import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

import StackedListWithThreads from '../StackedListWithThreads';
import ErrorBoundary from '../ErrorBoundary';
import Loading from '../Loading';
import InlineNoteForm from './../InlineNoteForm';

import { isActiveFirmUser } from '../../../helpers/common';
import { MENU_OPTIONS, RESTRICTED_USER_MENU_OPTIONS } from '../../gridview/constants/notes';
import './index.scss';

const NotesList = ({
  noteCategories,
  notesEntities,
  notes,
  projectId,
  project,
  projectTypes,
  currentUser,
  categoriesOptions,
  templateOptions,
  noteTemplates,
  isAddCardVisible,
  isAddFormOpen,
  isContextFilterVisible,
  isPopconfirmVisible,
  loadDataPage,
  onToggleAddNote,
  onFetchNote,
  onUpdate,
  onReply,
  onCreate,
  onMenuSelect,
  refreshHandler,
  onToggleShowReplies,
  abandonMessage
}) => {
  const throttledHandleScroll = throttle((scrollHeight, scrollTop, clientHeight) => {
    const { loading, currentPage, pagesCount } = notes;

    if (!loading && currentPage < pagesCount) {
      if ((scrollHeight - clientHeight) <= (scrollTop + 25)) {
        loadDataPage(currentPage + 1);
      }
    }
  }, 100);
  const handleScroll = ({ target: { scrollHeight, scrollTop, clientHeight } }) =>
    throttledHandleScroll(scrollHeight, scrollTop, clientHeight);

  const { pinnedNoteId, showRepliesList } = notes;
  const activeFirmUser = isActiveFirmUser(currentUser);
  const menuOptions = activeFirmUser ? MENU_OPTIONS : RESTRICTED_USER_MENU_OPTIONS;
  const projectType = projectTypes[project.projectTypeId];

  if (notes.loading && notesEntities.length === 0) {
    return (<div className="notes-list"><Loading /></div>);
  }

  const inlineNoteFormProps = {
    onClose: onToggleAddNote,
    aggregateNotes: notes,
    onFetchNote,
    onUpdate,
    onReply,
    onCreate,
    refreshHandler,
    currentUser,
    projectId,
    projectObject: project,
    categoriesOptions,
    templateOptions,
    noteCategories,
    noteTemplates,
    projectTypes,
    isContextFilterVisible,
    isPopconfirmVisible,
    abandonMessage
  };

  if (isAddFormOpen) {
    return (
      <div className="notes-list">
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
      <div className="notes-list" onScroll={handleScroll}>
        <StackedListWithThreads
          className="notes-list__items"
          items={notesEntities}
          menuOptions={menuOptions}
          pinnedItemId={pinnedNoteId}
          onMenuSelect={onMenuSelect}
          showRepliesList={showRepliesList}
          onToggleShowReplies={onToggleShowReplies}
          projectId={projectId}
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
      </div>
    </ErrorBoundary>
  );
};

NotesList.defaultProps = {
  isAddCardVisible: true,
  isAddFormOpen: false,
  isContextFilterVisible: true,
  isPopconfirmVisible: true,
  onToggleAddNote: () => null,
  refreshHandler: () => null
};

NotesList.propTypes = {
  candidacy: PropTypes.shape({
    id: PropTypes.string,
    stoplightStatus: PropTypes.string
  }),
  projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  notes: PropTypes.shape({
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    total: PropTypes.number,
    loading: PropTypes.bool,
    filter: PropTypes.shape({
      attachedToId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      attachedToType: PropTypes.string
    })
  }),
  onToggleAddNote: PropTypes.func,
  isAddCardVisible: PropTypes.bool,
  isAddFormOpen: PropTypes.bool,
  isContextFilterVisible: PropTypes.bool,
  isPopconfirmVisible: PropTypes.bool,
  currentUser: PropTypes.object,
  abandonMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  refreshHandler: PropTypes.func
};

export default NotesList;
