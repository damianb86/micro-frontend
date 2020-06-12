import React from 'react';
import { shallow } from 'enzyme';
import AddCandidatesOptions from './AddCandidatesOptions';

describe('<AddCandidatesOptions />', () => {
  let wrapper;
  const initialProps = {
    projectId: 198,
    handleQuerySelectPeople: jest.fn(),
    handleAddNewPerson: jest.fn(),
    handleParseResume: jest.fn()
  };

  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<AddCandidatesOptions {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render ActiveForm component', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render ActiveForm component with 5 link options', () => {
      expect(wrapper.find('ActiveForm').find('a')).toHaveLength(5);
    });
  });
});
