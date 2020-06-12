import React from 'react';
import PropTypes from 'prop-types';

const FormattedAddress = ({ location, regions, preferred, className }) => {
  if (!location) {
    return null;
  }

  const street = [location.street, location.street2 || location.street_2].filter(a => a).join(' ');
  let locality = [location.city, location.state];

  if (location.postalCode || location.postal_code) {
    locality.push(location.postalCode || location.postal_code);
  }

  locality = locality.filter(a => a).join(', ');

  let region = '';

  if (location.regionId || location.region_id) {
    let regionObj = regions.find(r => parseInt(r.id, 10) === parseInt(location.regionId || location.region_id, 10));

    if (regionObj) region = regionObj.name;
  }

  const address = [street, locality, location.country, region].filter(a => a);
  return (
    <span className={className}>
      {address.length > 0 ? address.reduce((prev, curr, i) => [prev, <br key={i} />, curr]) : null}
      {preferred ? <span className="preferred-icon icon-action-wrapper icon-sm" /> : null}
    </span>
  );
};

FormattedAddress.propTypes = {
  className: PropTypes.string,
  regions: PropTypes.array,
  preferred: PropTypes.bool,
  location: PropTypes.object
};

export default FormattedAddress;
