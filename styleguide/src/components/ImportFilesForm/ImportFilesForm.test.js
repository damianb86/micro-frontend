import React from 'react';
import { mount } from 'enzyme';

import ImportFilesForm from './index';

describe('<ImportFilesForm />', () => {
  let wrapper = null;

  const props = {
    files: [{ id: 1, name: 'CSV file1.csv' }],
    filesLimit: 1,
    description: 'Description text',
    onAddFile: jest.fn(),
    onRemoveFile: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn()
  };

  beforeAll(() => {
    wrapper = mount(<ImportFilesForm {...props} />);
  });

  describe('render', () => {
    it('should render ImportFilesForm component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render ActiveForm component', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render DragDropWithList component', () => {
      expect(wrapper.find('DragDropWithList')).toHaveLength(1);
    });

    it('should render 1 file in the list', () => {
      expect(wrapper.find('DragDropWithList').find('.dnd-list__files__file')).toHaveLength(1);
      expect(wrapper.find('DragDropWithList').find('.dnd-list__files__file').find('.name').text()).toBe('CSV file1.csv');
    });

    it('should render a div.import-files-form__description with the correct text', () => {
      expect(wrapper.find('.import-files-form__description')).toHaveLength(1);
      expect(wrapper.find('.import-files-form__description').text()).toBe('Description text');
    });
  });
});
