export const filterMenuOptions = (menuOptions, pinnedNoteId, note, isReply, projectId = null, projectType = {}) => {
  const clientNotInvite = projectType.hasOwnProperty('clientInvite') && !projectType.clientInvite;
  if (
    !projectId ||
    clientNotInvite ||
    (projectId !== note.projectId &&
      (!note.notable || note.notable.projectId !== projectId) &&
      note.attachedToType !== 'project'
    )
  ) {
    menuOptions = menuOptions.filter(option => !(option.id === 'hideVisibility' || option.id === 'makeVisible'));
  }

  if (isReply) {
    return menuOptions.filter(option => !(option.id === 'unpin' ||
                                          option.id === 'pin' ||
                                          option.id === 'reply' ||
                                          option.id === 'hideVisibility' ||
                                          option.id === 'makeVisible'));
  }

  if (note.id === pinnedNoteId) {
    return menuOptions.filter(option => option.id !== 'pin');
  }

  return menuOptions.filter(option => option.id !== 'unpin');
};

export const filterMenuOptionsForClient = (menuOptions, isReply, clientId, authorId) => {
  let filteredMenuOption = menuOptions;

  if (parseInt(authorId, 10) === parseInt(clientId, 10)) {
    filteredMenuOption = filteredMenuOption.filter(option => (option.id === 'reply' || option.id === 'edit' || option.id === 'delete'));
  } else {
    filteredMenuOption = filteredMenuOption.filter(option => (option.id === 'reply'));
  }

  if (isReply) {
    filteredMenuOption = filteredMenuOption.filter(option => !(option.id === 'reply'));
  }

  return filteredMenuOption;
};

export const noteVisibilityContext = (note, projectId) =>
  projectId && note.visible && (note.type === 'projectNotes' || note.projectId === projectId || (note.notable && note.notable.projectId === projectId));
