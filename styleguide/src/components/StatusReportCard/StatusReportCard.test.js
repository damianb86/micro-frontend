import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import StatusReportCard from './index';
import { STATUS_REPORT_CARD_ITEMS } from '../../../../__test__/fixtures/common/StatusReportCard';

describe('<StatusReportCard/>', () => {
  let wrapper;
  let props = {
    title: 'Title Test',
    items: STATUS_REPORT_CARD_ITEMS,
    note: STATUS_REPORT_CARD_ITEMS[0].note,
    lastUpdatedNoteId: '13',
    showCandidateSidePanel: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<IntlProvider locale="en"><StatusReportCard {...props} /></IntlProvider>);
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render <StatusReportCard/> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render a CollapsibleCard', () => {
      expect(wrapper.find('CollapsibleCard')).toHaveLength(1);
    });

    it('should render 4 StatusReportCardItem', () => {
      expect(wrapper.find('StatusReportCardItem')).toHaveLength(4);
    });
  });

  describe('StatusReportCardItem', () => {
    let statusReportCardItem;

    beforeAll(() => {
      statusReportCardItem = wrapper.find('StatusReportCardItem').first();
    });

    it('click on avatar should call `showCandidateSidePanel` action', () => {
      const getAttribute = jest.fn();

      statusReportCardItem.find('.status-report-card__item__avatar').simulate('click', { target: { parentElement: { getAttribute } } });
      expect(props.showCandidateSidePanel).toHaveBeenCalledTimes(1);
    });

    it('should render the name', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__name > .row-name').text()).toBe('Baron Davis');
    });

    it('click on name should call `showCandidateSidePanel` action', () => {
      const getAttribute = jest.fn();

      statusReportCardItem.find('.status-report-card__item__info__name > .row-name').simulate('click', { target: { getAttribute } });
      expect(props.showCandidateSidePanel).toHaveBeenCalledTimes(1);
    });

    it('should render 2 linked icons', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__icons a')).toHaveLength(2);
    });

    it('should render 2 linked icons', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__icons a')).toHaveLength(2);
    });

    it('should render a RatingStars', () => {
      expect(statusReportCardItem.find('RatingStars')).toHaveLength(1);
    });

    it('should render the company and position row', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__company-position').text()).toBe('Apple SRL, Vp Product Manager');
    });

    it('should render the phone and email row', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__phone-email').text()).toBe('12315456789 / baron.davis@email.com');
    });

    it('should render the 3 different dates', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__dates__added span').last().text()).toBe('10/10/2018');
      expect(statusReportCardItem.find('.status-report-card__item__info__dates__presented span').last().text()).toBe('11/21/2018');
      expect(statusReportCardItem.find('.status-report-card__item__info__dates__updated span').last().text()).toBe('12/11/2018');
    });

    it('should render a ReadMore', () => {
      expect(statusReportCardItem.find('ReadMore')).toHaveLength(1);
    });

    it('should render the note info row', () => {
      expect(statusReportCardItem.find('.status-report-card__item__note__info').text()).toBe('Call · David Ly · 10/25/2017');
    });

    it('should not display rating if undefined on value is null', () => {
      const statusReportItem = wrapper.find('StatusReportCardItem').last();
      expect(statusReportItem.find('RatingStars')).toHaveLength(0);
    });
  });

  describe('StatusReportCardItemNote', () => {
    let firstStatusReportCardItem;
    let secondStatusReportCardItem;

    beforeAll(() => {
      firstStatusReportCardItem = wrapper.find('StatusReportCardItem').first();
      secondStatusReportCardItem = wrapper.find('StatusReportCardItem').at(1);
    });

    it('should render one card item note for each card item', () => {
      expect(firstStatusReportCardItem.find('StatusReportCardItemNote')).toHaveLength(1);
    });

    describe('when not client user', () => {
      it('should render the make visible option and warning when note is not visible', () => {
        expect(firstStatusReportCardItem.find('StatusReportCardItemNote').find('.status-report-card__item__note__visibility span').first().text()).toBe('Note is not visible.');
        expect(firstStatusReportCardItem.find('StatusReportCardItemNote').find('.status-report-card__item__note__visibility a').first().text()).toBe('Make it visible');
      });

      it('should render the undo option if a note id matches with last updated note id', () => {
        expect(secondStatusReportCardItem.find('StatusReportCardItemNote').find('.status-report-card__item__note__visibility span').first().text()).toBe('Note is visible.');
        expect(secondStatusReportCardItem.find('StatusReportCardItemNote').find('.status-report-card__item__note__visibility a').first().text()).toBe('Undo');
      });
    });

    describe('when client user', () => {
      beforeEach(() => {
        props = { ...props, isClient: true };
        wrapper = mount(<IntlProvider locale="en"><StatusReportCard {...props} /></IntlProvider>);
        firstStatusReportCardItem = wrapper.find('StatusReportCardItem').first();
        secondStatusReportCardItem = wrapper.find('StatusReportCardItem').at(1);
      });

      it('should NOT render the make visible option and warning when note is not visible', () => {
        expect(firstStatusReportCardItem.find('StatusReportCardItemNote').find('.status-report-card__item__note__visibility span')).toHaveLength(0);
        expect(firstStatusReportCardItem.find('StatusReportCardItemNote').find('.status-report-card__item__note__visibility a')).toHaveLength(0);
      });
    });
  });
});
