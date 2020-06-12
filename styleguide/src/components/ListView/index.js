import React from 'react';
import PropTypes from 'prop-types';
import scrollbarWidth from 'scrollbar-width';
import { SortableElement, arrayMove } from 'react-sortable-hoc';
import classNames from 'classnames';

import ListViewHeader from './ListViewHeader';
import SortableListViewHeader from './SortableListViewHeader';

import ListHeaderCell from './ListHeaderCell';
import ListViewContent from './ListViewContent';

import './index.scss';
import '../../../styles/pagination.scss';
import { ROW_HEIGHT } from '../../gridview/constants/list';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    const virtualScrollBarMargin = 0;
    const cellWidths = this.props.header.reduce((acc, h) => {
      acc[h.key] = h.width;
      return acc;
    }, {});
    this.state = { cellWidths, virtualScrollBarMargin };
  }

  componentDidMount() {
    this.recalculateTableHeight();
    this.recalculateCellWidths();
    window.addEventListener('resize', this.onResize);
    if (this.props.setParent && this.tbodyElement) {
      this.props.setParent(this.tbodyElement);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rows !== this.props.rows) {
      this.recalculateTableHeight();
    }

    if (prevProps.header !== this.props.header) {
      this.recalculateCellWidths();
    }
    if (this.props.setParent && this.tbodyElement) {
      this.props.setParent(this.tbodyElement);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.recalculateCellWidths();
    this.recalculateTableHeight();
  }

  onColumnResizeEnd = (key, width) => {
    const cellWidths = { ...this.state.cellWidths, [key]: width };
    if (this.props.handleWidthChange) {
      this.props.handleWidthChange(cellWidths);
    } else {
      this.setState({ cellWidths });
    }
  };

  onBodyScroll = () => {
    this.theadElement.style.marginLeft = `${-this.tbodyElement.scrollLeft}px`;
    this.setState({ virtualScrollBarMargin: this.tbodyElement.scrollLeft });
    this.positionColumns();

    if (!this.props.loadMore || this.props.loading || this.loadMoreRequest) return;

    const scrollSpaceRemaining = this.tbodyElement.scrollHeight - this.tbodyElement.scrollTop - this.tbodyElement.clientHeight;
    if (scrollSpaceRemaining < 20) {
      this.loadMoreRequest = true;
      this.props.handleLoadMore().then((data) => {
        this.loadMoreRequest = false;
        return data;
      });
    }
  };

  getNodeHeight(ref) {
    if (!ref) {
      return 0;
    }
    const clientRect = ref.getBoundingClientRect();
    const tableSpace = document.documentElement.clientHeight - clientRect.top - 2;
    return Math.max(100, Math.ceil(tableSpace));
  }

  defaultSortDirection = (field) => {
    const header = this.props.header.filter(h => h.key === field)[0];
    return (header && header.defaultAscendingSort !== undefined) ? header.defaultAscendingSort : true;
  }

  handleSort = ev =>
    this.props.handleSort(
      ev.currentTarget.dataset.eventKey,
      this.props.sortField !== ev.currentTarget.dataset.eventKey ? this.defaultSortDirection(ev.currentTarget.dataset.eventKey) : !this.props.sortAscending
    );

  recalculateCellWidths() {
    if (this.container) {
      const cellWidths = this.props.header.reduce((acc, h) => {
        acc[h.key] = h.width || this.state.cellWidths[h.key];
        return acc;
      }, {});

      const clientRect = this.container.getBoundingClientRect();
      const tableSpace = Math.max(clientRect.width, this.props.minimumWidth || 0) - scrollbarWidth() - 1;
      const availableSpace = tableSpace - Object.values(cellWidths).reduce((a, w) => a + (w || 0), 0);
      const headersWithWidthRatio = this.props.header.filter(h => h.widthRatio || !h.width);
      const widthParts = availableSpace / headersWithWidthRatio.reduce((sum, h) => sum + (h.widthRatio || 1), 0);

      headersWithWidthRatio.forEach((header) => {
        if (!header.resizable || this.state.cellWidths[header.key]) {
          cellWidths[header.key] = Math.max(Math.floor(widthParts * (header.widthRatio || 1)) + (cellWidths[header.key] || 0),
            header.minWidth || 20);
        }
      });
      this.setState({ cellWidths });
    }
  }

  recalculateTableHeight() {
    if (this.props.height) {
      if (this.props.height === 'auto') {
        this.tableHeight = this.props.height;
      } else if (this.theadElement) {
        const clientRect = this.theadElement.getBoundingClientRect();
        this.tableHeight = this.props.height - clientRect.height - 1;
        if (this.tbodyElement) {
          this.tbodyElement.style.height = `${this.tableHeight}px`;
        }
      }
    } else if (this.tbodyElement) {
      if (this.props.maxHeight) {
        this.tbodyElement.style.maxHeight = `${this.props.maxHeight}px`;
      } else {
        this.tableHeight = this.getNodeHeight(this.tbodyElement);
        this.tbodyElement.style.height = `${this.tableHeight}px`;
      }
      this.tbodyElement.style.overflow = 'auto';
    }
  }

  positionColumns = () => {
    if (!this.tbodyElement) {
      return;
    }

    const { scrollLeft } = this.tbodyElement;
    const styleLeft = `${scrollLeft}px`;
    this.tbodyElement.querySelectorAll('.list-view__tbody__row > .fixed').forEach((e) => {
      e.style.left = styleLeft;
    });
    this.theadElement.querySelectorAll('.fixed').forEach((e) => {
      e.style.left = styleLeft;
    });
  };

  handleHeaderSortEnd = ({ oldIndex, newIndex }) => {
    const sortedResults = arrayMove(this.props.header, oldIndex, newIndex);
    this.props.onHeaderSortEnd(sortedResults);
  }

  renderBody() {
    const {
      loading,
      rows,
      renderRow,
      header,
      emptyMessage,
      renderCell,
      cellClassName,
      sortable,
      detailViewKey,
      fixedColumnCount,
      onRowClick,
      paginationView,
      expandedRowIds,
      optimizeRendering,
      virtualize,
      virtualizedRowHeight,
      virtualizedOverscanCount,
      highlightedRow,
      isMobileResponsive
    } = this.props;
    const { cellWidths } = this.state;

    if (!loading && rows.length === 0) {
      return (
        <div className="list-view__tbody">
          <div className="empty-message">{emptyMessage}</div>
        </div>
      );
    }

    const style = {};

    if (this.tableHeight) {
      style.overflow = 'auto';
      style.height = `${this.tableHeight}px`;
    }

    let footerView = null;

    if (paginationView) {
      footerView = paginationView;
    }

    const rowProps = {
      header,
      renderRow,
      renderCell,
      cellWidths,
      sortable,
      fixedColumnCount,
      detailViewKey,
      onRowClick,
      overscanCount: virtualizedOverscanCount,
      rowHeight: virtualizedRowHeight,
      listHeight: this.getNodeHeight(this.tbodyElement)
    };

    return (
      <div
        className={classNames('list-view__tbody', cellClassName, { virtualized: virtualize })}
        ref={(tbody) => { this.tbodyElement = tbody; }}
        style={style}
        onScroll={this.onBodyScroll}
      >
        <ListViewContent
          virtualize={virtualize}
          rows={rows}
          cellWidths={cellWidths}
          highlightedRow={highlightedRow}
          rowProps={rowProps}
          optimizeRendering={optimizeRendering}
          expandedRowIds={expandedRowIds}
          loading={loading}
          footerView={footerView}
          sortable={sortable}
          virtualScrollBarMargin={this.state.virtualScrollBarMargin}
          isMobileResponsive={isMobileResponsive}
        />
      </div>
    );
  }

  renderHeaders = (headers) => {
    let SortableHeaderCell;

    if (this.props.headerSortable) {
      SortableHeaderCell = SortableElement(ListHeaderCell);
    }

    return headers.map((h, i) => {
      const HeaderComponent = (h.draggable && SortableHeaderCell) || ListHeaderCell;

      return (
        <HeaderComponent
          key={h.key}
          header={h}
          index={i}
          sort={this.props.sortField}
          onSort={this.handleSort}
          cellWidth={this.state.cellWidths[h.key]}
          onResizeEnd={this.onColumnResizeEnd}
          sortAscending={this.props.sortAscending}
        />
      );
    });
  };

  render() {
    const { header, className, noOfFixedColumns, headerSortable, showHeader, helperClass, isMobileResponsive } = this.props;

    const style = { overflow: 'hidden' };
    const regularFields = header.slice();
    const fixedFields = regularFields.splice(0, noOfFixedColumns);
    let fixedCellsView;
    const fixedCellWidth = fixedFields.reduce((t, h) => t + this.state.cellWidths[h.key], 0);

    if (fixedFields.length > 0) {
      fixedCellsView = <div className="fixed">{this.renderHeaders(fixedFields)}</div>;
    }

    const Header = headerSortable ? SortableListViewHeader : ListViewHeader;

    return (
      <div
        ref={(container) => {
          this.container = container;
        }}
        className={classNames('list-view', className, { 'is-mobile-responsive': isMobileResponsive })}
      >
        {showHeader && (
          <div style={style}>
            <Header
              fixedCellWidth={fixedCellWidth}
              headerRef={(thead) => {
                this.theadElement = thead;
              }}
              pressDelay={1000}
              regularFields={regularFields}
              onSortEnd={this.handleHeaderSortEnd}
              axis="x"
              helperClass={helperClass}
            >
              {fixedCellsView}
              {this.renderHeaders(regularFields)}
            </Header>
          </div>
        )}
        {this.renderBody()}
      </div>
    );
  }
}

