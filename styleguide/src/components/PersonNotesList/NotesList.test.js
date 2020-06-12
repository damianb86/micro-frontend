import React from 'react';
import { shallow } from 'enzyme';

import { PersonNotesList } from './index';
import { reselectAggregateNotes } from './selectors/NotesList';
import {
  requestAggregateNotes,
  updateCandidacyUnreadNotification,
  createPinNote,
  destroyPinNote,
  removeAggregateNote,
  requestCandidacyNotes
} from '../../../actions/aggregateNotes';
import { requestNoteCategories } from '../../../actions/noteCategories';

import { aggregateNotes, entities, noteCategories, users } from './../../../../__test__/fixtures/common/NotesList';

jest.mock('../../../actions/aggregateNotes');
jest.mock('../../../actions/noteCategories');
jest.mock('../../../actions/people');
jest.mock('../../../actions/notes');

describe('<PersonNotesList />', () => {
  let wrapper = null;
  const dispatch = jest.fn(() => new Promise(resolve => resolve()));
  const props = {
    dispatch,
    candidacy: { id: '2', stoplightStatus: 'green' },
    aggregateNotes: { ...aggregateNotes, loading: false, pinnedNoteId: '420203_personNotes', filter: {}, entityId: null, needRefresh: false },
    aggregateNotesEntities: reselectAggregateNotes(aggregateNotes.ids, { ...entities, users, noteCategories }),
    categoriesOptions: [],
    candidacyId: '11',
    currentUser: { role: 'Partner' },
    projectTypes: {},
    projects: {},
    projectId: 23,
    personId: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<PersonNotesList {...props} />);
  });

  describe('renderer', () => {
    it('should render PersonNotesList component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render FilterRow component', () => {
      expect(wrapper.find('FilterRow')).toHaveLength(1);
    });

    it('should render StackedListWithThreads component', () => {
      expect(wrapper.find('StackedListWithThreads')).toHaveLength(1);
    });

    it('should render 6 StackedListItem', () => {
      expect(wrapper.find('StackedListWithThreads').dive().find('StackedListItem')).toHaveLength(6);
    });

    describe('<DeleteConfirmPopup /> component', () => {
      it('should NOT be rendered when isDeleteModalOpen is false', () => {
        wrapper.setState({ isDeleteModalOpen: false });
        expect(wrapper.find('DeleteConfirmPopup')).toHaveLength(0);
      });

      it('should be rendered when isDeleteModalOpen is true', () => {
        wrapper.setState({ isDeleteModalOpen: true });
        expect(wrapper.find('DeleteConfirmPopup')).toHaveLength(1);
      });
    });
  });

  describe('componentDidMount fn', () => {
    it('should request NoteCategories if not present', () => {
      wrapper.setProps({ categoriesOptions: [] });
      jest.resetAllMocks();

      wrapper.instance().componentDidMount();
      expect(requestNoteCategories).toHaveBeenCalledTimes(1);
    });

    it('should not request NoteCategories if present', () => {
      wrapper.setProps({ categoriesOptions: [{ id: '1', value: 'Email' }] });
      jest.resetAllMocks();

      wrapper.instance().componentDidMount();
      expect(requestNoteCategories).not.toHaveBeenCalled();
    });

    describe('for active firm users', () => {
      beforeEach(() => {
        wrapper.setProps({ currentUser: { role: 'Admin' } });
      });

      describe('when isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ aggregateNotes: { ...props.aggregateNotes, loading: true } });
        });

        it('should not request person related data', () => {
          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.instance().componentDidMount();
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });
      });

      describe('when isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ aggregateNotes: { ...props.aggregateNotes, loading: false } });
        });

        it('should not request person related data if already present', () => {
          wrapper.setProps({ personId: 100, aggregateNotes: { ...props.aggregateNotes, entityId: 100 } });

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.instance().componentDidMount();
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });

        it('should request person related data if not present', () => {
          wrapper.setProps({ personId: 200, aggregateNotes: { ...props.aggregateNotes, entityId: 100 } });

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.instance().componentDidMount();
          expect(loadDataPageSpy).toHaveBeenCalledTimes(1);
          expect(otherRequestsSpy).toHaveBeenCalledTimes(1);
        });

        it('should request person related data even if person data is present but needRefresh flag is true', () => {
          wrapper.setProps({ personId: 200, aggregateNotes: { ...props.aggregateNotes, entityId: 200, needRefresh: true } });

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.instance().componentDidUpdate();
          expect(loadDataPageSpy).toHaveBeenCalledTimes(1);
          expect(otherRequestsSpy).toHaveBeenCalledTimes(1);
        });


        it('should not request person related data if person data is present and needRefresh flag is false', () => {
          wrapper.setProps({ personId: 100, aggregateNotes: { ...props.aggregateNotes, entityId: 100, needRefresh: false } });

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.instance().componentDidUpdate();
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('for non-active firm users', () => {
      beforeEach(() => {
        wrapper.setProps({ currentUser: { role: 'Client' } });
      });

      describe('when isLoading is true', () => {
        beforeEach(() => {
          wrapper.setProps({ aggregateNotes: { ...props.aggregateNotes, loading: true } });
        });

        it('should not request candidate related data', () => {
          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.instance().componentDidMount();
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });
      });

      describe('when isLoading is false', () => {
        beforeEach(() => {
          wrapper.setProps({ aggregateNotes: { ...props.aggregateNotes, loading: false } });
        });

        it('should not request candidate related data if already present', () => {
          wrapper.setProps({ candidacy: { id: '100' }, aggregateNotes: { ...props.aggregateNotes, entityId: '100' } });

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.instance().componentDidMount();
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });

        it('should request candidate related data if not present ', () => {
          wrapper.setProps({ candidacy: { id: '200' }, aggregateNotes: { ...props.aggregateNotes, entityId: '100' } });

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.instance().componentDidMount();
          expect(loadDataPageSpy).toHaveBeenCalledTimes(1);
          expect(otherRequestsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('componentWillReceiveProps fn', () => {
    let newProps = props;

    describe('for active firm users', () => {
      beforeEach(() => {
        newProps = { ...newProps, currentUser: { role: 'Admin' } };
      });

      describe('when isLoading is true', () => {
        it('should not request person related data', () => {
          newProps = { ...newProps, aggregateNotes: { ...aggregateNotes, loading: true } };

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.setProps(newProps);
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });
      });

      describe('when isLoading is false', () => {
        beforeEach(() => {
          newProps = { ...newProps, aggregateNotes: { ...aggregateNotes, loading: false } };
        });

        it('should not request person related data if person has not change', () => {
          newProps = { ...newProps, aggregateNotes: { ...aggregateNotes, entityId: props.personId } };
          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.setProps(newProps);
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });

        it('should request person related data if person has change', () => {
          newProps = { ...newProps, aggregateNotes: { ...aggregateNotes, entityId: props.personId + 100 } };

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.setProps(newProps);
          expect(loadDataPageSpy).toHaveBeenCalledTimes(1);
          expect(otherRequestsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('for non-active firm users', () => {
      beforeEach(() => {
        newProps = { ...newProps, currentUser: { role: 'Client' } };
      });

      describe('when isLoading is true', () => {
        it('should not request candidate related data', () => {
          newProps = { ...newProps, aggregateNotes: { ...aggregateNotes, loading: true } };

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.setProps(newProps);
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });
      });

      describe('when isLoading is false', () => {
        beforeEach(() => {
          newProps = { ...newProps, aggregateNotes: { ...aggregateNotes, loading: false } };
        });

        it('should not request candidate related data if candidate has not changed', () => {
          newProps = { ...newProps, aggregateNotes: { ...aggregateNotes, entityId: props.candidacy.id } };
          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.setProps(newProps);
          expect(loadDataPageSpy).not.toHaveBeenCalled();
          expect(otherRequestsSpy).not.toHaveBeenCalled();
        });

        it('should request candidate related data if candidate has changed', () => {
          newProps = { ...newProps, aggregateNotes: { ...aggregateNotes, entityId: props.candidacy.id + 100 } };

          const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
          const otherRequestsSpy = jest.spyOn(wrapper.instance(), 'otherRequests');

          wrapper.setProps(newProps);
          expect(loadDataPageSpy).toHaveBeenCalledTimes(1);
          expect(otherRequestsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('loadDataPage fn', () => {
    const pageNumber = 2;
    const candidacyId = 1;
    const personId = 100;

    describe('for active firm users', () => {
      beforeEach(() => {
        wrapper.setProps({ currentUser: { role: 'Admin' } });
        jest.resetAllMocks();
      });

      it('should call the requestAggregateNotes with acceptable params when entity has changed', () => {
        const defaultFilter = { author_id: [], category_id: null, note_created_at: null, attachedToType: null, attachedToId: null };
        wrapper.instance().loadDataPage(pageNumber, 1, props.personId, defaultFilter, true);
        const params = requestAggregateNotes.mock.calls[requestAggregateNotes.mock.calls.length - 1];

        expect(requestAggregateNotes).toHaveBeenCalledTimes(1);
        expect(params).toEqual([props.personId, pageNumber, defaultFilter]);
        expect(requestCandidacyNotes).not.toHaveBeenCalled();
      });

      it('should call update unread candidacy notification data only if candidacy is present and pageNumber is 1', () => {
        wrapper.instance().loadDataPage(1, candidacyId, personId, false);
        expect(updateCandidacyUnreadNotification).toHaveBeenCalledTimes(1);
      });
    });

    describe('for non-active firm users', () => {
      beforeEach(() => {
        wrapper.setProps({ currentUser: { role: 'Client' } });
        jest.resetAllMocks();
      });

      it('should call the requestCandidacyNotes', () => {
        wrapper.instance().loadDataPage(pageNumber, candidacyId, personId, {});
        expect(requestCandidacyNotes).toHaveBeenCalledTimes(1);
        expect(requestAggregateNotes).not.toHaveBeenCalled();
      });

      it('should call update unread candidacy notification data only if candidacy is present and page number is 1', () => {
        wrapper.instance().loadDataPage(1, candidacyId, personId, {});
        expect(updateCandidacyUnreadNotification).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('onFilter fn', () => {
    describe('when filter by users', () => {
      it('should dispatch requestAggregateNotes action', () => {
        expect(requestAggregateNotes).toHaveBeenCalled();
      });
    });

    describe('when filter by note types', () => {
      it('should dispatch requestAggregateNotes action', () => {
        expect(requestAggregateNotes).toHaveBeenCalled();
      });
    });

    describe('when filter by timeframe', () => {
      it('should dispatch requestAggregateNotes action', () => {
        expect(requestAggregateNotes).toHaveBeenCalled();
      });
    });

    describe('when filter by note context', () => {
      it('should dispatch requestAggregateNotes action', () => {
        expect(requestAggregateNotes).toHaveBeenCalled();
      });
    });
  });

  describe('closeDeleteModal fn', () => {
    it('should update state', () => {
      wrapper.setState({ isDeleteModalOpen: true, note: {} });
      wrapper.instance().closeDeleteModal();
      expect(wrapper.state().isDeleteModalOpen).toBeFalsy();
      expect(wrapper.state().note).toBeNull();
    });
  });

  describe('handleDelete fn', () => {
    it('should call removeAggregateNote fn and update state', () => {
      wrapper.setState({ isDeleteModalOpen: true, note: {} });
      wrapper.setProps({ dispatch: jest.fn(() => Promise.resolve()) });
      wrapper.instance().handleDelete();
      expect(removeAggregateNote).toHaveBeenCalledTimes(1);

      expect(wrapper.state().isDeleteModalOpen).toBeFalsy();
      expect(wrapper.state().note).toBeNull();
    });
  });

  describe('setAddButtonVisibility', () => {
    it('should toggel isAddNoteButtonVisible in state', () => {
      wrapper.setState({ isAddNoteButtonVisible: true });
      wrapper.instance().setAddButtonVisibility(false);
      expect(wrapper.state().isAddNoteButtonVisible).toBeFalsy();
    });
  });

  describe('handleMnuSelect fn', () => {
    it('should set state when menu is `delete`', () => {
      wrapper.setState({ isDeleteModalOpen: false, note: null });

      wrapper.instance().handleMenuSelect('delete', '420203_personNotes');
      expect(wrapper.state().isDeleteModalOpen).toBeTruthy();
    });

    it('should dispatch requestCreatePinNote action', () => {
      wrapper.instance().handleMenuSelect('pin', '420203_personNotes');
      expect(createPinNote).toHaveBeenCalledTimes(1);
    });

    it('should dispatch requestCreatePinNote action', () => {
      wrapper.instance().handleMenuSelect('unpin', '420203_personNotes');
      expect(destroyPinNote).toHaveBeenCalledTimes(1);
    });
  });

  describe('close InlineNoteForm on person change', () => {
    it('should be NOT show <InlineNoteForm /> component', () => {
      wrapper.setState({ isAddNoteFormOpen: false });
      expect(wrapper.find('Connect(InlineNoteForm)')).toHaveLength(0);
    });

    it('should stay the same value when personId is the same', () => {
      const newProps = { ...props, personId: props.personId, candidacy: { id: '2' }, aggregateNotes: { loading: false, entityId: 1, filter: {} } };

      wrapper.setProps({ aggregateNotes: newProps.aggregateNotes });
      wrapper.setState({ isAddNoteFormOpen: true });
      wrapper.setProps(newProps);
      expect(wrapper.state().isAddNoteFormOpen).toBeTruthy();
    });

    it('should be rebooted to grid when personId is the different', () => {
      const newProps = { ...props, personId: 100, candidacy: { id: '2' }, aggregateNotes: { loading: false, entityId: 200, filter: {} } };
      wrapper.setState({ isAddNoteFormOpen: true });
      wrapper.setProps(newProps);
      expect(wrapper.state().isAddNoteFormOpen).toBeFalsy();
    });
  });

  describe('refreshHandler fn', () => {
    it('should call loadDataPage fn with expected arguments', () => {
      const loadDataPageSpy = jest.spyOn(wrapper.instance(), 'loadDataPage');
      wrapper.instance().refreshHandler();

      expect(loadDataPageSpy).toHaveBeenCalledWith(1, props.candidacy.id, props.personId, props.aggregateNotes.filter);
    });
  });
});
