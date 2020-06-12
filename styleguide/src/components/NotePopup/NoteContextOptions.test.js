/* global describe, it, expect, jest, beforeEach */

import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import NoteContextOptions from './NoteContextOptions';

import filedInOptions from '../../../../__test__/fixtures/notes/FiledInOptions';

describe('<NoteContextOptions />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<NoteContextOptions onSelect={() => null} />);
  });

  it('should render', () => {
    expect(wrapper.find('NoteContextOptions')).toHaveLength(1);
  });

  it('should not render DropdownButton', () => {
    expect(wrapper.find('DropdownButton')).toHaveLength(0);
  });

  it('should not render any MenuItem', () => {
    expect(wrapper.find('MenuItem')).toHaveLength(0);
  });

  it('should have disable prop as false', () => {
    expect(wrapper.props().disabled).toBeFalsy();
  });

  it('should have dropup prop as false', () => {
    expect(wrapper.props().dropup).toBeFalsy();
  });

  describe('on noteContextOptions prop set', () => {
    beforeEach(() => {
      wrapper.setProps({ noteContextOptions: Object.values(filedInOptions) });
      wrapper.find('SelectOptions').instance().setState({ open: true });
      wrapper.update();
    });

    it('should render SelectOptions', () => {
      expect(wrapper.find('SelectOptions')).toHaveLength(1);
    });

    it('should render 5 SimpleOption', () => {
      expect(wrapper.find('SimpleOption')).toHaveLength(5);
    });

    describe('when includeAllContextsOption is passed in the props', () => {
      beforeEach(() => {
        wrapper.setProps({ includeAllContextsOption: true });
      });

      it('should render All Contexts as first option', () => {
        expect(wrapper.find('SimpleOption').at(0).text().trim()).toEqual('All Contexts');
      });

      it('should render 6 SimpleOption when includeAllContextsOption is passed in the props', () => {
        expect(wrapper.find('SimpleOption')).toHaveLength(6);
      });
    });

    it('should render GroupOption', () => {
      expect(wrapper.find('GroupOption')).toHaveLength(3);
    });
  });
});
