import React from 'react';
import PropTypes from 'prop-types';

import ActiveForm from '../ActiveForm';

import IconSearch from '../../../icons/icon-24-search.svg';
import IconPeople from '../../../icons/icon-24-people.svg';
import IconProject from '../../../icons/icon-24-projects.svg';
import IconAdd from '../../../icons/icon-24-add-filled.svg';
import IconImport from '../../../icons/icon-12-export.svg';

const AddCandidatesOptions = ({ projectId, onClose, handleQuerySelectPeople, handleAddNewPerson, handleParseResume }) => {
  const properties = {
    onCancel: onClose,
    onSubmit: onClose,
    submitButton: 'Done',
    className: 'add-candidates-options'
  };

  return (
    <ActiveForm {...properties}>
      <a role="presentation" onClick={handleQuerySelectPeople} className="add-candidates-options__item">
        <IconSearch width={24} height={24} className="add-candidates-options__item__icon grey-icon" />
        <span className="add-candidates-options__item__text">Quick Search People</span>
      </a>
      <a href="/firm/people" className="add-candidates-options__item">
        <IconPeople width={24} height={24} className="add-candidates-options__item__icon grey-icon" />
        <span className="add-candidates-options__item__text">Add from People</span>
      </a>
      <a href={`/firm/projects/${projectId}/strategy`} className="add-candidates-options__item">
        <IconProject width={24} height={24} className="add-candidates-options__item__icon grey-icon" />
        <span className="add-candidates-options__item__text">Add from Strategy</span>
      </a>
      <a role="presentation" onClick={handleAddNewPerson} className="add-candidates-options__item">
        <IconAdd width={24} height={24} className="add-candidates-options__item__icon grey-icon" />
        <span className="add-candidates-options__item__text">Create New Person</span>
      </a>
      <a role="presentation" onClick={handleParseResume} className="add-candidates-options__item">
        <IconImport width={13} height={13} className="add-candidates-options__item__rotated-icon grey-icon" />
        <span className="add-candidates-options__item__text">Parse Resume</span>
      </a>
    </ActiveForm>
  );
};

AddCandidatesOptions.propTypes = {
  projectId: PropTypes.number.isRequired,
  handleQuerySelectPeople: PropTypes.func.isRequired,
  handleAddNewPerson: PropTypes.func.isRequired,
  handleParseResume: PropTypes.func.isRequired
};

export default AddCandidatesOptions;
