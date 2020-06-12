import React from 'react';
import { mount } from 'enzyme';

import AttachmentList from './index';

describe('<AttachmentList />', () => {
  const props = {
    attachments: [{ id: '1', fileFileName: 'report1.pdf' }, { id: '2', fileFileName: 'report2.pdf' }],
    handleAttachmentRemove: jest.fn(),
    editableAccess: true
  };

  const wrapper = mount(<AttachmentList {...props} />);

  describe('renderer', () => {
    it('should render 1 ul', () => {
      expect(wrapper.find('ul')).toHaveLength(1);
    });

    it('should render 1 list item', () => {
      expect(wrapper.find('li')).toHaveLength(2);
    });

    it('should call handleAttachmentRemove when DELETE is clicked', () => {
      wrapper.find('li').at(0).find('a').simulate('click');
      expect(props.handleAttachmentRemove).toHaveBeenCalledTimes(1);
    });
  });
});
