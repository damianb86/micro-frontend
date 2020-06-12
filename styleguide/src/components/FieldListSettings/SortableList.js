import React from 'react';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import IconLink from '../IconLink';

const DragHandle = SortableHandle(() => <IconLink type="grabber" size="sm" />);

const SortableItem = SortableElement(({ title, eventKey, onRemove }) => {
  return (
    <li className="field-list-settings__selected-list__item">
      <DragHandle />
      <span>{title}</span>
      <IconLink type="close-circle-light" size="xs" value={eventKey} onClick={onRemove} />
    </li>
  );
});

const SortableList = SortableContainer(({ fields, handleRemoveItem }) => {
  return (
    <ul className="list-unstyled">
      {fields.map((field, index) => (
        <SortableItem
          key={field.key}
          index={index}
          title={field.title}
          eventKey={field.key}
          onRemove={handleRemoveItem}
        />
      ))}
    </ul>
  );
});

export default SortableList;
