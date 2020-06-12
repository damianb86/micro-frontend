import React, { Component } from 'react';

import editableView from './EditableView';
import ActiveForm from './ActiveForm';
import CheckBox from './CheckBox';

class DoNotContactView extends Component {
  state = { doNotContact: false };

  handleInputChange = e => this.setState({ doNotContact: e.target.checked });
  handleSubmit = e => this.props.onSubmit(e, { doNotContact: this.state.doNotContact });

  render() {
    return (
      <ActiveForm onSubmit={this.handleSubmit} submitButton="Save" cancelButton="Cancel" onCancel={this.props.onCancel}>
        <CheckBox label="Do Not Contact" type="checkbox" onChange={this.handleInputChange} checked={this.state.doNotContact} />
      </ActiveForm>
    );
  }
}

export default editableView(DoNotContactView);
