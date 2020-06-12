import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ClientVisibleBadge from '../Badge/ClientVisibleBadge';

const TextWithBadge = ({ text, visible }) => (
  <Fragment>
    {text}
    {visible && <ClientVisibleBadge />}
  </Fragment>
);

TextWithBadge.defaultProps = { visible: false };

TextWithBadge.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool
};

export default TextWithBadge;
