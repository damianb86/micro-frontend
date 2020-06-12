import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class CheckBox extends React.Component {
  render() {
    const checkbox = (
      <span className="checkbox-wrapper">
        <input
          type="checkbox"
          onChange={this.props.onChange}
          readOnly={!this.props.onChange}
          checked={this.props.checked}
          value={this.props.value}
          name={this.props.name}
          tabIndex={this.props.tabIndex}
          disabled={this.props.disabled ? 'disabled' : false}
          className={this.props.indeterminate && !this.props.checked ? 'indeterminate' : ''}
        />
        <span className="checkbox-wrapper__input" />
      </span>
    );

    if (this.props.label) {
      return (
        <label className="checkbox-label control-label">
          {checkbox}
          <span className="checkbox-label__text">{this.props.label}</span>
        </label>
      );
    }
    return checkbox;
  }
}

export default CheckBox;

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  tabIndex: PropTypes.string,
  disabled: PropTypes.bool
};
