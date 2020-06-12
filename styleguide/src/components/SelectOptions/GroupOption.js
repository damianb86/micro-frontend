import React from 'react';

import SimpleOption from './SimpleOption';

const GroupOption = ({ option, active, assignReference, onKeyPress, onKeyDown, onItemClick }) => (
  <React.Fragment>
    <SimpleOption
      option={{ ...option, type: 'group-title' }}
      active={active}
      assignReference={assignReference}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onItemClick={onItemClick}
    />
    <ul>
      {option.options.map(item => (
        <SimpleOption
          key={item.id}
          option={item}
          active={active}
          assignReference={assignReference}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  </React.Fragment>
);

export default GroupOption;
