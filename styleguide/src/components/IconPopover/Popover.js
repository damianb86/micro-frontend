import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loading from '../Loading';

const Popover = ({ loadContent, className }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    loadContent().then((items) => {
      setContent(items);
    });
  }, []);

  return (
    <div className={classNames(className, 'pop-over__wrapper')}>
      {content ?
        <div className="pop-over__wrapper__content">
          {content.map((item, index) => <ItemLink key={index} item={item} />)}
        </div>
        : <Loading />
      }
    </div>
  );
};

const ItemLink = ({ item }) => (
  <div className="pop-over__item"><a href={item.link} title={item.title} target="_blank">{item.title}</a></div>
);

Popover.propTypes = {
  loadContent: PropTypes.func,
  className: PropTypes.string
};

export default Popover;
