import React from 'react';
import PropTypes from 'prop-types';

import FormattedPhoneNumber from '../FormattedPhoneNumber';
import FormattedEmailAddress from '../FormattedEmailAddress';

const PersonPhoneAndEmail = ({ phoneNumber, emailAddress, pendulumEmail, className, emailTarget }) => {
  const isPhoneNumberPresent = phoneNumber && phoneNumber.digits;
  const isEmailPresent = emailAddress && emailAddress.address;

  if (!isPhoneNumberPresent && !isEmailPresent) return null;

  const phone = isPhoneNumberPresent && <FormattedPhoneNumber phoneNumber={phoneNumber} disableLocationType />;
  const separator = isPhoneNumberPresent && isEmailPresent && ' / ';
  const email = isEmailPresent && <FormattedEmailAddress emailAddress={emailAddress} pendulumEmail={pendulumEmail} target={emailTarget} />;

  return (
    <span className={`person-phone-n-email ${className}`}>
      {phone}{separator}{email}
    </span>
  );
};

PersonPhoneAndEmail.defaultProps = { className: '' };
PersonPhoneAndEmail.propTypes = {
  phoneNumber: PropTypes.shape({ digits: PropTypes.string, extension: PropTypes.string }),
  emailAddress: PropTypes.shape({ address: PropTypes.string }),
  pendulumEmail: PropTypes.string,
  className: PropTypes.string
};

export default PersonPhoneAndEmail;
