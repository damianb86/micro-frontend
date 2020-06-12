import React, { Component } from 'react';

import editableView from '../common/EditableView';
import ActiveForm from '../common/ActiveForm';

class PersonNameView extends Component {
  handleInputChange = e => this.setState({ name: e.target.value });

  onEdit = e => {
    this.setState({ name: this.props.record.name || '' });
    this.props.onEdit(e);
  };

  handleSubmit = e => {
    if (this.state.name === '') return;
    return this.props.onSubmit(e, { name: this.state.name });
  };

  renderSubmitButtons = loading => {
    if (loading) {
      return (
        <button type="submit" className="btn btn-primary" disabled>
          ...
        </button>
      );
    }
    return (
      <div className="row clearfix">
        <div className="col-sm-8 text-right">
          <a className="btn btn-decline" onClick={this.props.onCancel}>
            Cancel
          </a>
          <button type="submit" className="btn btn-primary" disabled={this.state.name ? '' : 'disabled'}>
            Save
          </button>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.editMode) {
      return (
        <ActiveForm onSubmit={this.handleSubmit} submitButton={this.renderSubmitButtons} className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="name"
                required
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </ActiveForm>
      );
    }

    const { record } = this.props;

    if (!record) return null;

    return (
      <span className="edit-highlight text-strong" onClick={this.onEdit}>
        {record.name}
      </span>
    );
  }
}

export default editableView(PersonNameView);
