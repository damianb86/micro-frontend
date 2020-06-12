/* global describe, it, expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';

import SidePanel from './index';

describe('SidePanel', () => {
  let container = document.createElement("div");
  const title = 'David Ly';
  const mockFn = jest.fn();
  const wrapper = shallow(<SidePanel showPanel={true} title={title} onClose={mockFn} />, {attachTo: container});

  afterAll(() => ReactDOM.unmountComponentAtNode(container));

  it('should render side panel', () => {
    expect(wrapper.find('.side-panel')).toHaveLength(1);
  });

  it('should render title on side panel when it is minimized', () => {
    wrapper.setState({ minimize: true });
    expect(wrapper.find('.side-panel__title').text()).toEqual(title);
  });

  xit('should expand the panel when clicked on expand icon', () => {
    wrapper.find('ExpandableLinks').shallow().find('.expand-collapse-item a').simulate('click');
    expect(wrapper.state().expand).toEqual(true);
  });

  it('should collapse the panel when clicked on collapse icon', () => {
    wrapper.find('ExpandableLinks').shallow().find('.expand-collapse-item a').simulate('click');
    expect(wrapper.state().expand).toEqual(false);
  });

  it('should minimize the panel when clicked on minimize icon', () => {
    wrapper.find('ExpandableLinks').shallow().find('.minimize-item a').simulate('click');
    expect(wrapper.state().minimize).toEqual(true);
  });

  it('should maximize the panel when clicked on minimized panel', () => {
    wrapper.find('.side-panel').simulate('click');
    expect(wrapper.state().minimize).toEqual(false);
  });

  it('should close the panel when clicked on close icon', () => {
    wrapper.find('.close-item a').simulate('click');
    expect(wrapper.state().expand).toEqual(false);
    expect(mockFn).toHaveBeenCalled();
  });

  it('should show the panel', () => {
    wrapper.setProps({ showPanel: true });
    expect(wrapper.find('.side-panel').hasClass('show')).toEqual(true);
  });
});
