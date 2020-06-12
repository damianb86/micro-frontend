import React from 'react';
import { mount } from 'enzyme';

import Modal from './index';
import ProgressIndicator from '../ProgressIndicator';

const steps = [
  { id: 1, state: 'active' },
  { id: 2, state: 'inactive' },
  { id: 3, state: 'inactive' },
  { id: 4, state: 'inactive' },
  { id: 5, state: 'inactive' }
];

describe('<Modal />', () => {
  const wrapper = mount(
    <Modal isOpen progressSteps={steps}>
      {' '}
      <p> Children </p>{' '}
    </Modal>
  );

  it('should render modal children', () => {
    expect(wrapper.find('.modal-content')).toHaveLength(1);
    expect(
      wrapper
        .find('.modal-content')
        .first()
        .text()
        .trim()
    ).toEqual('Children');
  });

  it('should render title', () => {
    expect(wrapper.find('.modal-title')).toHaveLength(0);
    wrapper.setProps({ title: 'Title' });
    expect(wrapper.find('.modal-title')).toHaveLength(1);
    expect(
      wrapper
        .find('.modal-title')
        .first()
        .text()
        .trim()
    ).toEqual('Title');
  });

  it('should render progress indicator', () => {
    expect(wrapper.find(ProgressIndicator)).toHaveLength(1);
  });

  it('should render progress indicator with the steps defined', () => {
    expect(wrapper.find(ProgressIndicator).props().steps).toEqual(steps);
  });
});
