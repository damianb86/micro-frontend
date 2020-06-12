import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ErrorBoundary from '../ErrorBoundary';

import ExpandableLinks from './ExpandableLinks';
import CloseIcon from '../../../icons/icon-16-close.svg';
import './index.scss';

class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.state = { expand: false, minimize: false };
  }

  componentDidMount() {
    this.contentRoot = this.contentRoot || document.getElementsByClassName('main-content')[0] || document.body;
    this.contentRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.contentRoot.removeChild(this.el);
  }

  handleMaximize = () => {
    if (this.state.minimize) {
      this.setState({ minimize: false });
    }
  };

  // handleExpand = () => this.setState({ expand: !this.state.expand });
  handleMinimize = () => this.setState({ minimize: true, expand: false });
  handleClose = () => this.setState({ expand: false }, () => this.props.onClose());

  render() {
    const { className, showPanel, expandable, expandLink, children } = this.props;
    const { expand, minimize } = this.state;
    const panelClassName = classNames(
      'side-panel',
      className,
      { show: showPanel, expand, minimize }
    );

    return ReactDOM.createPortal((
      <section className={panelClassName} onClick={this.handleMaximize} role="presentation">
        {minimize && <h3 className="side-panel__title">{this.props.title}</h3>}
        <ul className="side-panel__controls">
          { expandable && <ExpandableLinks expand={expand} expandLink={expandLink} onMinimize={this.handleMinimize} />}
          <li className="side-panel__controls__item close-item">
            <a onClick={this.handleClose} role="button" tabIndex="0">
              <CloseIcon />
            </a>
          </li>
        </ul>
        {!minimize && (
          <section className="side-panel__content">
            <ErrorBoundary>{children}</ErrorBoundary>
          </section>
        )}
      </section>
    ), this.el);
  }
}

SidePanel.defaultProps = {
  expandable: true
};

SidePanel.propTypes = {
  expandable: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  showPanel: PropTypes.bool.isRequired,
  title: PropTypes.string,
  className: PropTypes.string
};

export default SidePanel;
