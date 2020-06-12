import React, { useState } from 'react';
import className from 'classnames';

import { getCapitalizedFirstLetter, getCapitalizedInitials } from '../../helpers';
import { avatarPropTypes } from './PropTypes';
import './index.scss';

// If the `src` exists, it will always try to render the image
// otherwise it will fallback to the first letter of the name as the monogram
const Avatar = ({ src, name, type, size, useTwoInitials, nameInitials, crossOrigin }) => {
  const [imageError, setImageError] = useState(false);
  const handleError = () => setImageError(true);

  return (
    <React.Fragment>
      {src && !imageError ? (
        <img
          className={className('avatar avatar-image', type, size)}
          src={src}
          alt={name}
          onError={handleError}
          crossOrigin={crossOrigin}
        />
      ) : (
        <span
          title={name}
          className={className('avatar avatar-monogram', type, size, { 'two-letters': (nameInitials && nameInitials.length === 2) || useTwoInitials })}
        >
          {nameInitials || (useTwoInitials ? getCapitalizedInitials(name) : getCapitalizedFirstLetter(name))}
        </span>
      )}
    </React.Fragment>
  );
};

Avatar.defaultProps = {
  type: 'rectangular',
  size: 'medium',
  useTwoInitials: false
};

Avatar.propTypes = avatarPropTypes;

export default Avatar;
