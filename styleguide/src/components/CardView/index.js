import React from 'react';
import PropTypes from 'prop-types';
import { SortableHandle } from 'react-sortable-hoc';

import IconLink from '../../common/IconLink';
import { elementTypePropTypeChecker } from '../../../propTypes';
import './index.scss';

const DragHandle = SortableHandle(() => (
  <IconLink type="grabber" size="sm" title="Grabber" className="icon-action-wrapper--grabber-card-view" />
));

export const CardViewHeader = ({ title, className, draggable, children, noBorder, onClick }) => (
  <section className={`card-view__header ${noBorder ? 'card-view__header--no-border' : ''} ${className || ''}`}>
    <h3 className="card-view__header__title">{onClick ? <a onClick={onClick}>{title}</a> : title}</h3>
    {draggable ? <DragHandle /> : null}
    {children}
  </section>
);

CardViewHeader.defaultProps = { draggable: false };

CardViewHeader.propTypes = {
  title: PropTypes.any,
  className: PropTypes.string,
  draggable: PropTypes.bool,
  noBorder: PropTypes.bool,
  onClick: PropTypes.func
};

export const CardViewBody = ({ className, scrollable, children }) => (
  <section className={`card-view__body ${scrollable ? 'scrollable' : ''} ${className || ''}`}>{children}</section>
);

CardViewBody.propTypes = { className: PropTypes.string, scrollable: PropTypes.bool };

export const CardViewFooter = ({ footerData }) => (
  <section className="active-projects-footer text-right">
    {footerData.map(d => (
      <section className="active-projects-footer__item" key={d.label}>
        <span className="active-projects-footer__item__label">{d.label}</span>
        <span className="active-projects-footer__item__value">{d.value}</span>
      </section>
    ))}
  </section>
);

CardViewFooter.propTypes = { footerData: PropTypes.array };

export const EmptyCardBody = ({ message, children }) => (
  <section className="empty-card-data">
    <span className="empty-card-data__info">{message}</span>
    {children}
  </section>
);

EmptyCardBody.propTypes = { message: PropTypes.string };

const CardView = ({ title, className, draggable, bodyClassName, header, isHeaderVisible, children }) => {
  if (title) {
    return (
      <section className={`card-view ${className || ''}`}>
        {isHeaderVisible && <CardViewHeader title={title} draggable={draggable}>{header}</CardViewHeader>}
        <CardViewBody className={bodyClassName}>{children}</CardViewBody>
      </section>
    );
  }
  return <section className={`card-view ${className || ''}`}>{children}</section>;
};

CardView.defaultProps = { isHeaderVisible: true };

CardView.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  draggable: PropTypes.bool,
  bodyClassName: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.string, elementTypePropTypeChecker, PropTypes.object]),
  isHeaderVisible: PropTypes.bool
};

export default CardView;
