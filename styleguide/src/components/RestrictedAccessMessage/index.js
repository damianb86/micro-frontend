import React from 'react';
import PropTypes from 'prop-types';

import LockIcon from '../../../icons/icon-24-lock.svg';

import './index.scss';

const RestrictedAccessMessage = ({ message, button }) => (
  <section className="restricted-access-message">
    <LockIcon className="restricted-access-message__icon" />
    <span className="restricted-access-message__title">You don&#39;t have access to this page.</span>
    <p className="restricted-access-message__description">{message}</p>
    {button ? (
      <a href={button.url} className="pri-button">
        {button.name}
      </a>
    ) : null}
  </section>
);

RestrictedAccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
  button: PropTypes.object
};

export default RestrictedAccessMessage;
