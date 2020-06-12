import { filterMenuOptions, filterMenuOptionsForClient, noteVisibilityContext } from './stackedListWithThreads';
import { MENU_OPTIONS } from './../components/gridview/constants/notes';

describe('interaction/function', () => {
  describe('filterMenuOptions fn', () => {
    it('should show pin and reply option in the menu and hide unpin option when pinnedNoteId is not equal to noteId', () => {
      const result = filterMenuOptions(MENU_OPTIONS, 1, { id: 2 });
      expect(!!result.find(option => option.id === 'pin')).toBeTruthy();
      expect(!!result.find(option => option.id === 'unpin')).toBeFalsy();
      expect(!!result.find(option => option.id === 'reply')).toBeTruthy();
    });

    it('should show unpin and reply option and hide pin option in the menu when pinnedNoteId is equal to noteId', () => {
      const result = filterMenuOptions(MENU_OPTIONS, 1, { id: 1 });
      expect(!!result.find(option => option.id === 'pin')).toBeFalsy();
      expect(!!result.find(option => option.id === 'unpin')).toBeTruthy();
      expect(!!result.find(option => option.id === 'reply')).toBeTruthy();
    });

    it('should not show unpin option, pin option, visibility options when note is a reply note', () => {
      const result = filterMenuOptions(MENU_OPTIONS, 1, { id: 1 }, true);
      expect(!!result.find(option => option.id === 'pin')).toBeFalsy();
      expect(!!result.find(option => option.id === 'unpin')).toBeFalsy();
      expect(!!result.find(option => option.id === 'reply')).toBeFalsy();
      expect(!!result.find(option => option.id === 'hideVisibility')).toBeFalsy();
      expect(!!result.find(option => option.id === 'makeVisible')).toBeFalsy();
    });

    it('should show make/hide visibility buttons when note belongs to the specific project', () => {
      const result = filterMenuOptions(MENU_OPTIONS, 1, { id: 1, projectId: 5 }, null, 5, 5);
      expect(!!result.find(option => option.id === 'hideVisibility')).toBeTruthy();
      expect(!!result.find(option => option.id === 'makeVisible')).toBeTruthy();
    });

    it('should show make/hide visibility buttons when note belongs to a candidate from the specific project', () => {
      const result = filterMenuOptions(MENU_OPTIONS, 1, { id: 1, notable: { projectId: 5 } }, null, 5);
      expect(!!result.find(option => option.id === 'hideVisibility')).toBeTruthy();
      expect(!!result.find(option => option.id === 'makeVisible')).toBeTruthy();
    });

    it('should not show make/hide visibility buttons when note does not belong to the specific project', () => {
      const result = filterMenuOptions(MENU_OPTIONS, 1, 1, null, 5)
      expect(!!result.find(option => option.id === 'hideVisibility')).toBeFalsy();
      expect(!!result.find(option => option.id === 'makeVisible')).toBeFalsy();
    });

    it('should not show make/hide visibility buttons when client invite in project type is false', () => {
      const result = filterMenuOptions(MENU_OPTIONS, 1, {}, null, 5, { clientInvite: false });
      expect(!!result.find(option => option.id === 'hideVisibility')).toBeFalsy();
      expect(!!result.find(option => option.id === 'makeVisible')).toBeFalsy();
    });

    it('should not show make/hide visibility buttons when project type is not passed', () => {
      const result = filterMenuOptions(MENU_OPTIONS, 1, { projectId: 1 }, null, 1);
      expect(!!result.find(option => option.id === 'hideVisibility')).toBeTruthy();
      expect(!!result.find(option => option.id === 'makeVisible')).toBeTruthy();
    });
  });

  describe('filterMenuOptionsForClient fn', () => {
    it('should show edit reply and delete option in the menu dropdown for notes written by client', () => {
      const result = filterMenuOptionsForClient(MENU_OPTIONS, false, 1, 1);
      expect(result.length).toBe(3);
      expect(!!result.find(option => option.id === 'edit')).toBeTruthy();
      expect(!!result.find(option => option.id === 'reply')).toBeTruthy();
      expect(!!result.find(option => option.id === 'delete')).toBeTruthy();
    });

    it('should show only reply option in the menu dropdown for notes not written by client', () => {
      const result = filterMenuOptionsForClient(MENU_OPTIONS, false, 1, 2);
      expect(result.length).toBe(1);
      expect(!!result.find(option => option.id === 'edit')).toBeFalsy();
      expect(!!result.find(option => option.id === 'reply')).toBeTruthy();
      expect(!!result.find(option => option.id === 'delete')).toBeFalsy();
    });

    it('should show No option in the menu dropdown for reply notes not written by client ', () => {
      const result = filterMenuOptionsForClient(MENU_OPTIONS, true, 1, 2);
      expect(result.length).toBe(0);
      expect(!!result.find(option => option.id === 'edit')).toBeFalsy();
      expect(!!result.find(option => option.id === 'reply')).toBeFalsy();
      expect(!!result.find(option => option.id === 'delete')).toBeFalsy();
    });

    it('should show only edit and delete in the menu dropdown for reply notes written by client ', () => {
      const result = filterMenuOptionsForClient(MENU_OPTIONS, true, 1, 1);
      expect(result.length).toBe(2);
      expect(!!result.find(option => option.id === 'edit')).toBeTruthy();
      expect(!!result.find(option => option.id === 'reply')).toBeFalsy();
      expect(!!result.find(option => option.id === 'delete')).toBeTruthy();
    });
  });

  describe('noteVisibilityContext fn', () => {
    it('should return true if note is visible and belongs to project', () => {
      const result = noteVisibilityContext({ projectId: 5, visible: true }, 5);
      expect(result).toBe(true);
    });

    it('should return false if note is not visible', () => {
      const result = noteVisibilityContext({ projectId: 5, visible: false }, 5);
      expect(result).toBe(false);
    });

    it('should return undefined if note is visible but does not belong to project and is not notable', () => {
      const result = noteVisibilityContext({ projectId: 5, visible: true }, 6);
      expect(result).toBe(undefined);
    });

    it('should return true if note and is notable and belongs to project as notable', () => {
      const result = noteVisibilityContext({ projectId: 5, visible: true, notable: { projectId: 5 } }, 5);
      expect(result).toBe(true);
    });

    it('should return false if note and is notable but belongs to other project as notable', () => {
      const result = noteVisibilityContext({ projectId: 5, visible: true, notable: { projectId: 5 } }, 6);
      expect(result).toBe(false);
    });
  });
});
