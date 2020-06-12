import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';

import ListView from '../ListView';
import './index.scss';

import downloadTableInCSV from '../../../helpers/downloadTableInCSV';

export default class ReportTable extends React.Component {
  state = { sortField: null, sortAscending: true };

  getGrandTotal = row =>
    Math.round(Object.keys(row).reduce((sum, key) => (['id', 'name', 'role'].includes(key) ? 0 : parseFloat(row[key])) + sum, 0.0));

  getAverageRow = (rows) => {
    const { columns } = this.props;
    const average = { id: 'average' };

    columns.forEach((column) => {
      if (column.isName) {
        average[column.key] = 'Average';
      } else if (column.isRole) {
        average[column.key] = '';
      } else {
        average[column.key] = rows.length !== 0 ?
          Math.round(rows.reduce((sum, row) => (row[column.key] !== undefined ? row[column.key] + sum : sum), 0) / rows.length) : 0;
      }
    });

    return average;
  };

  getRowsSorted = (rows, sortField, sortAscending) => {
    const list = rows.map(row => ({ ...row, grandTotal: this.getGrandTotal(row) }));
    const averageRow = this.getAverageRow(list);

    list.sort((a, b) => {
      if (sortField) {
        const aField = a[sortField] || 0;
        const bField = b[sortField] || 0;
        if (typeof aField === 'string') {
          return aField.localeCompare(bField) * (sortAscending ? 1 : -1);
        }
        return (aField - bField) * (sortAscending ? 1 : -1);
      }
      return 0;
    });

    return [averageRow].concat(list);
  };

  getRowsSortedMemoized = defaultMemoize(this.getRowsSorted);

  downloadAsCSV = () => {
    const { sortField, sortAscending } = this.state;
    const { columns, rows } = this.props;
    const rowRecords = this.getRowsSortedMemoized(rows, sortField, sortAscending).map(row => columns.map(column => row[column.key]));
    const columnRecords = columns.map(r => r.title);

    return downloadTableInCSV([columnRecords].concat(rowRecords), this.props.name);
  }

  handleSort = row =>
    this.setState(state => ({ sortField: row, sortAscending: state.sortField === row ? !this.state.sortAscending : false }));

  render() {
    const { sortField, sortAscending } = this.state;
    const { columns, rows } = this.props;

    return (
      <ListView
        className="report-table-container"
        handleSort={this.handleSort}
        header={columns}
        height="auto"
        renderCell={this.props.renderCell}
        rows={this.getRowsSortedMemoized(rows, sortField, sortAscending)}
        sortAscending={sortAscending}
        sortField={sortField}
      />
    );
  }
}

ReportTable.defaultProps = { name: 'reports' };

ReportTable.propTypes = {
  name: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      width: PropTypes.number,
      sortable: PropTypes.bool.isRequired,
      isName: PropTypes.bool
    })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string
      // Some categories fields
    })
  ),
  renderCell: PropTypes.func
};
