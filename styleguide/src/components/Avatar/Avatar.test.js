import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';

import Avatar from './index';
import { getCapitalizedFirstLetter } from '../../../helpers';
import StackedListData from '../../../../__test__/fixtures/common/StackList';
import BirchboxAvatar from '../../../assets/images/birchbox-logo-square.png';

describe('<Avatar /> with image', () => {
  const { title } = _.first(StackedListData);

  // check the image avatar first
  const wrapper = shallow(<Avatar src={BirchboxAvatar} name={title} />);

  it('should render <Avatar /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <Avatar /> component with an image container', () => {
    expect(wrapper.find('.avatar-image')).toHaveLength(1);
  });

  it('should allow type of avatar', () => {
    expect(wrapper.find('img.circle')).toHaveLength(0);
    wrapper.setProps({ type: 'circle' });
    expect(wrapper.find('img.circle')).toHaveLength(1);
  });

  it('should allow size of avatar', () => {
    expect(wrapper.find('img.large')).toHaveLength(0);
    wrapper.setProps({ size: 'large' });
    expect(wrapper.find('img.large')).toHaveLength(1);
  });
});

describe('<Avatar /> without an image and a text monogram ', () => {
  const { title } = _.first(StackedListData);
  const capitalFirstLetter = getCapitalizedFirstLetter(title);

  const wrapper = shallow(<Avatar name={title} />);

  it('should render <Avatar /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <Avatar /> component with a text monogram', () => {
    expect(wrapper.find('.avatar-monogram')).toHaveLength(1);
  });

  it('should render <Avatar /> component with the correct first letter when nameInitials is not present', () => {
    expect(wrapper.find('.avatar-monogram').text()).toEqual(capitalFirstLetter);
  });

  it('should render <Avatar /> component with nameInitials when it is present', () => {
    wrapper.setProps({ nameInitials: 'NA' });
    expect(wrapper.find('.avatar-monogram').text()).toEqual('NA');
  });

  it('should NOT render <Avatar /> component with an image', () => {
    expect(wrapper.find('.avatar-image')).toHaveLength(0);
  });

  it('should allow type of avatar', () => {
    expect(wrapper.find('span.circle')).toHaveLength(0);
    wrapper.setProps({ type: 'circle' });
    expect(wrapper.find('span.circle')).toHaveLength(1);
  });

  it('should allow size of avatar', () => {
    expect(wrapper.find('span.large')).toHaveLength(0);
    wrapper.setProps({ size: 'large' });
    expect(wrapper.find('span.large')).toHaveLength(1);
  });
});
