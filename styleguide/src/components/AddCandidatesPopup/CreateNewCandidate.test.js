import React from 'react';
import { shallow } from 'enzyme';
import CreateNewCandidate from './CreateNewCandidate';

describe('<CreateNewCandidate />', () => {
  let wrapper;
  const initialProps = { onClose: jest.fn() };
  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<CreateNewCandidate {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render ActiveForm component', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render LabelledInput component', () => {
      expect(wrapper.find('LabelledInput')).toHaveLength(3);
    });
  });

  describe('onInputChange()', () => {
    it('should change the value of respective input value', () => {
      const e = { target: { name: 'email', value: 'welcome@yandex.com' } };
      wrapper.setState({ [e.target.name]: '' });
      wrapper.instance().onInputChange(e);
      expect(wrapper.state()[e.target.name]).toBe(e.target.value);
    });
  });

  describe('handleSubmit()', () => {
    it('should call handleSubmit from props if there is value of name in state', () => {
      const handleSubmit = jest.fn(() => Promise.resolve(true));
      wrapper.setProps({ handleSubmit });
      wrapper.setState({ name: 'csar' });
      wrapper.instance().handleSubmit();
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should not call handleSubmit from props if value of name in state is empty', () => {
      const handleSubmit = jest.fn(() => Promise.resolve(true));
      wrapper.setProps({ handleSubmit });
      wrapper.setState({ name: '' });
      wrapper.instance().handleSubmit();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should call onClose from props if returned value does not contain any error', () => {
      wrapper.setState({ name: 'something' });
      const handleSubmit = jest.fn(() => Promise.resolve({ payload: { data: {} } }));
      wrapper.setProps({ handleSubmit });
      return wrapper.instance().handleSubmit().then(() => expect(initialProps.onClose).toHaveBeenCalledTimes(1));
    });

    it('should not call onClose from props if returned value contains any error', () => {
      const handleSubmit = jest.fn(() => Promise.resolve({ error: true }));
      wrapper.setProps({ handleSubmit });
      wrapper.setState({ name: 'something' });
      wrapper.instance().handleSubmit();
      expect(initialProps.onClose).not.toHaveBeenCalled();
    });
  });
});
