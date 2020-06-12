import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActiveForm from '../ActiveForm';
import CheckBox from '../CheckBox';
import './index.scss';

class ExportFieldOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFields: this.props.selectedFields || [] };
  }

  onChange = (e) => {
    let { selectedFields } = this.state;
    const { fields, allKeys } = this.props;

    if (e.target.name === 'selectAll') {
      selectedFields = e.target.checked ? allKeys(fields) : [];
    } else {
      selectedFields = e.target.checked ? selectedFields.concat(e.target.name) : selectedFields.filter(f => f !== e.target.name);
    }

    this.setState({ selectedFields });
  }

  handleSubmit = e => this.state.selectedFields.length > 0 && this.props.onSubmit(e, this.state.selectedFields.join(','));

  render() {
    const { fields, allKeys, submitButtonText, className } = this.props;
    const formProps = {
      className: `export-fields ${className}`,
      onCancel: this.props.onCancel,
      onSubmit: this.handleSubmit,
      submitButton: submitButtonText,
      disabled: this.state.selectedFields.length === 0
    };

    return (
      <ActiveForm {...formProps}>
        <section className="export-fields__header">
          <h4 className="export-fields__header__title">Select the fields you want to include in your export</h4>
          <CheckBox
            name="selectAll"
            label="Select All"
            checked={this.state.selectedFields.length === allKeys(fields).length}
            onChange={this.onChange}
          />
        </section>
        <section className="export-fields__content">
          {fields.map(fieldSection => (
            <section key={fieldSection.key} className="export-fields__content__section">
              <h4 className="export-fields__content__section__title">{fieldSection.title}</h4>
              <ul className="export-fields__content__section__list">
                {fieldSection.values.map((field) => {
                  const checked = this.state.selectedFields.indexOf(field.key) !== -1;
                  return (
                    <li key={field.key} className="export-fields__content__section__list__item">
                      <CheckBox
                        name={field.key}
                        label={field.label}
                        checked={checked}
                        onChange={this.onChange}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </section>
      </ActiveForm>
    );
  }
}

ExportFieldOptions.defaultProps = {
  showAverageRating: true,
  submitButtonText: 'Email'
};

ExportFieldOptions.propType = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  })).isRequired,
  selectedFields: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  submitButtonText: PropTypes.string
};

export default ExportFieldOptions;
