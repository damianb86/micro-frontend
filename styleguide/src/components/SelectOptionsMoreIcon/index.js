import React from 'react';

import './index.scss';
import MoreIcon from '../../../icons/icon-16-more.svg';
import SelectOptions from '../SelectOptions';

const SelectOptionsMoreIcon = ({ id, options, onSelect, borderLess, pullRight }) => (
  <SelectOptions
    className="select-option-more-icon"
    bsStyle="primary"
    prompt={<MoreIcon />}
    id={id}
    options={options}
    onSelect={onSelect}
    borderLess={borderLess}
    pullRight={pullRight}
  />
);

SelectOptionsMoreIcon.defaultProps = {
  borderLess: true,
  pullRight: false
};

export default SelectOptionsMoreIcon;
