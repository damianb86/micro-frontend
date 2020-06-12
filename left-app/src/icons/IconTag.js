import React from 'react';
import PropTypes from 'prop-types';

const IconTag = ({ width, height, fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
    <g>
      <circle className="iconTag" cx="12" cy="12" r="12" fill={fill} />
    </g>
  </svg>
);

IconTag.defaultProps = {
  width: 12,
  height: 12,
  fill: '#99aabb'
};

IconTag.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
};

export default IconTag;
