import React from 'react';
import { shallow } from 'enzyme';
import AddCandidatesPopup from '.';

describe('<AddCandidatesPopup />', () => {
  let wrapper;
  const initialProps = { projectId: 1 };
  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<AddCandidatesPopup {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render Modal component', () => {
      expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('should render AddCandidatesOptions component', () => {
      expect(wrapper.find('AddCandidatesOptions')).toHaveLength(1);
    });
  });

  describe('renderContent()', () => {
    it('should return AddCandidatesOptions when value of option in state is neither "qsPeople" nor "newPerson"', () => {
      const res = wrapper.instance().renderContent();
      expect(res.type.name).toEqual('AddCandidatesOptions');
    });

    it('should return CreateNewCandidate when value of option in state is "newPerson"', () => {
      wrapper.setState({ option: 'newPerson' });
      const res = wrapper.instance().renderContent();
      expect(res.type.name).toEqual('CreateNewCandidate');
    });
  });

  describe('handleAddNewPerson()', () => {
    it('should change the value of option to "newPerson" in state', () => {
      wrapper.setState({ option: '' });
      wrapper.instance().handleAddNewPerson();
      expect(wrapper.state().option).toBe('newPerson');
    });
  });

  describe('handleQuerySelectPeople()', () => {
    it('should change the value of option to "qsPeople" in state', () => {
      wrapper.setState({ option: '' });
      wrapper.instance().handleQuerySelectPeople();
      expect(wrapper.state().option).toBe('qsPeople');
    });
  });

  describe('onClose()', () => {
    it('should empty the value of option in state when the value of option is either "qsPeople" or "newPerson"', () => {
      const onClose = jest.fn();
      wrapper.setProps({ onClose });
      wrapper.setState({ option: 'qsPeople' });
      wrapper.instance().onClose();
      expect(wrapper.state().option).toBe('');
    });

    it('should call onClose from props when the value of option is neither "qsPeople" nor "newPerson"', () => {
      const onClose = jest.fn();
      wrapper.setProps({ onClose });
      wrapper.setState({ option: '' });
      wrapper.instance().onClose();
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('CreateNewCandidate handleSubmit()', () => {
    it('should call onCreateNewCandidate from props', () => {
      const onCreateNewCandidate = jest.fn();
      wrapper.setState({ option: 'newPerson' });
      wrapper.setProps({ onCreateNewCandidate });
      wrapper.find('CreateNewCandidate').props().handleSubmit();
      expect(onCreateNewCandidate).toHaveBeenCalledTimes(1);
    });
  });
});
