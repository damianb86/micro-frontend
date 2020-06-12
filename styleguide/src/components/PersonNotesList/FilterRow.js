import React from 'react';
import PropTypes from 'prop-types';

import SelectMultipleDropdown from '../SelectMultipleDropdown';
import SelectOptions from '../SelectOptions';
import NoteContextOptions from '../NotePopup/NoteContextOptions';
import { idValueShapePropTypes } from '../../../propTypes';

const FilterRow = ({ users, noteTypes, timestamps, noteContexts, filter, onFilter }) => {
  const buttonText = filter.author_id.length ? `(${filter.author_id.length})` : '';

  return (
    <div className="person-panel-filters">
      <SelectMultipleDropdown
        key="userDropDown"
        name="author_id"
        options={users && Object.keys(users).map(key => ({ id: key, name: users[key].name }))}
        title="All Users"
        itemsSelected={filter.author_id.map(key => ({ id: key, name: users[key].name }))}
        buttonText={`All Users ${buttonText}`}
        onApply={onFilter}
        noButtonBorder={true}
      />
      <SelectOptions
        borderLess
        textTruncate
        name="category_id"
        id="noteTypeDropdown"
        options={[{ id: '', value: 'All Types' }].concat(noteTypes)}
        value={filter.category_id}
        prompt="All Types"
        onSelect={onFilter}
      />
      <SelectOptions
        borderLess
        name="note_created_at"
        id="timeFrameDropdown"
        options={timestamps}
        value={filter.note_created_at}
        prompt="All Time"
        onSelect={onFilter}
      />
      <NoteContextOptions
        borderLess
        name="note_context_id"
        id="noteContextDropdown"
        noteContextOptions={noteContexts}
        value={`${filter.attachedToId}_${filter.attachedToType}`}
        prompt="All Contexts"
        onSelect={onFilter}
        pullRight
        includeAllContextsOption
      />
    </div>
  );
};

FilterRow.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    author_id: PropTypes.array,
    category_id: PropTypes.string,
    note_created_at: PropTypes.string
  }).isRequired,
  users: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })),
  noteTypes: idValueShapePropTypes
};

export default FilterRow;
