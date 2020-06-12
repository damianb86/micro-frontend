import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.scss';

const InformationSection = ({ title, linkUrl, titleClassName, handleEdit, name, children }) => {
  const infoSection = (
    <Fragment>
      <div className={`information-section__title ${titleClassName || ''}`}>{title}</div>
      <div className="information-section__content">{children}</div>
      {handleEdit && (
        <a className="information-section__actions" data-name={name} onClick={handleEdit} role="button" tabIndex={0}>
          Edit
        </a>
      )}
    </Fragment>
  );

  return linkUrl ? (
    <Link to={linkUrl} className="information-section">
      {infoSection}
    </Link>
  ) : <section className="information-section">{infoSection}</section>;
};

InformationSection.propsType = PropTypes.shape({
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  handleEdit: PropTypes.func,
  name: PropTypes.string,
  linkUrl: PropTypes.string,
  children: PropTypes.element
});

export default InformationSection;
