// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// The list of the propTypes that we want to include in the ResizeHandle div
const knownDivPropertyKeys = ['onDragStart', 'onDragEnd', 'onDrag'];

export default class ResizeHandle extends Component {
  state = { drag: null };

  componentWillUnmount() {
    this.cleanUp();
  }

  onMouseDown = (e: SyntheticMouseEvent) => {
    const drag = this.props.onDragStart(e);

    if (drag === null && e.button !== 0) {
      return;
    }

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchend', this.onMouseUp);
    window.addEventListener('touchmove', this.onMouseMove);

    this.setState({ drag });
  };

  onMouseMove = (e: SyntheticEvent) => {
    if (this.state.drag === null) {
      return;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    this.props.onDrag(e);
  };

  onMouseUp = (e: SyntheticEvent) => {
    this.cleanUp();
    const { drag } = this.state;
    this.setState({ drag: null });
    this.props.onDragEnd(e, drag);
  };

  getKnownDivProps() {
    const result = {};

    for (const property of knownDivPropertyKeys) {
      if (this.props[property]) {
        result[property] = this.props[property];
      }
    }
    return result;
  }

  cleanUp = () => {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchend', this.onMouseUp);
    window.removeEventListener('touchmove', this.onMouseMove);
  };

  style = {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%'
  };

  render(): ?ReactElement {
    return (
      <div
        {...this.getKnownDivProps()}
        style={this.style}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
        className="resizer"
        role="button"
        tabIndex="0"
      />
    );
  }
}

ResizeHandle.propTypes = {
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrag: PropTypes.func,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

ResizeHandle.defaultProps = {
  onDragStart: () => true,
  onDragEnd: () => {},
  onDrag: () => {}
};
