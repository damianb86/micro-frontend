import React from 'react';
import { mount } from 'enzyme';
import AttachmentList from './AttachmentList';

describe('<AttachmentList />', () => {
  const mockFn = jest.fn();
  const removedFileMockfn = jest.fn();
  const wrapper = mount(<AttachmentList attachments={[]} openFileSystem={mockFn} removedfile={removedFileMockfn} />);

  it('should render AttachmentList component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should call the showDnd function when attachments not present', () => {
    wrapper.find('.text-editor__attachment__link').simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('should show attachment list when attachments present', () => {
    wrapper.setProps({ attachments: [{ name: 'abc.png' }, { name: 'bcd.png' }] });
    wrapper.find('.text-editor__attachment__link').simulate('click');

    expect(wrapper.find('.text-editor__attachment__dropdown')).toHaveLength(1);
    expect(wrapper.find('ul').children()).toHaveLength(2);
  });

  it('should call showDnd when add attachement button clicked', () => {
    wrapper.find('.text-editor__attachment__dropdown__add').simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });

  it('should call removedFile function on close icon clicked', () => {
    wrapper.setProps({ attachments: [{ name: 'abc.png' }, { name: 'bcd.png' }] });
    wrapper.find('.text-editor__attachment__link').simulate('click');
    wrapper.find('.text-editor__attachment__dropdown__list__item__close').at(0).simulate('click');
    expect(removedFileMockfn).toHaveBeenCalled();
  });
});
