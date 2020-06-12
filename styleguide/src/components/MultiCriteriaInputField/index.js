/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-find-dom-node */

import React, { Component } from 'react';
import { HotKeys } from 'react-hotkeys';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MultiTags from '../MultiTags';

export class MultiCriteriaInputField extends Component {
  state = { term: '' };

  handlePressReturn = (e) => {
    const { term } = this.state;
    const { onSubmit, items } = this.props;
    e.preventDefault();

    if (term === '' && onSubmit) {
      onSubmit(items);
    }

    this.addTermToSelectedList();
  };

  addTermToSelectedList = () => {
    const { term } = this.state;

    if (term) {
      this.setState({ term: '' });
      if (this.input) { this.input.focus(); }

      if (this.props.onSelection) {
        this.props.onSelection({ id: term, name: term });
      }
    }
  }

  handleInputChange = e => this.setState({ term: e.target.value });

  handleFocus = () => {
    this.input.focus();
    if (this.props.onClick) { this.props.onClick(); }
  };

  removeItem = e => this.props.onRemove(e.currentTarget.dataset.id);

  deleteOnBackspace = () => {
    if (this.state.term) return;
    const items = [...this.props.items];
    if (items.length > 0) this.props.onRemove(items.pop().id);
  };

  render() {
    const { className, items, placeholder, dropdownVisible, autoFocus } = this.props;
    const map = {
      deleteItem: ['del', 'backspace'],
      selectItem: ['enter', 'tab']
    };

    const handlers = {
      deleteItem: this.deleteOnBackspace,
      selectItem: this.handlePressReturn
    };

    return (
      <section
        ref={(container) => {
          this.container = container;
        }}
        className={classNames('search-select-multi', className)}
      >
        <div onClick={this.handleFocus} className={classNames('search-select-multi__input-wrapper', { focused: dropdownVisible })}>
          <MultiTags items={items} onRemove={this.removeItem} />
          <HotKeys style={{ display: 'inline-block' }} keyMap={map} handlers={handlers}>
            <input
              id="text-search-input"
              autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
              type="text"
              placeholder={!this.state.showList && placeholder ? placeholder : ''}
              ref={(input) => {
                this.input = input;
              }}
              value={this.state.term}
              onChange={this.handleInputChange}
            />
          </HotKeys>
        </div>
      </section>
    );
  }
}

export default MultiCriteriaInputField;

MultiCriteriaInputField.defaultProps = { className: '', autoFocus: true };

MultiCriteriaInputField.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  onSelection: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool
};
