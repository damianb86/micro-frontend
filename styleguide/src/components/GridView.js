import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default class GridView extends Component {
  render() {
    if (!this.props.loading && this.props.rows.length === 0) {
      return (
        <section className="col-xs-12">
          <h2 className="text-center">{this.props.emptyMessage}</h2>
        </section>
      );
    }

    return (
      <section>
        <section className="grid-view">
          {this.props.rows.map(row => {
            return (
              <section key={row.id} className="grid-view__item-wrapper">
                {this.props.renderCell(row)}
              </section>
            );
          })}
        </section>
        <section className="text-center">
          {this.props.loading ? <Loading /> : null}
          {this.props.loadMore && !this.props.loading ? (
            <strong>
              <a onClick={this.props.handleLoadMore}>Load More</a>
            </strong>
          ) : null}
        </section>
      </section>
    );
  }
}

GridView.propTypes = {
  loadMore: PropTypes.bool,
  loading: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object),
  handleLoadMore: PropTypes.func,
  renderCell: PropTypes.func,
  emptyMessage: PropTypes.string
};
