/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    document.body.addEventListener('click', event => {
      if (this.refs && this.refs.CustomDropDown !== undefined) {
        if (this.refs.CustomDropDown.contains(event.target)) {
          return;
        }
        this.setState({ open: false });
      }
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', () => {
      this.setState({ open: false });
    });
  }

  render() {
    return (
      <div
        ref="CustomDropDown"
        className={`dropdown btn-group btn-group-primary custom-dropdown ${this.state.open ? 'open' : ''}`}
      >
        <button
          id="bg-nested-dropdown"
          role="button"
          type="button"
          className={`${this.props.buttonClass || ''} btn btn-primary` || 'btn btn-primary'}
          onClick={() => {
            this.setState({ open: !this.state.open });
          }}
        >
          {this.props.title} <span className="caret" />
        </button>
        <ul role="menu" className={`dropdown-menu ${this.props.ulClass || ''}`}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

export default CustomDropDown;

CustomDropDown.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node,
  buttonClass: PropTypes.string,
  ulClass: PropTypes.string
};
