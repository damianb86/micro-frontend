import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const DescriptionView = ({ record, fieldName }) => {
  if (!record) {
    return `No ${fieldName.toLowerCase()} information added yet.`;
    // return <span className="description-view-new">{`+ Add ${fieldName}`}</span>;
  }

  return <div className="description-view" dangerouslySetInnerHTML={{ __html: record }} />;
};

DescriptionView.propTypes = {
  record: PropTypes.string,
  fieldName: PropTypes.string
};

export default DescriptionView;
