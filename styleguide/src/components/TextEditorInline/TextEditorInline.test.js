import React from 'react';
import { mount } from 'enzyme';

import TextEditorInlineContainer from './';

describe('TextEditorInlineContainer', () => {
  const props = {
    id: 'TextEditorInlineContainer',
    placeholder: 'Click to add a headline',
    content: '',
    onChange: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn()
  };

  let wrapper = {};

  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = mount(<TextEditorInlineContainer {...props} />);
  });

  describe('renderer', () => {
    it('should render a TextEditorInline', () => {
      expect(wrapper.find('TextEditorInline')).toHaveLength(1);
    });

    it('should render empty message', () => {
      expect(wrapper.find('.text-editor-inline__content').text()).toBe(props.placeholder);
    });

    it('should render the content', () => {
      const content = 'Hello word';
      wrapper.instance().handleChange(content);
      expect(wrapper.find('.text-editor-inline__content').text()).toBe(content);
    });

    it('should render CKEditor', () => {
      wrapper.find('.text-editor-inline').simulate('click');
      expect(wrapper.find('CKEditor')).toHaveLength(1);
    });

    it('should not render render CKEditor on click when editable is false', () => {
      wrapper.setProps({ editable: false });
      wrapper.find('.text-editor-inline').simulate('click');
      expect(wrapper.find('CKEditor')).toHaveLength(0);
    });
  });
});
