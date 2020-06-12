import React from 'react';
import { shallow } from 'enzyme';

import { InlineNoteForm } from './index';

import filedInOptions from '../../../../__test__/fixtures/notes/FiledInOptions';

jest.mock('../../../actions/people');
jest.mock('../../../actions/candidacies');
jest.mock('../../../actions/aggregateNotes');
jest.mock('../../../actions/notes');

describe('<InlineNoteForm />', () => {
  let wrapper = null;

  const props = {
    onUpdate: jest.fn(() => new Promise(resolve => resolve())),
    onReply: jest.fn(() => new Promise(resolve => resolve())),
    onCreate: jest.fn(() => new Promise(resolve => resolve())),
    onFetchNote: jest.fn(() => new Promise(resolve => resolve())),
    onClose: jest.fn(),
    updateNotes: jest.fn(),
    candidacy: { id: '2', person: { id: '1' } },
    projectId: 3,
    categoriesOptions: [],
    templateOptions: [],
    noteTemplates: {},
    projects: {},
    projectTypes: {},
    aggregateNotes: { filedInOptions, filter: { attachedToId: null, attachedToType: null } }
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<InlineNoteForm {...props} />);
  });

  describe('renderer', () => {
    it('should render InlineNoteForm component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render CardView component', () => {
      expect(wrapper.find('CardView')).toHaveLength(1);
    });

    it('should render ActiveForm component', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render TextEditor component', () => {
      expect(wrapper.find('TextEditor')).toHaveLength(1);
    });

    it('should render TooltipConfirm component when attachedToType is candidacy and projectId is present', () => {
      wrapper.setState({ attachedToType: 'candidacy', projectId: 1 });
      expect(wrapper.find('TooltipConfirm')).toHaveLength(1);
    });

    it('should not render TooltipConfirm component when attachedToType is not candidacy', () => {
      wrapper.setState({ attachedToType: 'person' });
      expect(wrapper.find('TooltipConfirm')).toHaveLength(0);
    });

    it('should render ToggleSwitch component', () => {
      expect(wrapper.find('ToggleSwitch')).toHaveLength(1);
    });

    describe('emailTeam and emailClient checkboxes', () => {
      describe('for reply note', () => {
        it('should not render any Checkboxes', () => {
          wrapper.setProps({ isReply: true });
          expect(wrapper.find('CheckBox')).toHaveLength(0);
        });
      });

      describe('for notes which are not reply note', () => {
        beforeEach(() => {
          wrapper.setProps({ isReply: false });
        });

        describe('for candidacy note', () => {
          it('should not render any Checkboxes', () => {
            wrapper.setState({ attachedToType: 'candidacy' });
            expect(wrapper.find('CheckBox')).toHaveLength(2);
          });
        });

        describe('for person note', () => {
          it('should not render any Checkboxes', () => {
            wrapper.setState({ attachedToType: 'person' });
            expect(wrapper.find('CheckBox')).toHaveLength(0);
          });
        });

        describe('for dealTarget note', () => {
          beforeEach(() => {
            wrapper.setState({ attachedToType: 'dealTarget' });
          });

          it('should render emailTeam Checkbox', () => {
            expect(wrapper.find('CheckBox').findWhere(node => node.prop('name') === 'emailTeam')).toHaveLength(1);
          });

          it('should not render emailClient Checkbox', () => {
            expect(wrapper.find('CheckBox').findWhere(node => node.prop('name') === 'emailClient')).toHaveLength(0);
          });
        });
      });

      describe('for clientInvite in projectType', () => {
        it('should show email client when project type not present', () => {
          expect(wrapper.find('CheckBox').findWhere(node => node.prop('name') === 'emailClient')).toHaveLength(1);
        });

        it('should show email client when clientInvite is ON in project type', () => {
          wrapper.setProps({ projects: { 3: { projectTypeId: 1 } }, projectTypes: { 1: { clientInvite: true } } });
          expect(wrapper.find('CheckBox').findWhere(node => node.prop('name') === 'emailClient')).toHaveLength(1);
        });

        it('should not show email client when clientInvite is OFF in project type', () => {
          wrapper.setProps({ projects: { 3: { projectTypeId: 1 } }, projectTypes: { 1: { clientInvite: false } } });
          expect(wrapper.find('CheckBox').findWhere(node => node.prop('name') === 'emailClient')).toHaveLength(0);
        });

        it('should show visibility toggle when project type not present', () => {
          expect(wrapper.find('ToggleSwitch')).toHaveLength(1);
        });

        it('should show visibility toggle when clientInvite is ON in project type', () => {
          wrapper.setProps({ projects: { 3: { projectTypeId: 1 } }, projectTypes: { 1: { clientInvite: true } } });
          expect(wrapper.find('ToggleSwitch')).toHaveLength(1);
        });

        it('should not show visibility toggle when clientInvite is OFF in project type', () => {
          wrapper.setProps({ projects: { 3: { projectTypeId: 1 } }, projectTypes: { 1: { clientInvite: false } } });
          expect(wrapper.find('ToggleSwitch')).toHaveLength(0);
        });
      });

      describe('visibility options when clientInvite is true', () => {
        it('should show visibility toggle if isVisibilityOptionsVisible is false or unset', () => {
          wrapper.setProps({ projects: { 3: { projectTypeId: 1 } }, projectTypes: { 1: { clientInvite: true } } });
          expect(wrapper.find('ToggleSwitch')).toHaveLength(1);
        });

        it('should not show visibility toggle if isVisibilityOptionsVisible is false', () => {
          wrapper.setProps({ isVisibilityOptionsVisible: false, projects: { 3: { projectTypeId: 1 } }, projectTypes: { 1: { clientInvite: true } } });
          expect(wrapper.find('ToggleSwitch')).toHaveLength(0);
        });
      });
    });

    it('should render DragDropWithList component', () => {
      expect(wrapper.find('DragDropWithList')).toHaveLength(1);
    });

    it('should not render note templates SelectOptions component when user is client', () => {
      wrapper.setProps({ currentUser: { role: 'Client' } });
      expect(wrapper.find('SelectOptions')).toHaveLength(0);
    });

    it('should render 1 <FormDropDowns /> component', () => {
      expect(wrapper.find('FormDropDowns')).toHaveLength(1);
    });
  });

  describe('handleContextOptionChange()', () => {
    it('should set attachedToId and attachedToType in the state', () => {
      wrapper.setState({ attachedToId: '786', attachedToType: 'candidacy' });

      wrapper.instance().handleContextOptionChange('1_person');
      wrapper.setState({ attachedToId: '1', attachedToType: 'person' });
    });
  });

  describe('handleSubmit', () => {
    it('should call replyAggregateNote when a reply is to be created', () => {
      const onReply = jest.fn(() => new Promise(resolve => resolve()));
      wrapper.setProps({ onReply, isReply: true, note: { id: 1, type: 'candidacyNotes', candidacyNoteId: 1 } });
      wrapper.instance().handleSubmit();
      expect(onReply).toHaveBeenCalledTimes(1);
    });

    it('should call updateNote when editing a note', () => {
      const onUpdate = jest.fn(() => new Promise(resolve => resolve()));
      wrapper.setProps({ onUpdate, isEdit: true, note: { id: '1_candidacy', type: 'candidacyNotes', candidacyNoteId: 1 } });
      wrapper.instance().handleSubmit();
      expect(onUpdate).toHaveBeenCalledTimes(1);
    });

    it('should call updateNote when a reply is to be edited', () => {
      const onUpdate = jest.fn(() => new Promise(resolve => resolve()));
      wrapper.setProps({ onUpdate, isEdit: true, isReply: true, note: { id: '1_candidacy', type: 'candidacyNotes', candidacyNoteId: 1 } });
      wrapper.instance().handleSubmit();
      expect(onUpdate).toHaveBeenCalledTimes(1);
    });

    it('should call addAggregateNotes when adding new note', () => {
      const onCreate = jest.fn(() => new Promise(resolve => resolve()));
      wrapper.setProps({ onCreate, isEdit: false, isReply: false });
      wrapper.instance().handleSubmit();
      expect(onCreate).toHaveBeenCalledTimes(1);
    });
  });
});
