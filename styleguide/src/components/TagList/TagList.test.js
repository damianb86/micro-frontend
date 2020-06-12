import React from 'react';
import { shallow } from 'enzyme';

import TagList from './index';

const tags = [
  { id: "1", name: "java" },
  { id: "1", name: "java" },
];

const props = {
  className: "abc",
  tags
};

describe('<TagList/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TagList {...props} />);
  });

  it('should render <TagList/> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should have 1 section', () => {
    expect(wrapper.find('section')).toHaveLength(1);
  });

  describe('render <Tag /> component', () => {
    it('should render 2 <Tag /> component', () => {
      expect(wrapper.find('Tag')).toHaveLength(2);
    });

    it('should have `java` as the value of first tag', () => {
      expect(wrapper.find('Tag').at(0).children().text()).toEqual('java');
    });
  });

  it('should have `tag-list abc` as the className', () => {
    expect(wrapper.find('section').prop('className')).toEqual('tag-list abc');
  });

  describe('anchor tag', () => {
    beforeEach(() => {
      wrapper.setProps({ onAdd: jest.fn() });
    });

    it('should have 1 anchor tag', () => {
      expect(wrapper.find('.tag-list__add')).toHaveLength(1);
    });

    it('anchor tag should have `+ Add Tag` as the anchor text data', () => {
      expect(wrapper.find('.tag-list__add').children().text()).toEqual('+ Add Tag');
    });
  });
});
