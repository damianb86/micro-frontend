/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import CardView, { CardViewHeader, CardViewBody } from '../CardView';

import VisibilityOptionsGroup from './VisibilityOptionsGroup';
import './index.scss';

export default class ClientVisibility extends React.Component {
  checkAllSelected = settings => this.props.visibilityFields.every(group => group.values.every(f => settings[f.key]));

  render() {
    const { settings, visibilityFields, description } = this.props;

    const allSelected = this.checkAllSelected(settings);

    return (
      <CardView className={this.props.className || ''}>
        <CardViewHeader title={this.props.title} className={this.props.headerClassName}>
          <a
            className={`pull-right text-strong card-view__header__right__item ${allSelected ? 'link-disabled' : ''}`}
            onClick={allSelected ? null : this.props.handleCheckboxChecked}
            name="selectAll"
          >
            Select All
          </a>
        </CardViewHeader>
        <CardViewBody className="visibility-toggle-form card-view__body--visibility-settings">
          {description ? <p className="visibility-toggle-form__description">{description}</p> : null}
          {visibilityFields.map(group => (
            <VisibilityOptionsGroup
              group={group}
              settings={settings}
              key={group.key}
              handleCheckboxChecked={this.props.handleCheckboxChecked}
            />
          ))}
        </CardViewBody>
      </CardView>
    );
  }
}

ClientVisibility.defaultProps = {
  title: 'Client Visibility',
  visibilityFields: []
};

ClientVisibility.propTypes = {
  handleCheckboxChecked: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  visibilityFields: PropTypes.array,
  title: PropTypes.string
};
