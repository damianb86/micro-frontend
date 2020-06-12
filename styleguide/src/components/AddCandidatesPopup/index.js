import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../common/Modal';
import AddCandidatesOptions from './AddCandidatesOptions';
import SearchCandidate from './SearchCandidate';
import ImportPopup from '../ImportPopup';

import { PARSE_RESUME } from '../../../constants/people';
import { QUICK_SEARCH_PEOPLE, ADD_NEW_PERSON, ADD_PEOPLE_FROM_RESUME } from '../../../constants/common';

import './index.scss';
import CreateNewCandidate from './CreateNewCandidate';

class AddCandidatesPopup extends Component {
  state = { option: '' };

  onClose = () => {
    switch (this.state.option) {
      case QUICK_SEARCH_PEOPLE:
      case ADD_NEW_PERSON:
      case ADD_PEOPLE_FROM_RESUME:
        this.setState({ option: '' });
        break;
      default:
        this.props.onClose();
    }
  }

  handleAddNewPerson = () => this.setState({ option: ADD_NEW_PERSON });
  handleQuerySelectPeople = () => this.setState({ option: QUICK_SEARCH_PEOPLE });
  handleParseResume = () => this.setState({ option: ADD_PEOPLE_FROM_RESUME });

  renderContent() {
    const { projectId, onClose, onCreateNewCandidate } = this.props;

    switch (this.state.option) {
      case QUICK_SEARCH_PEOPLE:
        return (
          <SearchCandidate projectId={projectId} onClose={this.onClose} />
        );
      case ADD_NEW_PERSON:
        return (
          <CreateNewCandidate onClose={this.onClose} handleSubmit={onCreateNewCandidate} />
        );
      default:
        return (
          <AddCandidatesOptions
            projectId={projectId}
            handleQuerySelectPeople={this.handleQuerySelectPeople}
            handleAddNewPerson={this.handleAddNewPerson}
            handleParseResume={this.handleParseResume}
            onClose={onClose}
          />
        );
    }
  }

  render() {
    const { isOpen, title, style, onImportSubmit } = this.props;

    if (this.state.option === ADD_PEOPLE_FROM_RESUME) {
      return (
        <ImportPopup
          importType={PARSE_RESUME}
          onImportCancel={this.onClose}
          onImportSubmit={onImportSubmit}
        />
      );
    }

    return (
      <Modal onClose={this.onClose} title={title} isOpen={isOpen} style={style} closeIcon>
        {this.renderContent()}
      </Modal>
    );
  }
}

AddCandidatesPopup.propTypes = {
  projectId: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  onCreateNewCandidate: PropTypes.func,
  onImportSubmit: PropTypes.func
};

export default AddCandidatesPopup;
