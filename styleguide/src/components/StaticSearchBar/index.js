import React, { Component } from 'react';
import PropTypes from 'prop-types';

import searchIcon from '../../../assets/images/icon-12-search.svg';

import './index.scss';

export default class StaticSearchBar extends Component {
  state = { editMode: false, name: '' };

  submitData = (e) => {
    e.preventDefault();

    if (this.props.handleSubmit) {
      this.setState({ editMode: false });
      this.props.handleSubmit({ name: this.state.name });
    }
  };

  handleInputChange = (e) => {
    this.setState({ name: e.target.value, editMode: true });

    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };

  handleSearchBarValue = () => {
    if (this.state.editMode) {
      return this.state.name;
    } else if (this.props.value) {
      return this.props.value.name;
    }
    return '';
  }

  render() {
    return (
      <form className={`static-search ${this.props.className}`} onSubmit={this.submitData}>
        <input
          className="static-search__input"
          autoComplete="Off"
          type="search"
          name="name"
          value={this.handleSearchBarValue()}
          onChange={this.handleInputChange}
          placeholder={this.props.placeholder || ''}
        />
        <img className="static-search__img" src={searchIcon} alt="search" />
      </form>
    );
  }
}

StaticSearchBar.propsTypes = {
  className: PropTypes.string,
  handleOnchange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};
