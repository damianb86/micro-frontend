import React from 'react';
import { bool, array, object, number, string } from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';

import { isMobile } from '../Responsive';
import Loading from '../Loading';
import ListViewRow from './ListViewRow';
import VirtualizedRows from './VirtualizedRows';

const boxShadowSize = 4;

export const ListViewContent = ({
  virtualize,
  rows,
  highlightedRow,
  rowProps,
  optimizeRendering,
  expandedRowIds,
  loading,
  footerView,
  sortable,
  cellWidths,
  virtualScrollBarMargin,
  isMobileResponsive
}) => {
  const RowComponent = sortable ? SortableElement(ListViewRow) : ListViewRow;
  const tableMinWidth = Object.values(cellWidths).reduce((a, b) => a + (b || 0), 0);
  const style = isMobileResponsive && isMobile() ? {} : { minWidth: tableMinWidth };

  return (
    <div style={style}>
      {virtualize ? (
        <VirtualizedRows
          rows={rows}
          highlightedRow={highlightedRow}
          virtualScrollBarMargin={virtualScrollBarMargin}
          isMobileResponsive={isMobileResponsive}
          {...rowProps}
        />
      ) : (
        rows.map((row, index) => (
          <RowComponent
            key={row.id}
            // Adding a margin-top to the first row to prevent the box-shadow from being hidden by the overflow:hidden
            style={index === 0 && `${highlightedRow || ''}` === `${row.id}` ? { marginTop: boxShadowSize } : null}
            optimizeRendering={optimizeRendering}
            row={row}
            detailView={expandedRowIds && expandedRowIds.indexOf(row.id) !== -1}
            index={index}
            highlighted={`${highlightedRow || ''}` === `${row.id}`}
            isMobileResponsive={isMobileResponsive}
            {...rowProps}
          />
        ))
      )}
      {loading ? (
        <div className="table-loader-wrapper">
          <Loading />
        </div>
      ) : null}
      {footerView}
    </div>
  );
};

ListViewContent.defaultProps = {
  rows: [],
  cellWidths: {}
};

ListViewContent.propTypes = {
  virtualize: bool,
  rows: array,
  highlightedRow: string,
  rowProps: object,
  optimizeRendering: bool,
  expandedRowIds: array,
  loading: bool,
  footerView: object,
  sortable: bool,
  cellWidths: object,
  virtualScrollBarMargin: number,
  isMobileResponsive: bool
};

export default ListViewContent;
