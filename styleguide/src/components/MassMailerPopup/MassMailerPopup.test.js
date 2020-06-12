import React from 'react';
import { shallow } from 'enzyme';
import { MassMailerPopup } from '.';

describe('<MassMailerPopup />', () => {
  let wrapper;
  const initialProps = {
    dispatch: jest.fn(() => Promise.resolve()),
    templateOptions: [{ id: 1, value: 'Sample text' }],
    noteTemplates: { 1: { id: 1, content: 'Sample describe' } }
  };
  const wrapperSetup = (newProps = {}) => {
    const props = { ...initialProps, ...newProps };
    wrapper = shallow(<MassMailerPopup {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render a <Modal /> component', () => {
      expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('should render <ActiveForm /> component', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render a top text', () => {
      expect(wrapper.find('.mass-mailer-top-text')).toHaveLength(1);
    });

    it('should render two <LabelledInput /> component', () => {
      expect(wrapper.find('LabelledInput')).toHaveLength(2);
    });

    it('should render <SelectOptions /> component', () => {
      expect(wrapper.find('SelectOptions')).toHaveLength(1);
    });
  });

  describe('.mass-mailer-top-text', () => {
    describe('when no prop is passed', () => {
      it('should contain the right text', () => {
        expect(wrapper.find('.mass-mailer-top-text').children().at(0).text()).toBe('This message will be sent to none.');
      });
    });

    describe('when prop is passed', () => {
      it('should match the text passed in prop', () => {
        const text = '4 candidates';
        wrapper.setProps({ receiver: text });
        expect(wrapper.find('.mass-mailer-top-text').text()).toContain(text);
      });
    });
  });

  describe('first <LabelledIput />', () => {
    it('should contain a `type` prop with value "text"', () => {
      expect(wrapper.find('LabelledInput').at(0).props().type).toBe('text');
    });

    it('should contain a `name` prop with value "subject"', () => {
      expect(wrapper.find('LabelledInput').at(0).props().name).toBe('subject');
    });

    it('should contain a `label` prop with value "Subject Line"', () => {
      expect(wrapper.find('LabelledInput').at(0).props().label).toBe('Subject Line');
    });

    it('should match it\'s `value` prop with the value of `subject` in state', () => {
      wrapper.setState({ subject: 'hola' });
      expect(wrapper.find('LabelledInput').at(0).props().value).toBe('hola');
    });
  });

  describe('second <LabelledInput />', () => {
    it('should contain `type` prop with value "custom"', () => {
      expect(wrapper.find('LabelledInput').at(1).props().type).toBe('custom');
    });

    it('should contain a <TextEditor /> component', () => {
      expect(wrapper.find('LabelledInput').at(1).find('TextEditor')).toHaveLength(1);
    });
  });

  describe('<TextEditor />', () => {
    it('should contain `value` prop with value of `content` in state', () => {
      const content = 'Hola Mogambo';
      wrapper.setState({ content });
      expect(wrapper.find('TextEditor').props().content).toBe(content);
    });
  });

  describe('onSubjectChange()', () => {
    it('should change the value of `subject` in state', () => {
      wrapper.setState({ subject: 'busy' });
      const e = { target: { value: 'available' } };
      wrapper.instance().onSubjectChange(e);
      expect(wrapper.state().subject).toBe(e.target.value);
    });
  });

  describe('onTextEditorChange()', () => {
    it('should change the value of `subject` in state', () => {
      wrapper.setState({ content: 'busy' });
      const content = 'available';
      wrapper.instance().onTextEditorChange(content);
      expect(wrapper.state().content).toBe(content);
    });
  });

  describe('handleSubmit()', () => {
    it('should call handleSubmit from props', () => {
      const handleSubmit = jest.fn(() => Promise.resolve({}));
      const onClose = jest.fn();
      wrapper.setProps({ handleSubmit, onClose });
      wrapper.instance().handleSubmit({});
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('', () => {
    it('should set the content of the template', () => {
      const selectedTemplateId = 1;
      wrapper.instance().onTemplateSelect(selectedTemplateId);
      expect(wrapper.state().content).toEqual(initialProps.noteTemplates[selectedTemplateId].content)
    });
  });
});
