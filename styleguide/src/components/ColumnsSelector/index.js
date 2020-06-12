import React from 'react';
import PropTypes from 'prop-types';

import CheckBox from '../CheckBox';
import toggleDropdown from '../ToggleDropdown';
import SettingsIcon from '../../../icons/icon-12-gear.svg';

import './index.scss';

export class ColumnsSelector extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.handleSubmit(nextProps);
  }

  handleSubmit = (nextProps) => {
    if (this.props.handleSubmit && this.props.dropdownVisible && !nextProps.dropdownVisible) {
      this.props.handleSubmit();
    }
  };

  handleToggleDropdown = (e) => {
    if (e && e.target) e.target.blur();
    return this.props.dropdownVisible ? this.props.hideDropdown(null, true) : this.props.showDropdown();
  };

  render() {
    const { data } = this.props;

    return (
      <section className="columns-selector">
        <button onClick={this.handleToggleDropdown} className="columns-selector__button sec-button">
          <SettingsIcon />
        </button>
        {this.props.dropdownVisible ? (
          <section className="columns-selector__popup">
            <h3 className="columns-selector__popup__heading">Show Columns</h3>
            <ul className="columns-selector__popup__list">
              {data.map(item => (
                <li key={item.value} className="columns-selector__popup__list__item">
                  <CheckBox onChange={this.props.onChange} checked={item.selected} label={item.value} value={item.value} name={item.key} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    );
  }
}

ColumnsSelector.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      selected: PropTypes.bool
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

export default toggleDropdown(ColumnsSelector, true);
