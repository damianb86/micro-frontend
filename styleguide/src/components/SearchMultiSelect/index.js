/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-find-dom-node */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import MultiTags from '../MultiTags';
import toggleDropdown from '../ToggleDropdown';
import SelectOptions from './SelectOptions';

import './index.scss';

export class SearchMultiSelect extends Component {
  state = { term: '', cursor: -1 };

  componentDidMount() {
    if (!this.props.dropdownVisible) {
      this.props.showDropdown();
    }
  }

  getListItemHeight = (listNode) => {
    let listItemHeight;
    if (listNode) {
      listItemHeight = listNode.clientHeight;
    } else {
      listItemHeight = 40; // default list item height
    }
    return listItemHeight;
  };

  getOptions = () => {
    const { term } = this.state;
    const { options, handleInputChange } = this.props;
    if (!handleInputChange) {
      return options.filter(op => op.name.toLowerCase().includes(term.toLowerCase()));
    }
    return options;
  };

  handlePressReturn = (e) => {
    e.preventDefault();
    const { cursor } = this.state;

    if (cursor === -1) return;
    const option = this.getOptions()[cursor];
    if (option) this.addToSelectedList(option);
  };

  addToSelectedList = (option) => {
    this.setState({ term: '' });
    if (this.input) this.input.focus();
    if (this.props.onSelection) this.props.onSelection(option);
  };

  handleInputChange = (e) => {
    const { handleInputChange, debounceInputChange } = this.props;

    this.setState({ term: e.target.value, cursor: -1 });
    if (handleInputChange) {
      if (debounceInputChange) {
        e.persist();
        this.debounceHandleInputChange(e);
      } else {
        handleInputChange(e);
      }
    }
  }

  debounceHandleInputChange = debounce(e => this.props.handleInputChange(e), 300);

  handleFocus = () => {
    this.setState({ cursor: -1 });
    this.input.focus();
    this.props.showDropdown();
  };

  handleSelect = e => this.addToSelectedList({ id: e.target.dataset.label, name: e.target.dataset.value });

  removeItem = e => this.props.onRemove(e.currentTarget.dataset.id);

  deleteOnBackspace = () => {
    if (this.state.term) return;
    const items = [...this.props.items];
    if (items.length > 0) this.props.onRemove(items.pop().id);
  };

  cursorUp = () => {
    const { cursor } = this.state;

    if (cursor >= 0) {
      this.setState({ cursor: cursor - 1 });

      if (cursor >= 1) {
        const listNode = ReactDOM.findDOMNode(this.list);

        if (listNode && listNode.children) {
          const nextNode = listNode.children[cursor - 1];
          listNode.scrollTop -= this.getListItemHeight(nextNode);
        }
      }
    }
  };

  cursorDown = () => {
    const options = this.getOptions();
    const listLength = options && options.length > 0 ? options.length - 1 : 0;
    const { cursor } = this.state;

    // arrow up/down button should select next/previous list element
    if (cursor < listLength) {
      this.setState({ cursor: cursor + 1 });

      if (cursor >= 0) {
        const listNode = ReactDOM.findDOMNode(this.list);

        if (listNode && listNode.children) {
          const nextNode = listNode.children[cursor];
          listNode.scrollTop += this.getListItemHeight(nextNode);
        }
      }
    }
  };

  render() {
    const { items, dropdownVisible, className, placeholder, onLoadMore } = this.props;
    const { showList, term, cursor } = this.state;

    const map = {
      scrollUp: 'up',
      scrollDown: 'down',
      deleteItem: ['del', 'backspace'],
      selectItem: ['enter', 'tab']
    };

    const handlers = {
      deleteItem: this.deleteOnBackspace,
      scrollDown: this.cursorDown,
      scrollUp: this.cursorUp,
      selectItem: this.handlePressReturn
    };

    return (
      <section className={classNames('search-select-multi', className)}>
        <div
          onClick={this.handleFocus}
          className={classNames('search-select-multi__input-wrapper', { focused: dropdownVisible })}
        >
          <MultiTags items={items} onRemove={this.removeItem} />
          <HotKeys style={{ display: 'inline-block' }} keyMap={map} handlers={handlers}>
            <input
              type="text"
              autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              placeholder={!showList && placeholder ? placeholder : ''}
              ref={(input) => {
                this.input = input;
              }}
              value={term}
              onChange={this.handleInputChange}
            />
          </HotKeys>
        </div>
        {dropdownVisible && this.getOptions().length > 0 && (
          <SelectOptions
            ref={(list) => { this.list = list; }}
            options={this.getOptions()}
            cursor={cursor}
            handleSelect={this.handleSelect}
            onLoadMore={onLoadMore}
            isLoadMoreEnable
          />
        )}
      </section>
    );
  }
}

export default toggleDropdown(SearchMultiSelect, true);

SearchMultiSelect.defaultProps = {
  className: '',
  showDropdown: () => null,
  debounceInputChange: false
};

SearchMultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  onSelection: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onLoadMore: PropTypes.func,
  showDropdown: PropTypes.func,
  handleInputChange: PropTypes.func,
  debounceInputChange: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string
};
