import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';

import CardViewRowWithAvatar from './index';
import Avatar from '../Avatar';
import projects from '../../../../__test__/fixtures/dashboard/ProjectsWithAvatar';

describe('<CardViewRowWithAvatar />', () => {
  const { id, title, subtitle, label, avatar } = _.first(projects);

  const wrapper = shallow(<CardViewRowWithAvatar key={id} title={title} subtitle={subtitle} label={label} avatar={avatar} />);

  it('should render <CardViewRowWithAvatar /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <CardViewRowWithAvatar /> component with a title', () => {
    expect(wrapper.find('.card-view-row-with-avatar__content__title').text()).toEqual(title);
  });

  it('should render <CardViewRowWithAvatar /> component with a subtitle', () => {
    expect(wrapper.find('.card-view-row-with-avatar__content__subtitle').text()).toEqual(subtitle);
  });

  it('should render <CardViewRowWithAvatar /> component with a data label', () => {
    expect(wrapper.find('.card-view-row-with-avatar__label').text()).toEqual(label);
  });

  it('should render <CardViewRowWithAvatar /> component with an avatar', () => {
    expect(wrapper.containsMatchingElement(Avatar)).toEqual(true);
  });
});
