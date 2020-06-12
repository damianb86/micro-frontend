import React from 'react';
import PropTypes from 'prop-types';

const ListViewHeader = ({ children, fixedCellWidth, headerRef }) => (
  <div
    className="list-view__thead"
    ref={headerRef}
    style={{ paddingLeft: `${fixedCellWidth}px` }}
  >
    {children}
  </div>
);

ListViewHeader.propTypes = {
  children: PropTypes.node,
  headerRef: PropTypes.func,
  fixedCellWidth: PropTypes.number
};

export default ListViewHeader;
