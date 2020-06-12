import React from 'react';
import SelectOptions from '../SelectOptions';

const NoteTemplates = ({ options, onSelect }) => {
  return (
    <span className="text-editor__template cke_toolgroup"><SelectOptions
      bsStyle="primary"
      prompt="Template"
      options={options}
      onSelect={onSelect}
      borderLess
      id="NoteTemplates"
    />
    </span>
  );
};
export default NoteTemplates;
