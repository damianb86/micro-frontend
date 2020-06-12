import React, { Component } from 'react';

import './index.scss';

export default class InformationListItem extends Component {
  render() {
    return (
      <section className={this.props.className || 'horizontal-list'}>
        <section className="horizontal-list__header">
          <span>{this.props.title}</span>
        </section>
        {this.props.value ? (
          <InformationListItemValue>{this.props.value}</InformationListItemValue>
        ) : (
          this.props.children
        )}
      </section>
    );
  }
}

export class InformationListItemValue extends Component {
  render() {
    let className;

    if (this.props.className) className = this.props.className;
    else {
      className = this.props.onEdit ? 'horizontal-list__item__highlight' : 'horizontal-list__item__static';
    }

    return (
      <section className={this.props.containerClassName ? this.props.containerClassName : 'horizontal-list__item'}>
        <section className={className} onClick={this.props.onEdit}>
          <section className="horizontal-list__item__value">{this.props.children}</section>
          {this.props.label ? <span className="horizontal-list__item__label">{this.props.label}</span> : null}
        </section>
      </section>
    );
  }
}
