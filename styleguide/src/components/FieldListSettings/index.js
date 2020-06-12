import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { arrayMove } from 'react-sortable-hoc';

import SortableList from './SortableList';
import CheckBox from '../CheckBox';
import IconLink from '../IconLink';
import '../../../styles/field_list_settings.css';
import search from '../../../assets/images/Search_Slate1_455565.svg';
import back from '../../../assets/images/icon-chevron-left_455565.svg';

class FieldListSettings extends Component {
  state = { searchedItems: null, settingsMode: false };

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideSettings);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.selectedFields, nextProps.selectedFields)) {
      this.setState({ selectedFields: nextProps.selectedFields });
    }
  }

  showSettings = e => {
    this.setState({
      settingsMode: true,
      selectedFields: this.props.selectedFields
    });
    document.body.addEventListener('click', this.hideSettings);
  };

  hideSettings = e => {
    if (e.target.dataset.value === 'back' || (e.target !== this.dom && !this.dom.contains(e.target))) {
      this.setState({ settingsMode: false });
      document.body.removeEventListener('click', this.hideSettings);
    }
  };

  isChecked(key) {
    return this.state.selectedFields.indexOf(key) >= 0;
  }

  isSelectChange() {
    return (
      this.state.selectedFields &&
      this.state.selectedFields.length > 0 &&
      !isEqual(this.props.selectedFields, this.state.selectedFields)
    );
  }

  handleCheckboxChecked = e => {
    let key = e.target.value;
    let items = [...this.state.selectedFields];

    if (items.indexOf(key) >= 0) {
      items = items.filter(item => item !== key);
    } else {
      items.push(key);
    }

    this.setState({ selectedFields: items });
  };

  handleRemoveItem = event => {
    const items = this.state.selectedFields.filter(item => item !== event.target.dataset.value);
    this.setState({ selectedFields: items });
  };

  updatePositon = ({ oldIndex, newIndex }) => {
    this.setState({ selectedFields: arrayMove(this.state.selectedFields, oldIndex, newIndex) });
  };

  handleSearch = e => {
    const searchKey = e.target.value.toLowerCase();
    this.setState({ searchTerm: searchKey });

    if (searchKey) {
      const items = this.props.items.filter(item => item.title.toLowerCase().includes(searchKey));
      this.setState({ searchedItems: items });
    } else {
      this.setState({ searchedItems: null });
    }
  };

  handleApply = () => {
    this.props.onApply(this.state.selectedFields);
    document.body.removeEventListener('click', this.hideSettings);
    this.setState({ settingsMode: false });
  };

  renderSelectedList() {
    const records = this.state.selectedFields.map(key => {
      const item = this.props.items.find(item => item.key === key);
      return item;
    });

    if (records.length < 1) return null;

    return (
      <section className="field-list-settings__selected-list">
        <h4 className="field-list-settings__selected-heading">Selected</h4>
        <SortableList
          fields={records}
          handleRemoveItem={this.handleRemoveItem}
          useDragHandle={true}
          onSortEnd={this.updatePositon}
        />
      </section>
    );
  }

  renderSettingsDropdown() {
    if (!this.state.settingsMode) return null;

    const dataOptions = this.state.searchedItems || this.props.items;
    const listOfFields = dataOptions.filter(item => !this.state.selectedFields.includes(item.key));

    return (
      <div
        ref={dom => {
          this.dom = dom;
        }}
        className="field-list-settings"
      >
        <section className="field-list-settings__field-search">
          <img
            src={back}
            alt="back"
            data-value="back"
            onClick={this.hideSettings}
            className="field-list-settings__field-search__back-img"
          />
          <img src={search} alt="search" className="field-list-settings__field-search__search-img" />
          <input type="text" placeholder="Search" value={this.state.searchTerm} onChange={this.handleSearch} />
        </section>
        {this.renderSelectedList()}
        <section className="field-list-settings__data-list">
          <h4 className="field-list-settings__data-heading">Data Options</h4>
          <ul className="list-unstyled">
            {listOfFields.map(item => {
              return (
                <li key={item.key}>
                  <CheckBox
                    label={item.title}
                    value={item.key}
                    onChange={this.handleCheckboxChecked}
                    checked={this.isChecked(item.key)}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <section className="field-list-settings__btn text-right">
          <button
            className="btn btn-primary"
            disabled={this.isSelectChange() ? '' : 'disabled'}
            onClick={this.handleApply}
          >
            Apply
          </button>
        </section>
      </div>
    );
  }

  render() {
    return (
      <div>
        <IconLink
          type="settings-light"
          onClick={this.showSettings}
          title="Field Settings"
          size="sm"
          active={this.state.settingsMode}
        />
        {this.renderSettingsDropdown()}
      </div>
    );
  }
}

FieldListSettings.propsTypes = {
  items: PropTypes.array.isRequired,
  selectedFields: PropTypes.array.isRequired,
  onApply: PropTypes.func.isRequired
};

export default FieldListSettings;
