// @flow

import React from 'react';
import PropTypes from 'prop-types';
import ResizeHandle from '../ResizeHandle';

export default class ListHeaderCell extends React.Component {
  state = { resizing: false, resizedWidth: null };

  onDragStart = (e: SyntheticMouseEvent) => {
    this.setState({ resizing: true });
    // need to set dummy data for FF
    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
  };

  onDrag = (e: SyntheticMouseEvent) => {
    if (this.state.resizing) {
      const width = Math.max(this.getWidthFromMouseEvent(e), this.props.header.minWidth || 20);
      if (this.state.resizedWidth !== width && width < 1000) {
        this.setState({ resizedWidth: width });
      }
    }
  };

  onDragEnd = (e: SyntheticMouseEvent) => {
    const width = Math.max(this.getWidthFromMouseEvent(e), this.props.header.minWidth || 20);
    this.setState({ resizing: false, resizedWidth: null });
    this.props.onResizeEnd(this.props.header.key, Math.floor(width));
  };

  getWidthFromMouseEvent = (e: SyntheticMouseEvent): number => {
    const right =
      e.pageX ||
      (e.touches && e.touches[0] && e.touches[0].pageX) ||
      (e.changedTouches && e.changedTouches[e.changedTouches.length - 1].pageX);
    const { left } = this.thElement.getBoundingClientRect();
    return right - left;
  };

  render() {
    const { resizable, sortable, draggable, title, htmlTitle, key, className } = this.props.header;
    let newClassName = `${className || ''} list-view__thead__cell`;
    const style = {};
    let resizer;
    let onClickHandler;

    if (this.state.resizing && this.state.resizedWidth) {
      style.width = `${this.state.resizedWidth}px`;
    } else if (this.props.cellWidth) {
      style.width = `${Math.max(this.props.cellWidth, 20)}px`;
    }

    if (resizable) {
      resizer = <ResizeHandle onDrag={this.onDrag} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} />;
      newClassName += ' resizable';
    }

    if (sortable) {
      newClassName += ' sortable';
      onClickHandler = this.props.onSort;

      if (this.props.sort === key) {
        newClassName += this.props.sortAscending ? ' sort-ascending' : ' sort-descending';
      }
    }

    if (draggable) {
      newClassName += ' draggable';
    }

    return (
      <div
        style={style}
        data-event-key={key}
        title={htmlTitle || title}
        ref={(th) => {
          this.thElement = th;
        }}
        onClick={onClickHandler}
        className={newClassName}
        role="presentation"
      >
        {title} {resizer}
      </div>
    );
  }
}

ListHeaderCell.propTypes = {
  onResizeEnd: PropTypes.func,
  onSort: PropTypes.func,
  cellWidth: PropTypes.number,
  sortAscending: PropTypes.any,
  sort: PropTypes.string,
  header: PropTypes.object
};
