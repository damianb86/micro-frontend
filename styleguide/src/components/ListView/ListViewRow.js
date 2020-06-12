import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListViewCell, { EditableListViewCell } from './ListViewCell';

const ChangeableProps = ['cellWidths', 'isOver', 'isDragging', 'highlighted'];

export default class ListViewRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.optimizeRendering) {
      if (!ChangeableProps.every(k => this.props[k] === nextProps[k])) {
        return true;
      }

      const { row } = this.props;
      if (row === nextProps.row) {
        return false;
      }
      return !nextProps.row || Object.keys(row).some(k => row[k] !== nextProps.row[k]);
    }

    return true;
  }

  handleRowClick = () => this.props.onRowClick && this.props.onRowClick(this.props.row);

  renderFields = fields =>
    fields.map(({ key, className, title, editable, mobileProps }) => {
      const properties = {
        key,
        className,
        title,
        mobileProps,
        cellWidth: this.props.cellWidths[key],
        row: this.props.row,
        cellKey: key,
        renderCell: this.props.renderCell,
        connectDragSource: this.props.connectDragSource,
        isMobileResponsive: this.props.isMobileResponsive
      };

      return editable ? <EditableListViewCell {...properties} /> : <ListViewCell {...properties} />;
    });

  renderDetailView = () => {
    const { detailView, detailViewKey, row } = this.props;

    if (detailView) {
      return <div className="list-view__tbody__row__expand" dangerouslySetInnerHTML={{ __html: row[detailViewKey] }} />;
    }
  };

  render() {
    const {
      row,
      item,
      cellWidths,
      fixedColumnCount,
      header,
      connectDropTarget,
      connectDragPreview,
      isDragging,
      isOver,
      onRowClick,
      sortable,
      style,
      highlighted
    } = this.props;

    const regularFields = header.slice();
    const fixedFields = regularFields.splice(0, fixedColumnCount);
    const innerStyle = { ...style };
    let fixedCellsView;
    let fixedFieldsDom;
    let fixedCellWidth = 0;

    if (fixedFields.length > 0) {
      fixedFieldsDom = this.renderFields(fixedFields);
      fixedCellWidth = fixedFields.reduce((t, h) => t + cellWidths[h.key], 0);
      fixedCellsView = (
        <div className="fixed" style={{ top: '0px' }}>
          {fixedFieldsDom}
        </div>
      );
      fixedFieldsDom = <div style={{ visibility: 'hidden', width: `${fixedCellWidth}px`, display: 'inline-block' }}> {fixedFieldsDom}</div>;
    }

    if (!isDragging && isOver) {
      const border = '2px solid #1291F7';
      if (item.relativeRank < row.relativeRank) {
        innerStyle.borderBottom = border;
      } else {
        innerStyle.borderTop = border;
      }
    }

    const className = classNames({
      'list-view__tbody__row': true,
      'being-dragged': isDragging,
      [row.rowClassName]: !!row.rowClassName,
      'row-draggable': sortable,
      'row-clickable': onRowClick,
      highlighted
    });

    const view = (
      <div className={className} style={innerStyle} onClick={onRowClick ? this.handleRowClick : null} role="button" tabIndex="0">
        {fixedFieldsDom}
        {fixedCellsView}
        {this.renderFields(regularFields)}
        {this.renderDetailView()}
      </div>
    );

    if (connectDropTarget && connectDragPreview) {
      return connectDropTarget(connectDragPreview(view));
    }
    return view;
  }
}

ListViewRow.defaultProps = { fixedColumnCount: 0, header: [] };

ListViewRow.propTypes = {
  row: PropTypes.any,
  onRowClick: PropTypes.func,
  cellWidths: PropTypes.object,
  header: PropTypes.arrayOf(PropTypes.object),
  renderCell: PropTypes.func,
  detailView: PropTypes.bool,
  detailViewKey: PropTypes.string,
  fixedColumnCount: PropTypes.number,
  style: PropTypes.object
};
