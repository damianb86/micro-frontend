import React, { Component } from 'react';
import PropTypes from 'prop-types';

import editableView from './EditableView';
import ActiveForm from './ActiveForm';
import { InformationListItemValue } from '../common/InformationListItem';

class SkypeView extends Component {
  state = { skypeName: '' };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onEdit = e => {
    const company = this.props.record;

    if (company) {
      this.setState({ skypeName: company.skypeName || '' });
    } else {
      this.setState({ skypeName: '' });
    }
    this.props.onEdit(e);
  };

  handleSubmit = e => {
    this.props.onSubmit(e, { skypeName: this.state.skypeName });
  };

  render() {
    const { record } = this.props;

    if (this.props.editMode) {
      let properties = {
        onSubmit: this.handleSubmit,
        submitButton: 'Save Changes',
        onCancel: this.props.onCancel,
        className: 'form-horizontal form-horizontal-label-left horizontal-list__item'
      };

      properties.activeFormButtonSpace = this.props.showLabel ? 'col-sm-offset-2 col-sm-10' : 'col-sm-12';

      return (
        <ActiveForm {...properties}>
          <div className="form-group">
            {this.props.showLabel ? (
              <label htmlFor="skype" className="col-sm-2 control-label">
                Skype
              </label>
            ) : null}
            <div className={this.props.showLabel ? 'col-sm-10' : 'col-sm-12'}>
              <input
                id="skype"
                className="form-control edit-mode"
                placeholder="Skype"
                type="text"
                value={this.state.skypeName}
                name="skypeName"
                onChange={this.onChange}
              />
            </div>
          </div>
        </ActiveForm>
      );
    }

    if (this.props.editable && !record.skypeName) {
      return (
        <section className="horizontal-list__item horizontal-list__item--link">
          <span className="sky-text pointer-cursor text-italic" onClick={this.onEdit}>
            <small>Click to Add</small>
          </span>
        </section>
      );
    }

    return (
      <InformationListItemValue onEdit={this.props.editable ? this.onEdit : null}>
        <span className="horizontal-list__item__value__item">{record.skypeName}</span>
      </InformationListItemValue>
    );
  }
}

SkypeView.defaultProps = {
  showLabel: true,
  editable: true
};

SkypeView.propsTypes = {
  record: PropTypes.object,
  onSubmit: PropTypes.func,
  editable: PropTypes.bool,
  showLabel: PropTypes.bool
};

export default editableView(SkypeView);
