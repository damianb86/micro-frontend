import React, { Component } from 'react';
import PersonImage from './PersonImage';
import toggleDropdown from './ToggleDropdown';

export class UserNavigation extends Component {
  renderDropdown() {
    let profileLink;
    let name;
    /* eslint-disable prefer-destructuring */
    if (this.props.currentUser) {
      profileLink = `/firm/users/${this.props.currentUser.id}`;
      name = this.props.currentUser.name;
    } else if (this.props.account) {
      profileLink = '/edit';
      name = this.props.account.name;
    }
    /* eslint-enable prefer-destructuring */

    return (
      <section id="user-menu-list" className="site-dropdown" style={this.props.dropdownVisible ? {} : { display: 'none' }}>
        <section className="site-dropdown__main">
          {this.renderProfileImage('md')}
          <div className="site-dropdown__main__details">
            <span className="text-truncate text-block site-dropdown__main__details__name">{name}</span>
          </div>
        </section>
        <ul className="list-unstyled site-dropdown__list border-top">
          <li className="site-dropdown__list__item">
            <a href={profileLink}>Profile</a>
          </li>
          <li className="site-dropdown__list__item">
            {/* eslint-disable react/jsx-no-target-blank */}
            <a target="_blank" href="http://suppcw.clockworkrecruiting.com" rel="noopener">
              Support
            </a>
            {/* eslint-enable react/jsx-no-target-blank */}
          </li>
          <li className="site-dropdown__list__item">
            <a href={this.props.emailUsLink} target="_blank">
              {' '}
              Email Us{' '}
            </a>
          </li>
        </ul>
        <section className="site-dropdown__single-item border-top">
          <a onClick={this.props.logout} href="/logout">
            Logout
          </a>
        </section>
      </section>
    );
  }

  renderProfileImage(iconType) {
    const person = this.props.currentUser || this.props.account;

    if (person) {
      return <PersonImage person={person} size={iconType === 'md' ? 'medium' : 'icon'} className="site-dropdown__main__logo" />;
    }
  }

  render() {
    return (
      <div>
        <a id="site_header_user_menu" onClick={this.props.showDropdown} role="button" tabIndex={0}>
          {this.renderProfileImage('sm')}
        </a>
        {this.renderDropdown()}
      </div>
    );
  }
}

export default toggleDropdown(UserNavigation);
