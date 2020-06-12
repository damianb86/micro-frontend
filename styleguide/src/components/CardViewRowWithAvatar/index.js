import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import './index.scss';

const CardViewRowWithAvatar = ({ title, subtitle, label, avatar, link = null }) => {
  const CustomTag = link ? 'a' : 'section';
  return (
    <CustomTag className="card-view-row-with-avatar" href={link}>
      <span className="card-view-row-with-avatar__avatar">
        <Avatar src={avatar} name={title} size="large" />
      </span>
      <section className="card-view-row-with-avatar__content">
        <span className="card-view-row-with-avatar__content__title">{title}</span>
        <span className="card-view-row-with-avatar__content__subtitle">{subtitle}</span>
      </section>
      {label && <span className="card-view-row-with-avatar__label">{label}</span>}
    </CustomTag>
  );
};

CardViewRowWithAvatar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  label: PropTypes.string,
  avatar: PropTypes.string,
  link: PropTypes.string
};

export default CardViewRowWithAvatar;
