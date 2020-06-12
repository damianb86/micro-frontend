import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useDelayedToggle from '../../../hooks/useDelayedToggle';
import { truncate } from '../../../helpers/stringHelpers';
import './index.scss';

export const CardMarketplace = ({ id, name, description, link, imageSrc, integrationStatus, keyInfo, onAction }) => {
  const [isHover, setHoverOn, setHoverOff] = useDelayedToggle(false, 0, 200);
  const actionText = { disable: 'Enable Integration', waiting: 'Requested', enable: 'Generate Key' };

  const handleAction = () => {
    if (integrationStatus !== 'waiting') {
      onAction(id);
    }
  };

  return (
    <section className={classNames('card-action', integrationStatus)} onMouseLeave={setHoverOff}>
      {!isHover ? (
        <div className="card-action__default">
          <div className="card-action__image">
            <img src={imageSrc} alt="Logo" onMouseEnter={setHoverOn} onMouseLeave={setHoverOff} />
          </div>
          {keyInfo ? (
            <Fragment>
              <div className="card-action__status">
                <div className="card-action__status__text">
                  <span>Status</span>
                  <span>{keyInfo.status}</span>
                </div>
                <div className="card-action__status__date">
                  <span>Active Date</span>
                  <span>{keyInfo.activeDate}</span>
                </div>
              </div>
              <div className="card-action__button delete">
                <a onClick={handleAction} role="button" tabIndex="0">Delete</a>
              </div>
            </Fragment>
          ) : (
            <div className="card-action__button">
              <a onClick={handleAction} role="button" tabIndex="0">{actionText[integrationStatus]}</a>
            </div>
          )}
        </div>
      ) : (
        <div className="card-action__hover">
          <h3>{name}</h3>
          <p>{truncate(description, 260)}</p>
          <div><a href={link} target="_blank">More Info &gt;</a></div>
        </div>
      )}
    </section>
  );
};

CardMarketplace.defaultProps = {
  integrationStatus: 'disable',
  keyInfo: null
};

CardMarketplace.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  integrationStatus: PropTypes.oneOf(['disable', 'waiting', 'enable']),
  keyInfo: PropTypes.shape({
    status: PropTypes.string,
    activeDate: PropTypes.string
  })
};

export default CardMarketplace;
