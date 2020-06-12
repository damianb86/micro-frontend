import React from 'react';
import PropTypes from 'prop-types';
import { FormattedPlural as IntlFormattedPlural } from 'react-intl';

const FormattedPlural = ({ number, options }) => (
  <span>
    {number} <IntlFormattedPlural value={number} {...options} />
  </span>
);

// This component use the react-intl libary. For deeper documentation check it
// https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedplural
FormattedPlural.propTypes = {
  number: PropTypes.number.isRequired,
  options: PropTypes.shape({
    other: PropTypes.string.isRequired,
    one: PropTypes.string,
    two: PropTypes.string,
    few: PropTypes.string,
    many: PropTypes.string,
    zero: PropTypes.string
  })
};

export default FormattedPlural;
