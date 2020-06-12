import React from 'react';
import { string, number, func, oneOfType } from 'prop-types';

import { calculatePercentage } from '../../../../helpers/common';
import './index.scss';

const PercentageWithLink = ({ id, partialCount, totalCount, percentageText, linkText, onClick }) => (
  <div className="percentage-with-link">
    <span>{calculatePercentage(partialCount, totalCount)}% <span>{percentageText}</span></span>
    {linkText && <a role="button" tabIndex={0} className="edit-style" onClick={() => onClick(id)}>{linkText}</a>}
  </div>
);

PercentageWithLink.propTypes = {
  id: oneOfType([number, string]),
  totalCount: number.isRequired,
  partialCount: number.isRequired,
  percentageText: string,
  linkText: string,
  onClick: func
};

export default PercentageWithLink;
