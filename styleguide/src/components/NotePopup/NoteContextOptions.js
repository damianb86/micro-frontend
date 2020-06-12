import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import { defaultMemoize } from 'reselect';

import SelectOptions from '../SelectOptions';

const groupedOptions = defaultMemoize((noteContextOptions, includeAllContextsOption) => {
  const groups = groupBy(noteContextOptions, v => v.attributes.contextGroup);

  const options = ['Person', 'Deals', 'Projects', 'Closed Projects'].map((g) => {
    if (g === 'Person') {
      return (groups[g] && groups[g][0]) ? ({ id: groups[g][0].id, value: groups[g][0].attributes.name }) : ({ id: '', value: 'Person' });
    }

    return {
      id: g.toLowerCase().sub(' ', '_'),
      value: g,
      options: (groups[g] || []).map(({ id, attributes }) => ({ id, value: attributes.name }))
    };
  });

  return includeAllContextsOption ? [{ id: '', value: 'All Contexts' }].concat(options) : options;
});

const NoteContextOptions = ({ noteContextOptions, onSelect, disable, value, prompt, borderLess, name, pullRight, includeAllContextsOption }) => {
  if (!noteContextOptions) return null;

  return (
    <SelectOptions
      id="filed-in-options"
      borderLess={borderLess}
      name={name}
      prompt={prompt}
      value={value}
      options={groupedOptions(noteContextOptions, includeAllContextsOption)}
      onSelect={onSelect}
      disable={disable}
      pullRight={pullRight}
    />
  );
};

NoteContextOptions.propTypes = {
  includeAllContextsOption: PropTypes.bool,
  noteContextOptions: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  disable: PropTypes.bool,
  prompt: PropTypes.string,
  pullRight: PropTypes.bool
};

export default NoteContextOptions;
