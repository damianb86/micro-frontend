import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LocationType from '../LocationType';

import './index.scss';

const FormattedIMAccount = ({ im, locationType, accountType, className, textTruncate }) => {
  const imClass = classNames('formatted-im__username', { truncate: textTruncate });

  if (!im.username) {
    return null;
  }

  return (
    <span className={`formatted-im ${className}`}>
      <span className={imClass} title={im.username}>{im.username}</span>
      {accountType && <LocationType type={accountType} />}
      {locationType && <LocationType type={locationType} />}
    </span>
  );
};

FormattedIMAccount.defaultProps = { textTruncate: false };

FormattedIMAccount.propTypes = {
  className: PropTypes.string,
  locationType: PropTypes.object,
  im: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  textTruncate: PropTypes.bool
};

export default FormattedIMAccount;
