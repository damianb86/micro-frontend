import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CompanyIcon from '../assets/images/Companies-Grey.svg';
import toggleDropdown from './ToggleDropdown';

class SwitchFirm extends Component {
  showDropdown () {
    if (this.props.users.length === 0) {
      this.props.fetchAllCurrentAccountUsers();
    }
    
    this.props.showDropdown();
  };

  renderFirmNameWithImage(firm) {
    return (
      <li className="site-dropdown__list__item" key={firm.id} title={firm.name}>
        <a href={`//${firm.domain}`}>
          <img src={firm.imageUrl ? firm.imageUrl : CompanyIcon} alt={`${firm.name}`} className="site-dropdown__list__item__img" />
          <span className="text-truncate text-uppercase">{firm.name}</span>
        </a>
      </li>
    );
  }

  renderOtherFirms(firms) {
    if (firms.length > 0) {
      return <ul className="list-unstyled site-dropdown__list border-top">{firms.map(firm => this.renderFirmNameWithImage(firm))}</ul>;
    }
  }

  renderCurrentFirm(firm) {
    let role;
    const user = this.props.users.find(u => parseInt(u.firmId, 10) === parseInt(firm.id, 10));
    /* eslint-disable prefer-destructuring */
    if (user) role = user.role;
    /* eslint-enable prefer-destructuring */

    return (
      <section className="site-dropdown__main" title={firm.name}>
        <img src={firm.imageUrl ? firm.imageUrl : CompanyIcon} alt={`${firm.name}`} className="site-dropdown__main__logo" />
        <div className="site-dropdown__main__details">
          <span className="text-truncate text-block site-dropdown__main__details__name">{firm.name}</span>
          <span className="text-truncate text-block site-dropdown__main__details__role">{role}</span>
        </div>
      </section>
    );
  }

  renderSettingAndAccountDashboard(currentUser, firms) {
    let firmSettingsLink;
    let accountdashboardLink;

    if (currentUser && ['Admin', 'Partner'].includes(currentUser.role)) {
      firmSettingsLink = (
        <li className="site-dropdown__list__item">
          <a href="/firm/settings">Firm Settings</a>
        </li>
      );
    }

    if (firms.length > 0) {
      accountdashboardLink = (
        <li className="site-dropdown__list__item">
          <a href="#">Accounts Dashboard</a>
        </li>
      );
    }

    if (firmSettingsLink || accountdashboardLink) {
      return (
        <ul className="list-unstyled site-dropdown__list border-top">
          {firmSettingsLink}
          {accountdashboardLink}
        </ul>
      );
    }

    return null;
  }

  render() {
    const currentFirm = this.props.firms[this.props.currentFirmId];
    const otherFirms = this.props.users
      .map(u => this.props.firms[u.firm.id])
      .filter(f => f && parseInt(f.id, 10) !== this.props.currentFirmId);
    const { currentUser } = this.props;

    return (
      <section className="switch-firm">
        <a role="button" tabIndex="0" className="site-brand" onClick={this.showDropdown}>
          <img src="https://testfirma.qa.clkwkdev.com/packs/assets/images/C_Logo_99aabb-ab14c392627dc5611095c65005c418a4.svg" style={{ width: 35, marginLeft: -20 }} />
        </a>
        <section className="site-dropdown" style={this.props.dropdownVisible ? {} : { display: 'none' }}>
          {currentFirm ? this.renderCurrentFirm(currentFirm) : null}
          {this.renderOtherFirms(otherFirms)}
          {this.renderSettingAndAccountDashboard(currentUser, otherFirms)}
        </section>
      </section>
    );
  }
}

SwitchFirm.propTypes = {
  currentFirmId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  users: PropTypes.array,
  firms: PropTypes.object
};

export default toggleDropdown(SwitchFirm);
