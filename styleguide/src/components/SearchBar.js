import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  // Toggle search filters on click
  state = {
    showFilters: false,
    term: ''
  };

  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  onKeyDown = e => {
    if (e.key === 'Enter' && this.state.term) {
      this.props.handleTermSearch(this.state.term);
      this.setState({ term: '' });
    } else if (e.key === 'Backspace') {
      const searchChip = e.target.parentNode.previousSibling;
      if (searchChip) {
        searchChip.focus();
      }
    }
  };

  preventToggle = e => {
    if (e.target.name === 'term' && this.state.term) {
      e.stopPropagation();
    }
  };

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  renderSearchBarFilter() {
    if (this.state.showFilters) {
      return <section className="search-bar__filters active">{this.props.children}</section>;
    }
    return null;
  }

  renderTermSearch() {
    if (!this.props.hideTermSearch) {
      return (
        <span>
          &nbsp;
          <input
            type="text"
            onKeyDown={this.onKeyDown}
            className="candidate-filter"
            placeholder={this.props.termSearchPlaceholder || 'Enter your search keywords here'}
            onChange={this.onChange}
            name="term"
            value={this.state.term}
          />
        </span>
      );
    }
    return null;
  }

  render() {
    return (
      <section className="search-bar">
        <section className="search-bar__chips" onClick={this.toggleFilters}>
          <span className="icon-action-wrapper search-icon icon-sm" />
          {Object.keys(this.props.filter).map(key => this.props.getDisplayChips(key, this.props.filter[key]))}
          {this.renderTermSearch()}
        </section>
        {this.renderSearchBarFilter()}
      </section>
    );
  }
}

SearchBar.propTypes = {
  termSearchPlaceholder: PropTypes.string,
  children: PropTypes.node,
  getDisplayChips: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};
