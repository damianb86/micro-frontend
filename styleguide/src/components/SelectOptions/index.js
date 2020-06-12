/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

import './bs_dropdown.scss';
import './index.scss';
import GroupOption from './GroupOption';
import SimpleOption from './SimpleOption';
import DropdownButton from '../DropdownButton';

export default class SelectOptions extends Component {
  constructor(props) {
    super(props);

    this.state = { active: null, open: false, searching: '' };
    this.references = {};
    this.clearSearchingTimeout = null;

    this.keyPressMap = {
      scrollUp: 'up',
      scrollDown: 'down',
      selectItem: 'enter',
      ignoreSpaceDefault: 'space'
    };

    this.keyPressHandlers = {
      scrollUp: this.navigateUp,
      scrollDown: this.navigateDown,
      selectItem: this.selectItem,
      ignoreSpaceDefault: this.ignoreSpaceDefault
    };
  }

  componentWillUnmount() {
    if (this.clearSearchingTimeout) {
      clearTimeout(this.clearSearchingTimeout);
    }
  }

  getSelected = () => {
    const { options, value } = this.props;

    let selected;
    options.find((o) => {
      if (o == value || o.id == value) {
        selected = o;
      } else if (o.options) {
        selected = o.options.find(p => p == value || p.id == value);
      }
      return selected;
    });

    return selected;
  }

  getTitle = (selected) => {
    if (selected) {
      const domProps = { className: 'select-options__title', title: selected.value || selected };
      return <span {...domProps}>{selected.value || selected}</span>;
    }

    return '';
  };

  clearSearching = () => this.setState({ searching: '' });

  handleSelect = val => this.props.onSelect(val, this.props.name || this.props.id);

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleItemClick = (e) => {
    // Avoid to click in a group title
    if (e && e.target.parentElement && e.target.parentElement.className.indexOf('group-title') !== -1) {
      return null;
    }

    const id = e && e.target.getAttribute('data-id');
    this.handleSelect(id);
    this.setState({ open: false });
  };

  handleKeyPress = (e) => {
    const { searching } = this.state;
    const { options } = this.props;
    const newSearching = searching + e.key;
    let active = null;
    let isChildren = false;

    // Search text in options
    options.some((option) => {
      // If is a group, search inside his options
      if (Array.isArray(option.options)) {
        const childActive = option.options.find(opt => opt.value.toLowerCase &&
          opt.value.toLowerCase().indexOf(newSearching.toLowerCase()) === 0);

        if (childActive) {
          active = childActive.id;
          isChildren = true;
          return true;
        }
      }

      const val = option.value || option;
      if (val.toLowerCase && val.toLowerCase().indexOf(newSearching.toLowerCase()) === 0) {
        active = option.id || option;
        return true;
      }

      return false;
    });

    this.scrollToItem({ id: active, isChildren });

    this.setState({ active, searching: newSearching });

    // Setting timeout to match the browser default behavior
    if (this.clearSearchingTimeout) {
      clearTimeout(this.clearSearchingTimeout);
    }
    this.clearSearchingTimeout = setTimeout(this.clearSearching, 1000);
  };

  navigateUp = (e) => {
    const { options } = this.props;
    const { active } = this.state;
    let next = null;
    e.preventDefault();

    let previous = false;
    options.some((option) => {
      if (Array.isArray(option.options)) {
        option.options.some((opt) => {
          if (opt.id === active) {
            next = previous;
            return true;
          }

          previous = { id: opt.id, isChildren: true };
          return false;
        });
      } else {
        if ((option.id || option) === active) {
          next = previous;
          return true;
        }

        previous = { id: (option.id || option), isChildren: false };
      }

      return false;
    });
    if (!next && options) {
      next = { id: (options[options.length - 1].id || options[options.length - 1]), isChildren: false };
    }

    this.scrollToItem(next);
  }

