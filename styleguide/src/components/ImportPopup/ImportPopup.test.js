import React from 'react';
import { shallow } from 'enzyme';
import ImportPopup from '.';
import { IMPORT_TYPE_TITLE } from '../../../constants/people';

describe('<ImportPopup />', () => {
  let wrapper;

  const initialProps = {
    importType: "vCard",
    handleImportCancel: jest.fn(),
    handleRemoveFile: jest.fn(),
    handleAddFile: jest.fn(),
    file: null
  };

  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };

    wrapper = shallow(<ImportPopup {...props} />);
  };

  beforeEach(() => {
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render Modal once', () => {
      expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('should render ImportFilesForm once', () => {
      expect(wrapper.find('ImportFilesForm')).toHaveLength(1);
    });

    it('should render Modal once with correct title', () => {
      wrapper.setProps({ importType: 'resume' });
      expect(wrapper.find('Modal').props().title).toEqual(IMPORT_TYPE_TITLE['resume']);
    });
  });
});
