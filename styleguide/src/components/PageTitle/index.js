import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.scss';

const PageTitle = ({ title, className }) => {
  if (Array.isArray(title)) {
    return (
      <span className="page-title">
        {title
          .map((t, i) => (
            t.linkUrl ?
              <Link key={i} className={`page-title__text ${className}`} to={t.linkUrl}>{t.key}</Link> :
              <span key={i} className={`page-title__text ${className}`}>{t.key}</span>
          ))
          .reduce((acc, curr, i) => acc.concat(i === 0 ? [curr] : [<span key={`a${i}`} className="page-title__splitter" />, curr]), [])}
      </span>
    );
  }

  return (
    <span className="page-title">
      <span className={`page-title__text ${className}`}>{title}</span>
    </span>
  );
};

PageTitle.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      linkUrl: PropTypes.string
    }))
  ]).isRequired,
  className: PropTypes.string
};

export default PageTitle;
