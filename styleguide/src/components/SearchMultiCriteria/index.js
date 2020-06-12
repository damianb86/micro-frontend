/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import MultiCriteriaInputField from '../MultiCriteriaInputField';
import AddIcon from '../../../icons/icon-12-add.svg';
import CloseIcon from '../../../icons/icon-12-close.svg';
import ExpandIcon from '../../../icons/icon-12-chevron-down.svg';
import CollapseIcon from '../../../icons/icon-12-chevron-up.svg';

import './index.scss';

class SearchMultiCriteria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.defaultItems,
      touched: !isEmpty(window.location.search),
      expanded: false
    };
  }

  searchRefs = {};

  handleSelection = (key, item) =>
    this.setState(({ items }) => ({ items: items.map((i, index) => (index === key ? i.concat([item]) : i)) }));

  handleAddCriteria = () => {
    this.setState(({ items }) => ({ items: items.concat([[]]) }));
    this.setState({ expanded: true }, this.triggerResizeEvent);
  }

  handleRemoveCriteria = key =>
    this.setState(({ items }) => ({ items: items.filter((i, index) => index !== key) }), this.triggerResizeEvent);

  handleRemoveTag = (key, itemId) =>
    this.setState(({ items }) => ({ items: items.map((i, index) => (index === key ? i.filter(ii => ii.id !== itemId) : i)) }));

  handleClear = () => this.setState({ items: [[]], touched: false, expanded: false }, this.props.onClear);

  handleSearch = () => {
    const promises = Object.values(this.searchRefs).map(sr => sr && sr.addTermToSelectedList()).filter(sr => sr);
    return Promise.all(promises).then(() => this.props.onSearch(this.state.items));
  }

  handlePressEnter = (items) => {
    if (items && items.length) {
      this.handleSearch();
    }
  }

  handleClick = () => {
    if (!this.state.touched) {
      this.setState({ touched: true }, () => setTimeout(this.triggerResizeEvent, 100));
    }
  }

  triggerResizeEvent = () => {
    if (typeof CustomEvent === 'function') {
      window.dispatchEvent(new Event('resize'));
    } else {
      const event = document.createEvent('Event');
      event.initEvent('resize', true, true);
      window.dispatchEvent(event);
    }
  }

  expandCollapseView = () => {
    this.setState({ expanded: !this.state.expanded, touched: !this.state.touched }, () => setTimeout(this.triggerResizeEvent, 100));
  }

  expandCollapseIcon = () => (this.state.expanded ? <CollapseIcon onClick={this.expandCollapseView} /> : <ExpandIcon onClick={this.expandCollapseView} />);

  render() {
    const { items, touched, expanded } = this.state;
    const { disable, children } = this.props;

    return (
      <div className="search-multiple-criteria">

        {items.map((item, key) => (
          (key === 0 || expanded) && (
            <div className="search-multiple-criteria__item" key={key}>
              {(key !== 0 && <span className="search-multiple-criteria__item__additional-input">And</span>)}
              <div className="search-multiple-criteria__item__input">
                <MultiCriteriaInputField
                  placeholder={item.length ? '' : 'Search Text Keywords'}
                  items={item}
                  onSelection={this.handleSelection.bind(null, key)}
                  onRemove={this.handleRemoveTag.bind(null, key)}
                  onClick={this.handleClick}
                  onSubmit={this.handlePressEnter}
                  ref={(el) => { this.searchRefs[key] = el; }}
                  autoFocus={false}
                />
              </div>
              <div className="search-multiple-criteria__item__close">
                {(key && <CloseIcon onClick={this.handleRemoveCriteria.bind(null, key)} />) || this.expandCollapseIcon()}
              </div>
            </div>
          )
        ))}
        {touched &&
          <div className="search-multiple-criteria__actions">
            <div className="search-multiple-criteria__actions__add">
              <button onClick={this.handleAddCriteria} className="sec-button" key="add" title="Add Criteria">
                <AddIcon />
              </button>
            </div>
            <div className="search-multiple-criteria__actions__children">
              {children}
              <div className="search-multiple-criteria__actions__buttons">
                <a className="btn btn-primary pri-button" onClick={this.handleSearch} role="button" tabIndex="-2" disable={disable.toString()}>Search</a>
                <a className="btn btn-decline sec-button clear" onClick={this.handleClear} role="button" tabIndex="-3">Clear</a>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

SearchMultiCriteria.defaultProps = {
  onClear: () => null,
  onSearch: () => null,
  disable: false,
  defaultItems: [[]]
};

SearchMultiCriteria.propTypes = {
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
  disable: PropTypes.bool,
  defaultItems: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object))
};

export default SearchMultiCriteria;
