import React from 'react';
import { shallow } from 'enzyme';
import TextEditor from './index';

describe('<TextEditor />', () => {
  const mockOnChange = jest.fn();
  let wrapper;

  describe('Basic TextEditor', () => {
    wrapper = shallow(<TextEditor content="Sample text" onChange={mockOnChange} />);

    it('should render TextEditor component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the basic CKEditor', () => {
      expect(wrapper.find('CKEditor')).toHaveLength(1);
    });
  });

  describe('TextEditor with attachment', () => {
    wrapper = shallow(<TextEditor content="" onChange={mockOnChange} attachments={[]}  handleAddedFile={jest.fn()} />);

    it('should render AttachmentList component', () => {
      expect(wrapper.find('ToggleDropdown(AttachmentList)')).toHaveLength(1);
    });
  });
});
