import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as VirtualizedList } from 'react-window';
import { SortableElement } from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';

import ListViewRow from './ListViewRow';
import { isMacintosh } from '../../../helpers/common';

const boxShadowSize = 4;

const CustomScrollbars = ({ onScroll, forwardedRef, style, children }) => {
  const refSetter = useCallback((scrollbarsRef) => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  }, []);

  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: 'hidden' }}
      onScroll={onScroll}
      renderTrackVertical={props => <div {...props} className="track-vertical" style={{ left: `${window.innerWidth + (style.virtualScrollBarMargin - 14)}px` }} />}
      renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
      renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{ display: 'none' }} />}
      renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{ display: 'none' }} />}
    >
      {children}
    </Scrollbars>
  );
};

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

const VirtualizedRow = ({
  index,
  style,
  data: {
    RowComponent,
    rows,
    optimizeRendering,
    renderRow,
    header,
    cellWidths,
    renderCell,
    sortable,
    expandedRowIds,
    detailViewKey,
    fixedColumnCount,
    onRowClick,
    highlightedRow,
    rowHeight
  }
}) => (
  <RowComponent
    // Adding a margin-top to the first row to prevent the box-shadow from being hidden by the overflow:hidden
    style={index === 0 ? { ...style, marginTop: boxShadowSize, height: rowHeight - boxShadowSize } : style}
    key={rows[index].id}
    optimizeRendering={optimizeRendering}
    row={rows[index]}
    renderRow={renderRow}
    header={header}
    cellWidths={cellWidths}
    renderCell={renderCell}
    sortable={sortable}
    detailView={expandedRowIds && expandedRowIds.indexOf(rows[index].id) !== -1}
    detailViewKey={detailViewKey}
    fixedColumnCount={fixedColumnCount}
    index={index}
    onRowClick={onRowClick}
    highlighted={highlightedRow && (`${highlightedRow}` === `${rows[index].id}`)}
  />
);

const VirtualizedRows = ({ listHeight, rowHeight, overscanCount, virtualScrollBarMargin, ...rest }) => {
  const RowComponent = rest.sortable ? SortableElement(ListViewRow) : ListViewRow;
  // rowPops is passed to each VirtualizedRow component when rendering inside "data" property
  const rowProps = { ...rest, rowHeight, RowComponent };

  return (
    <VirtualizedList
      height={listHeight}
      itemCount={rest.rows.length}
      itemSize={rowHeight}
      itemData={rowProps}
      overscanCount={overscanCount}
      outerElementType={!isMacintosh && CustomScrollbarsVirtualList}
      style={{ virtualScrollBarMargin }}
    >
      {VirtualizedRow}
    </VirtualizedList>
  );
};

VirtualizedRows.propTypes = {
  rows: PropTypes.any,
  listHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  cellWidths: PropTypes.object,
  header: PropTypes.arrayOf(PropTypes.object),
  renderCell: PropTypes.func,
  expandedRowIds: PropTypes.array,
  detailViewKey: PropTypes.string,
  fixedColumnCount: PropTypes.number,
  overscanCount: PropTypes.number,
  virtualScrollBarMargin: PropTypes.number
};

export default VirtualizedRows;
