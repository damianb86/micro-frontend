import React from 'react';
import { shallow } from 'enzyme';
import MultiTags from './index';

describe('<MultiTags />', () => {
  const items = [{ id: 2, name: 'John' }, { id: 3, name: 'Robert' }];
  const onRemove = jest.fn();

  const wrapper = shallow(<MultiTags items={items} onRemove={onRemove} />);

  it('should display list tags', () => {
    expect(wrapper.find('Tag')).toHaveLength(items.length);
  });

  it('should call onRemove prop ', () => {
    wrapper
      .find('Tag')
      .first()
      .dive()
      .find('test-file-stub')
      .first()
      .simulate('click');
    expect(onRemove).toHaveBeenCalled();
  });
});
