import React from 'react';
import PropTypes from 'prop-types';

import CheckBox from '../CheckBox';

export default class VisibilityOptionsGroup extends React.Component {
  state = { collapsed: false };

  toggleCollapsed = () => this.setState({ collapsed: !this.state.collapsed });
  renderBody() {
    const { settings } = this.props;
    const subgroups = [];
    let subgroup = { values: [] };

    this.props.group.values.forEach((value) => {
      if (value.subgroup !== subgroup.name) {
        subgroups.push(subgroup);
        subgroup = { values: [], name: value.subgroup };
      }
      subgroup.values.push(value);
    });
    subgroups.push(subgroup);

    return (
      <section className={`visibility-toggle-form__sec__content ${this.props.group.key}`}>
        {subgroups.map((subgroupObj, ind) => (
          <React.Fragment key={ind}>
            {subgroupObj.name ? <h4 className="text-grey text-block visibility-settings-sub-title">{subgroupObj.name}</h4> : null}
            {subgroupObj.values.map(field => (
              <CheckBox
                checked={settings[field.key]}
                onChange={this.props.handleCheckboxChecked}
                key={field.key}
                label={field.label}
                name={field.key}
              />
            ))}
          </React.Fragment>
        ))}
      </section>
    );
  }

  render() {
    return (
      <section className="visibility-toggle-form__sec">
        <div onClick={this.toggleCollapsed} className="pointer-cursor">
          <h4 className="visibility-toggle-form__sec__title">{this.props.group.title}</h4>
          <span className={`icon-action-wrapper ${this.state.collapsed ? 'down-arrow-icon' : 'chevron-up-arrow-icon'} icon-xs`} />
        </div>
        {!this.state.collapsed ? this.renderBody() : null}
      </section>
    );
  }
}

VisibilityOptionsGroup.propTypes = {
  group: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};
