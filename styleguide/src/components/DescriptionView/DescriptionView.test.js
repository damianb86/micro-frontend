import React from 'react';
import { shallow } from 'enzyme';

import DescriptionView from './index';

const props = {
  record: null,
  fieldName: "Biography",
}

describe('<DescriptionView />', () => {
  const wrapper = shallow(<DescriptionView {...props} />)

  it('should have <DescriptionView /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  xdescribe('when NO record is present', () => {
    it('should have .description-view-new', () => {
      expect(wrapper.find('.description-view-new')).toHaveLength(1);
    });

    it('span should show `+ Add Biography` label', () => {
      expect(wrapper.find('.description-view-new').text()).toEqual("+ Add Biography");
    });
  });

  describe('when record is present', () => {
    beforeEach(() => {
      wrapper.setProps({ record: "hi there" });
    });

    it('should have <DescriptionView /> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should have 1 div element', () => {
      expect(wrapper.find('.description-view')).toHaveLength(1);
    });
  });
});
