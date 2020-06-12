import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RIENumber extends Component {
  state = { editMode: false };

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideEdit);
  }

  handleInputChange = e => this.setState({ number: e.target.value });

  openEdit = () => {
    this.setState({ editMode: true, number: this.props.value });
    document.body.addEventListener('click', this.hideEdit);
  };

  hideEdit = e => {
    if (e.target.name !== 'number') {
      if (this.props.value !== parseInt(this.state.number, 10)) {
        this.props.change({
          recordId: this.props.recordId,
          newValue: this.state.number,
          oldValue: this.props.value
        });
      }

      this.setState({ editMode: false });
      document.body.removeEventListener('click', this.hideEdit);
    }
  };

  render() {
    const { className, value } = this.props;

    if (this.state.editMode) {
      return (
        <input
          type="number"
          name="number"
          className="rie-number-input"
          value={this.state.number}
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
          onChange={this.handleInputChange}
        />
      );
    } else {
      return (
        <span className={className} onClick={this.openEdit}>
          {value}
        </span>
      );
    }
  }
}

RIENumber.propsTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  recordId: PropTypes.strategy
};

export default RIENumber;
