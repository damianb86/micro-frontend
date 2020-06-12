import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LocationType from '../LocationType';
import { mailto } from '../../../string';

import './index.scss';

const FormattedEmailAddress = ({ emailAddress, pendulumEmail, className, locationType, textTruncate, target }) => {
  const emailTextClass = classNames('formatted-email__address', { truncate: textTruncate });

  return emailAddress && (
    <section className={`formatted-email ${className}`}>
      <a
        title={emailAddress.address}
        target={target}
        href={mailto(emailAddress.address, { bcc: pendulumEmail })}
        className={emailTextClass}
        onClick={e => e.stopPropagation()}
      >
        {emailAddress.address}
      </a>
      {locationType && <LocationType type={locationType} />}
    </section>
  );
};

FormattedEmailAddress.defaultProps = { className: '', textTruncate: false, target: '_blank' };
FormattedEmailAddress.propTypes = {
  emailAddress: PropTypes.shape({ address: PropTypes.string }),
  pendulumEmail: PropTypes.string,
  className: PropTypes.string,
  locationType: PropTypes.shape({ name: PropTypes.string }),
  textTruncate: PropTypes.bool,
  target: PropTypes.string
};

export default FormattedEmailAddress;
