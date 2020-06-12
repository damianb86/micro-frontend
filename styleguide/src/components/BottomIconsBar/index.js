import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const BottomIconsBar = ({ icons }) => (
  <div className="bottom-icons-bar">
    {icons.map(({ icon, badge }, index) => (
      <div className="bottom-icons-bar__icon" key={index}>
        {icon}
        {badge && <div className="bottom-icons-bar__icon__badge">{badge}</div>}
      </div>
    ))}
  </div>
);

BottomIconsBar.defaultProps = { icons: [] };

BottomIconsBar.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.object,
    badge: PropTypes.object
  }))
};

export default BottomIconsBar;
