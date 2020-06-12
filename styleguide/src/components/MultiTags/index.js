import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag';

export default function MultiTags({ items, onRemove }) {
  return (
    <React.Fragment>
      {items.map(i => (
        <Tag multiple key={i.id} id={i.id} onClose={onRemove}>
          {i.name}
        </Tag>
      ))}
    </React.Fragment>
  );
}

MultiTags.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired
};
