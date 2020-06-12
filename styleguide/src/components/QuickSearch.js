import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconLink from '../common/IconLink';
import search from '../../assets/images/Search_Slate1_455565.svg';
import searchBlue from '../../assets/images/icon-search_009CF6.svg';

export default class QuickSearch extends Component {
  state = { name: '', searchVisible: false, searchOption: this.props.defaultValue };

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideSearch);
  }

  hideSearch = e => {
    if (!this.state.name && e.target !== this.form && !this.form.contains(e.target)) {
      this.setState({ searchVisible: false });
      document.body.removeEventListener('click', this.hideSearch);
    }
  };

  showSearch = e => {
    this.setState({ searchVisible: true });
    document.body.addEventListener('click', this.hideSearch);
  };

  closeSearch = e => {
    this.setState({ name: '', searchVisible: false });

    if (this.props.onChange) {
      this.props.onChange('');
    }

    if (this.props.reloadOnClose) {
      this.props.handleSubmit({ name: '' });
    }

    document.body.removeEventListener('click', this.hideSearch);
  };

  submitData = e => {
    e.preventDefault();
    let searchOption;

    if (this.props.searchOptions && this.props.searchOptions.length > 0) {
      searchOption = this.state.searchOption || this.props.searchOptions[0].key;
    }
    if (this.props.handleSubmit) {
      this.props.handleSubmit({ name: this.state.name }, searchOption);
    }
  };

  handleInputChange = e => {
    this.setState({ name: e.target.value });

    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };

  render() {
    return (
      <div
        ref={form => {
          this.form = form;
        }}
        className={`site-search ${this.props.className} ${this.state.searchVisible ? 'site-search--quick-expand' : ''}`}
      >
        <form className="site-search-advanced__form" onSubmit={this.submitData}>
          <a onClick={this.showSearch}>
            <img src={this.state.searchVisible ? searchBlue : search} alt="search" />
          </a>
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          <IconLink type="close" size="xs" className="site-search-advanced__form__close" onClick={this.closeSearch} />
        </form>
      </div>
    );
  }
}

QuickSearch.defaultProps = {
  reloadOnClose: false
};

QuickSearch.propsTypes = {
  className: PropTypes.string,
  searchOptions: PropTypes.array,
  onChange: PropTypes.func,
  reloadOnClose: PropTypes.bool
};
