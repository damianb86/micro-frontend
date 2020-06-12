import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import '../styles/icons.scss';

class IconLink extends React.Component {
  noPushStateActive() {
    // check active in nopushstate
    if (this.props.noPushState) {
      return (
        (this.props.exact && window.location.pathname === this.props.href) ||
        (!this.props.exact && window.location.pathname.startsWith(this.props.href))
      );
    }
    return false;
  };

  render() {
    const LinkIcon = this.props.linkIcon;
    let className = classnames('icon-action-wrapper',
      this.props.className,
      {
        [`${this.props.type}-icon`]: this.props.type,
        [`icon-${this.props.size}`]: this.props.size,
        active: this.props.active
      });

    if (this.props.disabled) {
      return (
        <span className={className} title={this.props.title}>
          {this.props.children}
        </span>
      );
    } else if (this.props.href && this.props.isExternal) {
      return (
        <a href={this.props.href} target={this.props.target || "_blank"} className={className} onClick={this.props.onClick} title={this.props.title}>
          {this.props.children}
        </a>
      );
    } else if (this.props.href && this.props.noPushState) {
      if (this.noPushStateActive()) {
        className += ' active';
      }

      return (
        <a href={this.props.href} className={className} onClick={this.props.onClick} title={this.props.title} style={this.props.style}>
          <span className="icon-wrapper">
            {LinkIcon ? <LinkIcon className={this.noPushStateActive() ? 'active' : ''} /> : null}
          </span>
          {this.props.children}
        </a>
      );
    } else if (this.props.href) {
      return (
        <NavLink to={this.props.href} className={className} onClick={this.props.onClick} title={this.props.title}>
          <span className="icon-wrapper">
            {LinkIcon ? <LinkIcon className={this.noPushStateActive() ? 'active' : ''} /> : null}
          </span>
          {this.props.children}
        </NavLink>
      );
    }

    return (
      <a
        className={className}
        onClick={this.props.onClick}
        title={this.props.title}
        data-value={this.props.value}
        role="button"
        tabIndex={0}
        style={this.props.style}
      >
        {this.props.children}
      </a>
    );
  }
}

export default IconLink;

IconLink.propTypes = {
  href: PropTypes.any,
  children: PropTypes.any,
  isExternal: PropTypes.bool,
  onClick: PropTypes.func,
  exact: PropTypes.any,
  title: PropTypes.string,
  target: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object
};
