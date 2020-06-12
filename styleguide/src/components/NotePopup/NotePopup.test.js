import React from 'react';
import { shallow } from 'enzyme';
import { NotePopup } from '.';

import { requestNoteCategory } from '../../../actions/staticData';
import {
  addNoteToCandidacy,
  requestBulkNoteAdd
} from '../../../actions/candidacies';
import { addNoteToPerson } from '../../../actions/people';
import { createNotes } from '../../../actions/notes';

jest.mock('../../../actions/staticData');
jest.mock('../../../actions/candidacies');
jest.mock('../../../actions/people');
jest.mock('../../../actions/notes');

describe('<NotePopup />', () => {
  let wrapper;
  const initialProps = { dispatch: jest.fn(), entities: [] };
  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<NotePopup {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render a Modal component', () => {
      expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('should render a NoteView component', () => {
      expect(wrapper.find('NoteView')).toHaveLength(1);
    });
  });

  describe('componentDidMount()', () => {
    it('should call requestNoteCategory', () => {
      wrapper.setProps({ showNoteCategories: true });
      wrapper.instance().componentDidMount();
      expect(requestNoteCategory).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleSubmit()', () => {
    describe('when projectId is present in the props', () => {
      it('should call requestBulkNoteAdd from props if there are more than one entity', () => {
        const entities = [{ id: 1, person: { id: 12 } }, { id: 2, person: { id: 22 } }];
        wrapper.setProps({ entities, projectId: 1, dispatch: jest.fn(() => Promise.resolve()) });
        wrapper.instance().handleSubmit();
        expect(requestBulkNoteAdd).toHaveBeenCalledTimes(1);
      });

      it('should not call requestBulkNoteAdd from props if there is only one entity', () => {
        const entities = [{ id: 1, person: { id: 12 } }];
        const formData = { attachedToType: 'person' };
        wrapper.setProps({ entities, projectId: 1, dispatch: jest.fn(() => Promise.resolve()) });
        wrapper.instance().handleSubmit(formData);
        expect(requestBulkNoteAdd).not.toHaveBeenCalled();
      });
    });

    // projectId will not be present for People page
    describe('when projectId is not present in the props', () => {
      it('should dispatch createNotes action', () => {
        const entities = ['1', '2'];
        wrapper.setProps({ entities, dispatch: jest.fn(() => Promise.resolve()) });
        wrapper.instance().handleSubmit();
        expect(createNotes).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('handleSingleNoteAdd()', () => {
    it('should call addNoteToPerson from props if attachedToType is person', () => {
      const formData = { attachedToType: 'person', attachedToId: '1' };
      wrapper.setProps({ dispatch: jest.fn(() => Promise.resolve()) });
      wrapper.instance().handleSingleNoteAdd('1', formData);
      expect(addNoteToPerson).toHaveBeenCalledTimes(1);
    });

    it('should call addNoteToCandidacy from props if attachedToType is candidacy', () => {
      const formData = { attachedToType: 'candidacy', attachedToId: '1' };
      wrapper.setProps({ dispatch: jest.fn(() => Promise.resolve()) });
      wrapper.instance().handleSingleNoteAdd('1', formData);
      expect(addNoteToCandidacy).toHaveBeenCalledTimes(1);
    });
  });
});
