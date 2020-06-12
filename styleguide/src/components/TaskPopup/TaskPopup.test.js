import React from 'react';
import { shallow } from 'enzyme';

import { TaskPopup } from './';
import { candidacyBulkTaskCreate } from '../../../actions/candidacies';
import { requestAddTask } from '../../../actions/tasks';

jest.mock('../../../actions/candidacies');
jest.mock('../../../actions/tasks');

describe('<TaskPopup/>', () => {
  let wrapper;

  const props = {
    entities: [{ id: '1', person: { id: 786, name: 'Ram' } }],
    dispatch: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<TaskPopup {...props} />);
    jest.resetAllMocks();
  });

  describe('renderer', () => {
    it('should render a <Modal />', () => {
      expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('should render NewTask when children is not present', () => {
      expect(wrapper.find('Connect(NewTask)')).toHaveLength(1);
    });
  });

  describe('function/interaction', () => {
    describe('getSelectedPeopleName fn', () => {
      it('when entities has record - it should return there names joined with commas', () => {
        const entities = [
          { person: { id: 1, name: 'Ram' } },
          { person: { id: 2, name: 'Rahim' } }
        ];

        wrapper.setProps({ entities });
        expect(wrapper.find('Connect(NewTask)').prop('selectedPeopleName')).toEqual('Ram, Rahim');
      });

      it('when entities has no record - it should return empty string', () => {
        wrapper.setProps({ entities: [] });
        expect(wrapper.find('Connect(NewTask)').prop('selectedPeopleName')).toBe('');
      });
    });

    describe('handleTaskSubmit fn', () => {
      let formData = {
        task: { categoryId: '44', dueDate: '6/4/2019', dueTime: '09:24 PM', assigneeId: '373', name: '' },
        dueDateOptions: 'Date & Time'
      };

      describe('when projectId is present - i.e., when task is being added to candidate', () => {
        const projectId = 100;

        beforeEach(() => {
          wrapper.setProps({ projectId });
        });

        it('should call dispatch candidacyBulkTaskCreate action', () => {
          wrapper.find('Connect(NewTask)').prop('handleTaskSubmit')(formData);
          expect(candidacyBulkTaskCreate).toHaveBeenCalledTimes(1);
        });

        it('should be called with correct params', () => {
          formData = { ...formData, projectId };
          wrapper.find('Connect(NewTask)').prop('handleTaskSubmit')(formData);
          const expectedFormData = { ...formData, projectId, candidacy_ids: props.entities[0].id };
          expect(candidacyBulkTaskCreate).toHaveBeenCalledWith(projectId, expectedFormData);
        });
      });

      describe('when projectId is not present and personId is present- i.e., when task is being added to person', () => {
        const personId = 786;

        beforeEach(() => {
          wrapper.setProps({ personId });
        });

        it('should call dispatch requestAddTask action', () => {
          wrapper.find('Connect(NewTask)').prop('handleTaskSubmit')(formData);
          expect(requestAddTask).toHaveBeenCalledTimes(1);
        });

        it('should call requestAddTask action with correct params', () => {
          wrapper.find('Connect(NewTask)').prop('handleTaskSubmit')(formData);
          const expectedFormData = { ...formData, person_id: personId };
          expect(requestAddTask).toHaveBeenCalledWith(expectedFormData);
        });
      });

      describe('when both projectId and personId is not present', () => {
        it('should not dispatch any action', () => {
          wrapper.find('Connect(NewTask)').prop('handleTaskSubmit')(formData);
          expect(props.dispatch).not.toHaveBeenCalled();
        });
      });
    });
  });
});
