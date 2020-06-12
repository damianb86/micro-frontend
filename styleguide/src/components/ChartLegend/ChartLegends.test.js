import React from 'react';
import { shallow } from 'enzyme';

import ChartLegend from './index';

const legend = [
  { id: 0, label: 'Candidacy Note', key: 'candidacyNoteCount', color: '#FA8B5A' },
  { id: 1, label: 'Deal Note', key: 'dealNoteCount', color: '#52CF86' },
  { id: 2, label: 'Person Note', key: 'personNoteCount', color: '#F8C553' },
  { id: 3, label: 'Project Note', key: 'projectNoteCount', color: '#768CF8' }
];

describe('ChartLegend', () => {
  const wrapper = shallow(<ChartLegend items={legend} />);

  describe('renderer', () => {
    it('should render 4 legends items', () => {
      expect(wrapper.find('.legends__item')).toHaveLength(4);
    });

    it('should render 4 legends colors', () => {
      expect(wrapper.find('.legends__item__color')).toHaveLength(4);
    });

    it('should render 4 legends label', () => {
      expect(wrapper.find('.legends__item__label')).toHaveLength(4);
    });
  });
});
