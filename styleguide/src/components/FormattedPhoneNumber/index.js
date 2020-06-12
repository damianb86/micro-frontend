import React from 'react';
import PropTypes from 'prop-types';

import LocationType from '../LocationType';
import { getNormalizedDigits } from '../../../helpers/phoneNumber';
import './index.scss';

const FormattedPhoneNumber = ({ phoneNumber, className, locationType }) => {
  const { digits, extension } = phoneNumber;

  if (!digits) {
    return null;
  }

  const normalizedDigits = getNormalizedDigits(digits, extension);

  return (
    <section className={`formatted-phone ${className}`}>
      <a target="_blank" href={`tel:${digits}`} className="formatted-phone__number" onClick={e => e.stopPropagation()}>
        {normalizedDigits}
      </a>
      {locationType && <LocationType type={locationType} />}
    </section>
  );
};

FormattedPhoneNumber.defaultProps = { className: '' };

FormattedPhoneNumber.propTypes = {
  phoneNumber: PropTypes.shape({
    digits: PropTypes.string.isRequired,
    extension: PropTypes.string
  }).isRequired,
  className: PropTypes.string,
  locationType: PropTypes.shape({ name: PropTypes.string })
};

export default FormattedPhoneNumber;
