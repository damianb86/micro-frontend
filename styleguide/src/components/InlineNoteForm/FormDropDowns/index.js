import React from 'react';
import PropTypes from 'prop-types';

import SelectOptions from '../../SelectOptions';
import NoteContextOptions from '../../NotePopup/NoteContextOptions';
import { isClient, isActiveFirmUser } from './../../../../helpers/common';

import { filedInOptionsPropType } from './../../../../propTypes/entities';
import { templateOptionsPropType } from './../inlineNoteFormPropTypes';

const FormDropDowns = ({
  isReply,
  currentUser,
  attachedToId,
  attachedToType,
  filedInOptions,
  templateOptions,
  onTemplateSelect,
  onContextOptionChange,
  onSelectType,
  isContextVisible,
  categoriesOptions,
  categoryId
}) => {
  const clientUser = isClient(currentUser);
  if (clientUser) return null;

  return (
    <div className="add-inline-note__dropdowns-row">
      {!clientUser &&
        <SelectOptions
          id="template"
          prompt="Template"
          options={templateOptions || []}
          onSelect={onTemplateSelect}
        />
      }
      <SelectOptions
        id="type"
        name="note_type"
        options={categoriesOptions || []}
        value={categoryId}
        prompt="Type"
        className="add-inline-note__configuration__type"
        onSelect={onSelectType}
        textTruncate
        pullRight
      />
      {isActiveFirmUser(currentUser) && !isReply && isContextVisible &&
        <NoteContextOptions
          name="note_context_id"
          id="noteContextDropdown"
          noteContextOptions={filedInOptions}
          value={`${attachedToId}_${attachedToType}`}
          prompt="All Contexts"
          onSelect={onContextOptionChange}
          pullRight
        />
      }
    </div>
  );
};

FormDropDowns.defaultProps = { isContextVisible: true };

FormDropDowns.propTypes = {
  isReply: PropTypes.bool,
  currentUser: PropTypes.shape({ role: PropTypes.string }),
  attachedToId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  attachedToType: PropTypes.string,
  filedInOptions: filedInOptionsPropType,
  templateOptions: templateOptionsPropType,
  onTemplateSelect: PropTypes.func,
  onContextOptionChange: PropTypes.func,
  isContextVisible: PropTypes.bool
};

export default FormDropDowns;
