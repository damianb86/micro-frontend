import React from 'react';
import { shallow } from 'enzyme';
import NoteTemplates from './NoteTemplates';
import noteTemplates from '../../../../__test__/fixtures/notes/NoteTemplates';

describe('NoteTemplates', () => {
  const wrapper = shallow(<NoteTemplates onSelect={jest.fn()} options={noteTemplates} />);
  it('should render options dropdown ', () => {
    expect(wrapper.find('SelectOptions')).toHaveLength(1);
  });
});
