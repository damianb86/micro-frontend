import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../../common/Modal';
import NewTask from './NewTask';
import { candidacyBulkTaskCreate } from '../../../actions/candidacies';
import { requestAddTask } from '../../../actions/tasks';

import './index.scss';

export const TaskPopup = ({
  title,
  style,
  isOpen,
  onClose,
  entities,
  children,
  dispatch,
  personId,
  projectId
}) => {
  const getSelectedPeopleName = () => (entities.length > 0 ? entities.map(el => el.person.name).join(', ') : '');

  const handleTaskSubmit = (formData) => {
    const data = { ...formData };

    if (projectId) {
      data.candidacy_ids = entities.length > 1 ? entities.map(el => el.id).join(',') : entities[0].id;
      return dispatch(candidacyBulkTaskCreate(projectId, data));
    } else if (personId) {
      data.person_id = personId;
      return dispatch(requestAddTask(data));
    }
  };

  const content = children || (
    <NewTask
      handleTaskSubmit={handleTaskSubmit}
      selectedPeopleName={getSelectedPeopleName()}
      projectId={projectId}
      onClose={onClose}
    />
  );

  return (
    <Modal
      onClose={onClose}
      title={title}
      isOpen={isOpen}
      style={style}
      closeIcon
    >
      {content}
    </Modal>
  );
};

TaskPopup.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  projectId: PropTypes.number,
  personId: PropTypes.number,
  entities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    person: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      name: PropTypes.string
    })
  })).isRequired,
  onClose: PropTypes.func,
  style: PropTypes.object
};

export default connect()(TaskPopup);
