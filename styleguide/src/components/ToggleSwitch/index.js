/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

export default class ToggleSwitch extends Component {
  onChange = (event) => {
    this.props.onChange(this.props.name, event.target.checked);
  };

  render() {
    const disabled = !this.props.onChange || this.props.disabled;
    const className = classNames('switch-wrapper', this.props.className, { disabled });

    return (
      <div className={className} title={this.props.title}>
        <label className="switch">
          <input
            type="checkbox"
            onChange={this.props.onChange ? this.onChange : () => null}
            checked={this.props.checked}
            tabIndex={this.props.tabIndex}
            disabled={disabled}
          />
          <div className="slider" />
          {this.props.children ? <span className="switch-label">{this.props.children}</span> : null}
        </label>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tabIndex: PropTypes.string,
  disabled: PropTypes.bool
};
