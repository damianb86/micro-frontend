import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LabelledInput from '../LabelledInput';
import ActiveForm from '../ActiveForm';

class CreateNewCandidate extends Component {
  state = { name: '', email: '', linkedinUrl: '' };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = () => {
    const { name, email, linkedinUrl } = this.state;
    const data = {
      person_attributes: {
        name,
        email_addresses_attributes: [{ address: email }],
        linkedin_urls_attributes: [{ url: linkedinUrl }]
      }
    };

    if (!name) return;

    return this.props.handleSubmit(data)
      .then((res) => {
        if (!res.error) this.props.onClose();
        return res;
      });
  }

  render() {
    const { name, email, linkedinUrl } = this.state;
    const properties = {
      disabled: !this.state.name,
      onCancel: this.props.onClose,
      onSubmit: this.handleSubmit,
      submitButton: 'Done',
      className: 'create-new-candidates'
    };

    return (
      <ActiveForm {...properties}>
        <LabelledInput
          label="Name"
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={this.onInputChange}
        />
        <LabelledInput
          label="Email Address"
          type="email"
          name="email"
          value={email}
          placeholder="Email Address"
          onChange={this.onInputChange}
        />
        <LabelledInput
          label="LinkedIn URL"
          type="text"
          name="linkedinUrl"
          value={linkedinUrl}
          placeholder="LinkedIn URL"
          onChange={this.onInputChange}
        />
      </ActiveForm>
    );
  }
}

CreateNewCandidate.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func
};

export default CreateNewCandidate;
