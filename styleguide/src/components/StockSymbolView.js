import React, { Component } from 'react';

import editableView from './EditableView';
import ActiveForm from './ActiveForm';
import { InformationListItemValue } from './InformationListItem';
import PropTypes from 'prop-types';

class StockSymbolView extends Component {
  state = { exchange: '', tickerSymbol: '' };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onEdit = e => {
    const company = this.props.record;

    if (company) {
      this.setState({ tickerSymbol: company.tickerSymbol || '', exchange: company.exchange || '' });
    } else {
      this.setState({ exchange: '', tickerSymbol: '' });
    }
    this.props.onEdit(e);
  };

  handleSubmit = e => this.props.onSubmit(e, { exchange: this.state.exchange, tickerSymbol: this.state.tickerSymbol });

  render() {
    if (this.props.editMode) {
      return (
        <ActiveForm
          onSubmit={this.handleSubmit}
          submitButton="Save Changes"
          onCancel={this.props.onCancel}
          className="form-horizontal form-horizontal-label-left horizontal-list__item"
          activeFormButtonSpace="col-sm-offset-2 col-sm-11"
        >
          <div className="form-group">
            <label htmlFor="exchange" className="col-sm-2 control-label">
              Exchange
            </label>
            <div className="col-sm-6">
              <input
                id="exchange"
                className="form-control edit-mode"
                type="text"
                value={this.state.exchange}
                name="exchange"
                placeholder="Exchange"
                onChange={this.onChange}
              />
            </div>
            <label htmlFor="tickerSymbol" className="col-sm-1 control-label">
              Ticker
            </label>
            <div className="col-sm-3">
              <input
                id="tickerSymbol"
                className="form-control edit-mode"
                type="text"
                value={this.state.tickerSymbol}
                name="tickerSymbol"
                placeholder="Ticker Symbol"
                onChange={this.onChange}
              />
            </div>
          </div>
        </ActiveForm>
      );
    }

    const { record } = this.props;

    if (!record.exchange && !record.tickerSymbol) {
      return (
        <section className="horizontal-list__item horizontal-list__item--link">
          <span className="sky-text pointer-cursor text-italic" onClick={this.onEdit}>
            <small>Click to Add</small>
          </span>
        </section>
      );
    }

    return (
      <InformationListItemValue onEdit={this.onEdit}>
        {[record.exchange, record.tickerSymbol].filter(i => i.trim().length).join(' - ')}
      </InformationListItemValue>
    );
  }
}

StockSymbolView.defaultProps = {
  editable: true
};

StockSymbolView.propTypes = {
  editable: PropTypes.bool,
  record: PropTypes.object,
  onSubmit: PropTypes.func
};

export default editableView(StockSymbolView);
