import React from 'react';
import { shallow } from 'enzyme';
import NoteView from './NoteView';
import noteTemplates from '../../../../__test__/fixtures/notes/NoteTemplates';

describe('<NoteView />', () => {
  let wrapper;
  const onTemplateSelectMock = jest.fn();

  const initialProps = { onTemplateSelect: onTemplateSelectMock };

  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<NoteView {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render an ActiveForm component', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render a TextEditor component', () => {
      expect(wrapper.find('TextEditor')).toHaveLength(1);
    });

    it('should render a ToggleSwitch component when showVisibilityStatus props is true', () => {
      wrapper.setProps({ showVisibilityStatus: true });
      expect(wrapper.find('ToggleSwitch')).toHaveLength(1);
    });

    it('should render a NoteContextOptions component when filedInOptions props has value', () => {
      wrapper.setProps({ filedInOptions: [] });
      expect(wrapper.find('NoteContextOptions')).toHaveLength(1);
    });

    it('should render a <SelectOptions /> component when notesCategories props has value', () => {
      wrapper.setProps({ notesCategories: [] });
      expect(wrapper.find('SelectOptions')).toHaveLength(1);
    });

    it('should render a checkbox when showNotifyTeam props is true', () => {
      wrapper.setProps({ showNotifyTeam: true });
      expect(wrapper.find('CheckBox')).toHaveLength(1);
    });

    it('should render a checkbox when showNotifyClient props is true', () => {
      wrapper.setProps({ showNotifyClient: true });
      expect(wrapper.find('CheckBox')).toHaveLength(1);
    });
  });

  describe('onChangeFileIn()', () => {
    it('should change the value of attachedToType, attachedToId and projectId in state', () => {
      const obj = { attachedToType: 'superhero', attachedToId: '990' };
      wrapper.setState({ attachedToType: '', attachedToId: '', projectId: '' });
      wrapper.instance().onChangeFileIn(`${obj.attachedToId}_${obj.attachedToType}`);
      expect(wrapper.state().attachedToType).toBe(obj.attachedToType);
      expect(wrapper.state().attachedToId).toBe(obj.attachedToId);
    });
  });

  describe('onChange()', () => {
    it('should change the value of content in state', () => {
      const content = 'unit testing an unit';
      wrapper.setState({ content: '' });
      wrapper.instance().onChange(content);
      expect(wrapper.state().content).toBe(content);
    });
  });

  describe('handleCategoryClick()', () => {
    it('should change the value of categoryId in state', () => {
      const categoryId = 4;
      wrapper.setState({ categoryId: '' });
      wrapper.instance().handleCategoryClick(categoryId);
      expect(wrapper.state().categoryId).toBe(categoryId);
    });
  });

  describe('handleCheckboxChecked()', () => {
    it('should add the value of `target.name` in state', () => {
      const e = { target: { name: 'oneChkbox', checked: true } };
      wrapper.instance().handleCheckboxChecked(e);
      expect(wrapper.state()[e.target.name]).toBe(e.target.checked);
    });
  });

  describe('handleStatusUpdate()', () => {
    it('should toggle the value of status in state', () => {
      wrapper.setState({ status: false });
      wrapper.instance().handleStatusUpdate();
      expect(wrapper.state().status).toBe(true);
    });
  });

  describe('handleCancel()', () => {
    it('should call onClose from props', () => {
      const onClose = jest.fn();
      wrapper.setProps({ onClose });
      wrapper.instance().handleCancel({});
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkNoteValidity()', () => {
    it('should return true if there is content', () => {
      wrapper.setState({ content: 'anything' });
      const res = wrapper.instance().checkNoteValidity();
      expect(res).toBe(true);
    });

    it('should return true if there category is either left-message or in-mail', () => {
      const notesCategories = [{ id: 3, name: 'One', cssClass: 'not-onaep' }, { id: 4, name: 'Two', cssClass: 'in-mail' }];
      wrapper.setProps({ notesCategories });
      wrapper.setState({ categoryId: 4 });
      const res = wrapper.instance().checkNoteValidity();
      expect(res).toBe(true);
    });

    it('should return false if there is no content or category is neither left-message or in-mail', () => {
      const notesCategories = [{ id: 3, name: 'One', cssClass: 'not-onaep' }, { id: 4, name: 'Two', cssClass: 'in-mail' }];
      wrapper.setProps({ notesCategories });
      wrapper.setState({ content: '', categoryId: 3 });
      const res = wrapper.instance().checkNoteValidity();
      expect(res).toBe(false);
    });
  });

  describe('handleSubmit()', () => {
    it('should return if note is invalid', () => {
      const notesCategories = [{ id: 3, name: 'One', cssClass: 'not-onaep' }, { id: 4, name: 'Two', cssClass: 'in-mail' }];
      wrapper.setProps({ notesCategories });
      wrapper.setState({ content: '', categoryId: 3 });
      const res = wrapper.instance().handleSubmit({});
      expect(res).toBeFalsy();
    });

    it('should call onSubmit from props if note is valid', () => {
      const onSubmit = jest.fn(() => Promise.resolve({}));
      const onClose = jest.fn();
      wrapper.setState({ content: 'Hey you! Hi! Have a nice day checking this test' });
      wrapper.setProps({ onSubmit, onClose });
      wrapper.instance().handleSubmit({});
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onTemplateSelect', () => {
    it('should set note content based on selected note template', () => {
      const templates = noteTemplates.reduce((map, obj) => (map[obj.id] = obj, map), {});
      wrapper.setProps({ noteTemplates: templates });
      wrapper.instance().onTemplateSelect(noteTemplates[0].id);
      expect(wrapper.state().content).toEqual(noteTemplates[0].content);
    });
  });
});
