import React from 'react';
import { shallow } from 'enzyme';

import FormDropDowns from './index';
import filedInOptions from '../../../../../__test__/fixtures/notes/FiledInOptions';

describe('<FormDropDowns />', () => {
  let wrapper;

  const props = {
    isReply: false,
    currentUser: { role: 'Admin' },
    dispatch: jest.fn(),
    attachedToId: '1',
    attachedToType: 'candidacy',
    filedInOptions: Object.values(filedInOptions),
    onTemplateSelect: jest.fn(),
    onContextOptionChange: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<FormDropDowns {...props} />);
  });

  describe('renderer', () => {
    it('should not render anything when user is client', () => {
      wrapper.setProps({ currentUser: { role: 'Client' } });
      expect(wrapper).toEqual({});
    });

    it('should not render NoteContextOptions for Ext. Recruiter', () => {
      wrapper.setProps({ currentUser: { role: 'External Recruiter' } });
      expect(wrapper.find('NoteContextOptions')).not.toHaveLength(1);
    });

    it('should render NoteContextOptions for active firm users', () => {
      wrapper.setProps({ currentUser: { role: 'Admin' } });
      expect(wrapper.find('NoteContextOptions')).toHaveLength(1);
    });

    it('should not render NoteContextOptions for reply notes', () => {
      wrapper.setProps({ currentUser: { role: 'Admin' }, isReply: true });
      expect(wrapper.find('NoteContextOptions')).toHaveLength(0);
    });
  });
});
