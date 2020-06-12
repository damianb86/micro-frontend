/* global describe, it, expect, jest */
import React from 'react';
import { shallow } from 'enzyme';

import StackedListItem, { Title } from './StackedListItem';
import { itemsWithThreads } from '../../../../__test__/fixtures/common/StackList';

import { MENU_OPTIONS } from '../../gridview/constants/notes';
import InlineNoteForm from '../InlineNoteForm';

const item = itemsWithThreads[0];

const props = {
  item,
  menuOptions: MENU_OPTIONS,
  onMenuSelect: jest.fn(),
  showRepliesList: [],
  setAddButtonVisibility: jest.fn(),
  projectId: 100,
  editForm: () => <InlineNoteForm />,
  replyForm: () => <InlineNoteForm />
};

describe('StackedListItem', () => {
  let wrapper;
  let dropDown;

  beforeEach(() => {
    wrapper = shallow(<StackedListItem {...props} />);
    dropDown = wrapper.find('SelectOptions').dive();
    dropDown.setState({ open: true });
    dropDown.update();
  });

  it('should render StackedListItem', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render 1 li with class visible', () => {
    expect(wrapper.find('li')).toHaveLength(1);
    expect(wrapper.find('li.visible')).toHaveLength(1);
  });

  it('should render 1 StackedListContent component', () => {
    expect(wrapper.find('StackedListContent')).toHaveLength(1);
  });

  it('should render 1 a.toggle-replies with the text "Show Replies"', () => {
    expect(wrapper.find('a.toggle-replies')).toHaveLength(1);
    expect(wrapper.find('a.toggle-replies').text()).toBe('Show Replies');
  });

  it('should render 1 Title and 1 Avatar inside', () => {
    expect(wrapper.find('StackedListContent').dive().find('Title')).toHaveLength(1);
    expect(wrapper.find('StackedListContent').dive().find('Title').dive()
      .find('Avatar')).toHaveLength(1);
  });

  it('should render 1 a.stacked-list-with-threads__item__files__file', () => {
    expect(wrapper.find('StackedListContent').dive().find('a.stacked-list-with-threads__item__files__file')).toHaveLength(1);
  });

  it('should render 1 SelectOptions', () => {
    expect(wrapper.find('SelectOptions')).toHaveLength(1);
  });

  it('should render 6 dropdown items', () => {
    expect(dropDown.find('SimpleOption')).toHaveLength(6);
  });

  it('should call handleMenuSelect 1 time with the correct args', () => {
    jest.resetAllMocks();
    const simpleOption = dropDown.find('SimpleOption').first().dive();
    simpleOption.find('li').first().simulate('click', { target: { getAttribute: () => 'reply' } });
    expect(props.onMenuSelect).toHaveBeenCalledTimes(1);
    expect(props.onMenuSelect.mock.calls[0][0]).toBe('reply');
    expect(props.onMenuSelect.mock.calls[0][1]).toBe('1');
  });

  it('should call handleMenuSelect 1 time with the correct args when edit', () => {
    jest.resetAllMocks();
    const simpleOption = dropDown.find('SimpleOption').first().dive();
    simpleOption.find('li').first().simulate('click', { target: { getAttribute: () => 'edit' } });
    expect(props.onMenuSelect).toHaveBeenCalledTimes(1);
    expect(props.onMenuSelect.mock.calls[0][0]).toBe('edit');
    expect(props.onMenuSelect.mock.calls[0][1]).toBe('1');
    expect(wrapper.state().showEditNoteForm).toBe(true);
  });

  it('should show InlineNoteForm when showReplyNoteForm is true', () => {
    wrapper.setState({ showReplyNoteForm: true });
    expect(wrapper.find('InlineNoteForm')).toHaveLength(1);
  });

  it('should show NOT InlineNoteForm when showReplyNoteForm is false', () => {
    wrapper.setState({ showReplyNoteForm: false });
    expect(wrapper.find('InlineNoteForm')).toHaveLength(0);
  });

  describe('when the note does not belong to the specific project', () => {
    beforeEach(() => {
      wrapper.setProps({ projectId: 101 });
    });

    it('should render 4 dropdown items', () => {
      expect(wrapper.find('SelectOptions').dive().find('SimpleOption')).toHaveLength(4);
    });
  })

  describe('Replies opened', () => {
    beforeEach(() => {
      wrapper = shallow(<StackedListItem {...props} />);
      wrapper.setProps({ showRepliesList: ['1'] });
    });

    it('should render 2 li', () => {
      expect(wrapper.find('li')).toHaveLength(2);
    });

    it('should render 1 a with the text "Hide Replies"', () => {
      expect(wrapper.find('a.toggle-replies').text()).toBe('Hide Replies');
    });
  });

  describe('Replies closed', () => {
    beforeAll(() => {
      wrapper = shallow(<StackedListItem {...props} />);
      wrapper.setProps({ showRepliesList: [] });
    });

    it('should render 1 li', () => {
      expect(wrapper.find('li')).toHaveLength(1);
    });

    it('should render 1 a with the text "Show Replies"', () => {
      wrapper.setState({ replyNoteParentId: null });
      expect(wrapper.find('a.toggle-replies').text()).toBe('Show Replies');
    });
  });

  describe('is Reply', () => {
    beforeEach(() => {
      wrapper = shallow(<StackedListItem {...props} />);
      wrapper.setProps({ isReply: true });
    });

    it('should render 1 div.stacked-list-with-threads__is-reply', () => {
      expect(wrapper.find('div.stacked-list-with-threads__is-reply')).toHaveLength(1);
    });

    it('should have 1 SelectOptions', () => {
      expect(wrapper.find('SelectOptions')).toHaveLength(1);
    });
  });

  describe('interaction/function', () => {
    describe('handleMenuSelect fn', () => {
      it('should change state only when menu is reply', () => {
        wrapper.setState({ replyNoteParentId: null });
        wrapper.instance().handleMenuSelect('edit', '111_candidacyNote');
        expect(wrapper.state().replyNoteParentId).toBeNull();
      });

      it('should call onMenuSelect props', () => {
        jest.resetAllMocks();
        wrapper.instance().handleMenuSelect('edit', '111_candidacyNote');
        expect(props.onMenuSelect).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('renderer', () => {
    beforeEach(() => {
      wrapper = shallow(<StackedListItem {...props} />);
    });

    describe('when reply to a note', () => {
      beforeEach(() => {
        wrapper.setState({ showReplyNoteForm: true });
      });

      it('should not show hide/show reply option', () => {
        expect(wrapper.find('a.toggle-replies')).toHaveLength(0);
      });

      it('should not show other reply thread when replying', () => {
        expect(wrapper.find('.stacked-list-with-threads__is-reply .stacked-list-content')).toHaveLength(0);
      });

      it('should show reply form', () => {
        expect(wrapper.find('.stacked-list-with-threads__is-reply-form')).toHaveLength(1);
      });

      it('should render candidate note form', () => {
        expect(wrapper.find('InlineNoteForm')).toHaveLength(1);
      });
    });

    describe('when edit a note', () => {
      beforeEach(() => {
        wrapper.setState({ showEditNoteForm: true });
      });

      it('should not show the item block', () => {
        expect(wrapper.find('.stacked-list-content')).toHaveLength(0);
      });

      it('should not show the reply thread', () => {
        expect(wrapper.find('.stacked-list-with-threads__is-reply')).toHaveLength(0);
      });

      it('should render candidate note form', () => {
        expect(wrapper.find('InlineNoteForm')).toHaveLength(1);
      });
    });

    describe('when edit a reply', () => {
      beforeEach(() => {
        wrapper.setState({ showEditNoteForm: true });
        wrapper.setProps({ isReply: true });
      });

      it('should not show hide/show reply option', () => {
        expect(wrapper.find('a.toggle-replies')).toHaveLength(0);
      });

      it('should not show other reply thread when replying', () => {
        expect(wrapper.find('.stacked-list-with-threads__is-reply .stacked-list-content')).toHaveLength(0);
      });

      it('should show reply form', () => {
        expect(wrapper.find('.stacked-list-with-threads__is-reply-form')).toHaveLength(1);
      });

      it('should render candidate note form', () => {
        expect(wrapper.find('InlineNoteForm')).toHaveLength(1);
      });
    });

    describe('when view', () => {
      beforeEach(() => {
        wrapper.setState({ showEditNoteForm: false, showReplyNoteForm: false });
        wrapper.setProps({ isReply: false });
      });

      it('should show item block', () => {
        expect(wrapper.find('.stacked-list-with-threads__item')).toHaveLength(1);
      });

      it('should show hide/show reply option', () => {
        expect(wrapper.find('a.toggle-replies')).toHaveLength(1);
      });

      it('should not show replies when showRepliesList is not passed in props', () => {
        expect(wrapper.find('.stacked-list-with-threads__is-reply .stacked-list-content')).toHaveLength(0);
      });

      it('should render no candidate note form', () => {
        expect(wrapper.find('InlineNoteForm')).toHaveLength(0);
      });
    });
  });
});

describe('<Title /> component', () => {
  const wrapper = shallow(<Title title="Ram Rahim" />);

  it('should render an <Avatar /> Component', () => {
    expect(wrapper.find('Avatar')).toHaveLength(1);
  });

  it('should show PinIcon if pinned is true', () => {
    wrapper.setProps({ pinned: true });
    expect(wrapper.find('.stacked-list-with-threads__item__title__avatar__pin-icon')).toHaveLength(1);
  });
});