ListView.defaultProps = {
  showHeader: true,
  optimizeRendering: false,
  fixedColumnCount: 0,
  virtualize: false,
  virtualizedRowHeight: ROW_HEIGHT,
  virtualizedOverscanCount: 15,
  isMobileResponsive: false
};

ListView.propTypes = {
  className: PropTypes.string,
  header: PropTypes.array.isRequired,
  showHeader: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  loading: PropTypes.bool,
  handleSort: PropTypes.func,
  sortField: PropTypes.string,
  sortAscending: PropTypes.any,
  loadMore: PropTypes.bool,
  handleLoadMore: PropTypes.func,
  paginationView: PropTypes.any,
  renderRow: PropTypes.func,
  emptyMessage: PropTypes.string,
  renderCell: PropTypes.func,
  minimumWidth: PropTypes.number,
  cellClassName: PropTypes.string,
  expandedRowIds: PropTypes.array,
  detailViewKey: PropTypes.string,
  fixedColumnCount: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.number,
  handleWidthChange: PropTypes.func,
  optimizeRendering: PropTypes.bool,
  virtualize: PropTypes.bool,
  virtualizedRowHeight: PropTypes.number,
  virtualizedOverscanCount: PropTypes.number,
  onHeaderSortEnd: PropTypes.func,
  isMobileResponsive: PropTypes.bool
};