  navigateDown = (e) => {
    const { options } = this.props;
    const { active } = this.state;
    let next = null;
    e.preventDefault();

    let getNext = false;
    options.some((option) => {
      if (Array.isArray(option.options)) {
        option.options.some((opt) => {
          // If previous sub-option was the current selected, take this
          if (getNext) {
            next = { id: opt.id, isChildren: true };
            return true;
          }

          // If current sub-option is selected, set getNext to true to take the next
          if (opt.id === active) {
            getNext = true;
          }

          return false;
        });
      } else {
        // If previous option was the current selected, take this
        if (getNext) {
          next = { id: (option.id || option), isChildren: false };
          return true;
        }

        // If current option is selected, set getNext to true to take the next
        if ((option.id || option) === active) {
          getNext = true;
        }
      }

      // If next is already selected, break the loop
      if (next) {
        return true;
      }

      return false;
    });

    // If a can't find the next element, select the first
    if (!next && options.length) {
      if (Array.isArray(options[0].options) && options[0].options.length) {
        next = { id: options[0].options[0].id, isChildren: true };
      } else {
        next = { id: (options[0].id || options[0]), isChildren: false };
      }
    }

    this.scrollToItem(next);
  }

  scrollToItem = (item) => {
    if (item) {
      const domElement = ReactDOM.findDOMNode(this.references[item.id]);
      if (domElement && domElement.parentElement && (!item.isChildren || (item.isChildren && domElement.parentElement.parentElement))) {
        if (item.isChildren) {
          domElement.parentElement.parentElement.scrollTop = domElement.offsetTop;
        } else {
          domElement.parentElement.scrollTop = domElement.offsetTop;
        }
      }

      this.setState({ active: item.id });
    }
  }

  selectItem = (e) => {
    e.preventDefault();
    this.handleSelect(this.state.active);
    this.setState({ open: false });
  }

  ignoreSpaceDefault = (e) => {
    e.preventDefault();
    if (this.props.allowKeyPress) {
      this.handleKeyPress(e);
    }
  }

  assignReference = (r) => {
    if (r) {
      this.references[r.getAttribute('data-id')] = r;
    }
  }

  render() {
    const { active, open } = this.state;
    const {
      prompt,
      id,
      disabled,
      pullRight,
      tabIndex,
      className,
      borderLess,
      options,
      useCheckMark,
      btnStyle,
      isCaretVisible,
      allowKeyPress } = this.props;

    const selected = this.getSelected();
    const title = this.getTitle(selected);

    return (
      <div className={classNames('select-options dropdown', { open, 'use-check-mark': useCheckMark }, className)}>
        <HotKeys keyMap={this.keyPressMap} handlers={this.keyPressHandlers}>
          <DropdownButton
            id={id}
            open={open}
            title={title || prompt}
            borderLess={borderLess}
            disabled={disabled}
            tabIndex={tabIndex}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            onClickOutside={this.handleClose}
            onKeyPress={allowKeyPress ? this.handleKeyPress : null}
            style={btnStyle}
            isCaretVisible={isCaretVisible}
          >
            <ul className={classNames('select-options__menu dropdown-menu', { pullRight })} ref={(r) => { this.listRef = r; }}>
              {options.map(option => (
                Array.isArray(option.options) ?
                  <GroupOption
                    key={option.id || option}
                    option={option}
                    active={active}
                    assignReference={this.assignReference}
                    onItemClick={this.handleItemClick}
                  /> :
                  <SimpleOption
                    key={option.id || option}
                    option={option}
                    active={active}
                    assignReference={this.assignReference}
                    onItemClick={this.handleItemClick}
                  />
              ))}
            </ul>
          </DropdownButton>
        </HotKeys>
      </div>
    );
  }
}

SelectOptions.defaultProps = {
  prompt: 'Select',
  disabled: false,
  useCheckMark: false,
  isCaretVisible: true,
  allowKeyPress: true
};

SelectOptions.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]).isRequired,
        value: PropTypes.any.isRequired,
        selected: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.object)
      }),
      PropTypes.string
    ])
  ).isRequired,
  prompt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  pullRight: PropTypes.bool,
  tabIndex: PropTypes.string,
  useCheckMark: PropTypes.bool,
  btnStyle: PropTypes.object,
  isCaretVisible: PropTypes.bool,
  allowKeyPress: PropTypes.bool
};
