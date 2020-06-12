import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import difference from 'lodash/difference';
import union from 'lodash/union';

import Tag from '../Tag';
import './index.scss';

const TagList = ({ tags, className, onAdd, onRemove, highlightNews, initialTagsIds }) => {
  const [oldTagsIds, setOldTagsIds] = useState(initialTagsIds);
  const [newTagsIds, setNewTagsIds] = useState([]);

  useEffect(() => {
    const currentTagsIds = tags.map(({ id }) => id);

    setNewTagsIds(difference(currentTagsIds, oldTagsIds));
    setOldTagsIds(union(currentTagsIds, oldTagsIds));
  }, [tags]);

  const handleRemove = ({ currentTarget: { dataset: { id } } }) => {
    setOldTagsIds(oldTagsIds.filter(oldId => id !== `${oldId}` && !newTagsIds.includes(oldId)));
    onRemove(id);
  };

  const style = classNames('tag-list', { [className]: className }, { 'highlight-news': highlightNews });

  return (
    <section className={style}>
      {tags.map(({ id, name, ...props }) => (
        <Tag
          key={id}
          id={id}
          className={classNames('tag-list__item', { 'tag-list__item__blue': newTagsIds.includes(id) })}
          onClose={onRemove && handleRemove}
          {...props}
        >
          {name}
        </Tag>
      ))}
      {onAdd && <a className="tag-list__add" onClick={onAdd} role="button" tabIndex="0">+ Add Tag</a>}
    </section>
  );
};

TagList.defaultProps = {
  tags: [],
  initialTagsIds: [],
  className: '',
  highlightNews: false,
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    onClose: PropTypes.func,
    multiple: PropTypes.bool,
    color: PropTypes.string
  })),
  initialTagsIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  className: PropTypes.string,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  highlightNews: PropTypes.bool
};

export default TagList;
