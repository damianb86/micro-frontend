import React, { Component } from 'react';
import Select from 'react-select';
import editableView from './EditableView';
import ActiveForm from './ActiveForm';
import { InformationListItemValue } from './InformationListItem';

class TimeZoneView extends Component {
  state = { editMode: false, timezone: null };

  handleTimezoneSelectChange = val => this.setState({ timeZone: val });

  onEdit = e => {
    const user = this.props.record;

    if (user) {
      this.setState({ timeZone: { label: user.timeZone } });
    }
    this.props.onEdit(e);
  };

  handleSubmit = e => {
    return this.props.onSubmit(e, { timeZone: this.state.timeZone.value });
  };

  render() {
    if (this.props.editMode) {
      let properties = {
        errors: this.props.errors,
        onSubmit: this.handleSubmit,
        submitButton: 'Save Changes',
        onCancel: this.props.onCancel,
        className: 'form-horizontal form-horizontal-label-left horizontal-list__item'
      };

      properties.activeFormButtonSpace = this.props.showLabel ? 'col-sm-offset-2 col-sm-10' : 'col-sm-12';
      const timeZones = this.props.timeZones.map(tz => ({
        value: tz.name,
        label: `${tz.formatted_offset} ${tz.name}`
      }));

      return (
        <ActiveForm {...properties}>
          <div className="form-group">
            {this.props.showLabel ? <label className="col-sm-2 control-label">Time Zone</label> : null}
            <div className="col-sm-10">
              <Select
                value={this.state.timeZone}
                className="width-100 edit-mode"
                options={timeZones}
                onChange={this.handleTimezoneSelectChange}
                clearable={false}
              />
            </div>
          </div>
        </ActiveForm>
      );
    }

    const { record } = this.props;

    if (!record.timeZone) {
      return (
        <section className="horizontal-list__item horizontal-list__item--link">
          <span className="sky-text pointer-cursor text-italic" onClick={this.onEdit}>
            <small>Click to Add</small>
          </span>
        </section>
      );
    }

    return (
      <InformationListItemValue onEdit={this.onEdit}>
        <span className="horizontal-list__item__value__item">{record.timeZone}</span>
      </InformationListItemValue>
    );
  }
}

TimeZoneView.defaultProps = {
  showLabel: true,
  timeZones: []
};

export default editableView(TimeZoneView);
