import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import './index.scss';

class SearchSelect extends Component {
  static getDerivedStateFromProps({ value }, prevState) {
    if (!prevState.term) {
      return { term: value || '' };
    }

    return prevState;
  }

  constructor(props) {
    super(props);
    this.state = { term: this.props.value, cursor: -1, showList: false };
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideSearch);
  }

  handleInputChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }

    if (this.props.autoSuggest && e.target.value.length < 3) {
      this.setState({ term: e.target.value, showList: false });
    } else {
      this.setState(
        { term: e.target.value, showList: true, cursor: -1 },
        this.props.useDebounce ? this.debounceSetInputChange : () => this.props.autoComplete(this.state.term)
      );
    }
  };

  debounceSetInputChange = debounce(() => this.props.autoComplete(this.state.term), 300);

  handleFocus = () => {
    document.body.addEventListener('click', this.hideSearch);

    if (this.props.autoload) {
      const key = this.state.term || null;
      this.setState({ showList: true }, () => this.props.autoComplete(key));
    }
  };

  handleSelect = (e) => {
    const option = { id: e.target.dataset.label, value: e.target.dataset.value };
    return this.setState({ cursor: -1, term: e.target.dataset.value, showList: false }, () => this.props.onSubmit(option));
  };

  hideSearch = (e) => {
    if (e.target !== this.container && !this.container.contains(e.target)) {
      this.setState({ cursor: -1, showList: false });
      document.body.removeEventListener('click', this.hideSearch);
    }
  };

  handleKeyDown = (e) => {
    let listItemHeight;
    const listLength =
      this.props.creatable && this.props.options.filter(op => op.value === this.state.term).length === 0
        ? this.props.options.length
        : this.props.options.length - 1;

    if (this.list && this.list.children[0]) {
      listItemHeight = this.list.children[0].clientHeight;
    } else {
      listItemHeight = 40; // default list item height
    }
    // arrow up/down button should select next/previous list element
    if (e.key === 'ArrowUp' && this.state.cursor > 0) {
      this.setState(prevState => ({ cursor: prevState.cursor - 1 }));

      if (this.state.cursor >= 5) {
        this.list.scrollTop -= listItemHeight;
      }
    } else if (e.key === 'ArrowDown' && this.state.cursor < listLength) {
      this.setState(prevState => ({ cursor: prevState.cursor + 1 }));

      if (this.state.cursor > 3) {
        this.list.scrollTop += listItemHeight;
      }
    }
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  };

  handleSubmit = (e) => {
    if ((!this.props.autoSuggest || this.props.creatable) && this.state.cursor === -1) {
      return;
    }

    if (this.props.autoSuggest && this.state.cursor === -1) {
      this.setState({ term: e.target.value, cursor: -1, showList: false }, () => this.props.onSubmit(this.state.term));
    } else if (this.props.creatable && this.props.options.filter(op => op.value === this.state.term).length === 0) {
      if (this.state.cursor === 0) {
        this.setState({ term: e.target.value, cursor: -1, showList: false }, () =>
          this.props.onSubmit({ id: 'new', value: this.state.term })
        );
      } else {
        const term = this.props.options[this.state.cursor - 1];
        this.setState({ cursor: -1, term: term.value, showList: false }, () => this.props.onSubmit(term));
      }
    } else {
      const term = this.props.options[this.state.cursor];
      this.setState({ cursor: -1, term: term.value, showList: false }, () => this.props.onSubmit(term));
    }

    if (this.input) {
      this.input.blur();
    }
  };

  renderOptions(options) {
    const { cursor } = this.state;

    return (
      <ul
        ref={(list) => {
          this.list = list;
        }}
        className="search-select__list"
      >
        {options.map((option, i) => (
          <li
            key={option.id}
            data-value={option.value}
            data-label={option.id}
            className={`search-select__list__item ${cursor === i ? 'active' : ''}`}
            onClick={this.handleSelect}
          >
            {option.id === 'new' ? `Add New: "${option.value}"` : option.value}
          </li>
        ))}
      </ul>
    );
  }
  render() {
    let { options } = this.props;

    if (this.props.creatable && options.filter(op => op.value === this.state.term).length === 0) {
      options = [{ id: 'new', value: this.state.term }, ...options];
    }

    return (
      <section
        ref={(container) => {
          this.container = container;
        }}
        className={this.props.autoSuggest ? 'auto-suggest' : `search-select ${this.state.showList ? 'active' : ''}`}
      >
        <input
          className={!this.props.autoSuggest ? 'search-select__input' : ''}
          type="text"
          name={this.props.name}
          placeholder={this.props.placeholder || 'Search'}
          ref={(input) => {
            this.input = input;
          }}
          value={this.state.term}
          onChange={this.handleInputChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          autoComplete="off"
        />
        {this.state.showList && options.length > 0 ? this.renderOptions(options) : null}
      </section>
    );
  }
}

SearchSelect.defaultProps = { useDebounce: false, value: '' };

export default SearchSelect;
