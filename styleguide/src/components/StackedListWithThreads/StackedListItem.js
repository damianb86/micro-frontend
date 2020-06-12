import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from '../Avatar';
import StackedListContent from '../StackedListContent';
import SelectOptions from '../SelectOptions';
import MoreIcon from '../../../icons/icon-16-more.svg';
import IconReply from '../../../icons/icon-12-reply.svg';
import StackedListWithThreads from '.';
import PinIcon from '../../../icons/pin-2.svg';
import { filterMenuOptions, filterMenuOptionsForClient, noteVisibilityContext } from './../../../helpers/stackedListWithThreads';
import { isClient } from './../../../helpers/common';
import { ListItemPropType } from './propTypes';

import './index.scss';

class StackedListItem extends Component {
  state = { showReplyNoteForm: false, showEditNoteForm: false };

  handleMenuSelect = (menu, noteId) => {
    if (menu === 'reply') {
      this.setState({ showReplyNoteForm: true });
      this.props.setAddButtonVisibility(false);
    } else if (menu === 'edit') {
      this.setState({ showEditNoteForm: true });
      this.props.setAddButtonVisibility(false);
    }

    return this.props.onMenuSelect(menu, noteId);
  };

  handleFormClose = () => {
    this.setState({ showReplyNoteForm: false, showEditNoteForm: false });
    this.props.setAddButtonVisibility(true);
  };

  handleReplyMenuSelect = (menu, replyNoteId) => this.props.onMenuSelect(menu, this.props.item.id, replyNoteId);

  render() {
    const { showReplyNoteForm, showEditNoteForm } = this.state;
    const {
      item,
      menuOptions,
      isReply,
      pinnedItemId,
      showRepliesList,
      candidacy,
      projectId,
      setAddButtonVisibility,
      currentUser,
      personId,
      projectType,
      parentsVisibilityContext,
      onToggleShowReplies,
      editForm,
      replyForm
    } = this.props;

    const clientUser = isClient(currentUser);
    const clientId = clientUser ? currentUser.id : null;
    const hasReplies = item.thread && item.thread.length > 0;
    const isReplyVisible = showRepliesList.includes(item.id);
    const filteredMenuOption = clientUser ? filterMenuOptionsForClient(menuOptions, isReply, clientId, item.author.id) : filterMenuOptions(menuOptions, pinnedItemId, item, isReply, projectId, projectType);
    const isParentEditNoteFormVisible = showEditNoteForm && !isReply;
    const isReplyEditNoteFormVisible = (isReply && showEditNoteForm) || showReplyNoteForm;
    const isListItemBlockVisible = !isParentEditNoteFormVisible && !(isReply && showEditNoteForm);
    const isListItemThreadVisible = isReplyVisible && item.thread && item.thread.length > 0 && !isReplyEditNoteFormVisible && !isParentEditNoteFormVisible;
    const visibilityContext = isReply ? parentsVisibilityContext : noteVisibilityContext(item, projectId);

    return (
      <Fragment key={item.id}>
        {isParentEditNoteFormVisible &&
          <div className="stacked-list-with-threads">
            <li className="stacked-list-with-threads__item stacked-list-with-threads__item__no-padding">
              {showEditNoteForm && editForm({ item, onFormClose: this.handleFormClose })}
            </li>
          </div>
        }

        {isListItemBlockVisible &&
          <Fragment>
            {isReply && <div className="stacked-list-with-threads__is-reply"><IconReply /></div>}

            <li className={classNames('stacked-list-with-threads__item', { visible: visibilityContext, 'has-replies': hasReplies })}>
              <StackedListContent
                title={<Title title={item.title} avatar={item.avatar} pinned={pinnedItemId === item.id} />}
                subtitle={item.subtitle}
                tags={item.tags}
                labels={item.labels}
              >
                {item.body}
                {item.attachments && item.attachments.length > 0 &&
                  <div className="stacked-list-with-threads__item__files">
                    {item.attachments.map(attachment => (
                      <a className="stacked-list-with-threads__item__files__file" href={attachment.downloadUrl} key={attachment.id} target="_blank">
                        {attachment.fileFileName}
                      </a>
                    ))}
                  </div>
                }
              </StackedListContent>

              <section className="stacked-list-with-threads__item__action-controls">
                <section className="stacked-list-with-threads__item__action-controls__top">
                  <SelectOptions
                    bsStyle="primary"
                    prompt={<MoreIcon />}
                    id={item.id}
                    options={filteredMenuOption}
                    onSelect={this.handleMenuSelect}
                    borderLess
                    pullRight
                  />
                </section>

                <section className="stacked-list-with-threads__item__action-controls__botton">
                  {hasReplies && !showReplyNoteForm &&
                    <a tabIndex="0" role="button" className="toggle-replies" onClick={() => onToggleShowReplies(item.id)}>
                      {(isReplyVisible) ? 'Hide Replies' : 'Show Replies'}
                    </a>
                  }
                </section>
              </section>
            </li>
          </Fragment>
        }

        {isListItemThreadVisible &&
          <li>
            <StackedListWithThreads
              items={item.thread}
              menuOptions={filteredMenuOption}
              onMenuSelect={this.handleReplyMenuSelect}
              showRepliesList={showRepliesList}
              candidacy={candidacy}
              projectId={projectId}
              personId={personId}
              setAddButtonVisibility={setAddButtonVisibility}
              parentsVisibilityContext={visibilityContext}
              editForm={editForm}
              replyForm={replyForm}
              isReply
            />
          </li>
        }

        {isReplyEditNoteFormVisible &&
          <div className="stacked-list-with-threads reply">
            <div className="stacked-list-with-threads__is-reply"><IconReply /></div>
            <li className="stacked-list-with-threads__item stacked-list-with-threads__is-reply-form">
              {replyForm({ item, isEdit: showEditNoteForm, onFormClose: this.handleFormClose })}
            </li>
          </div>
        }
      </Fragment>
    );
  }
}

StackedListItem.defaultProps = {
  menuOptions: [],
  onMenuSelect: () => null,
  isReply: false,
  showRepliesList: [],
  projectType: {},
  replyForm: () => null,
  editForm: () => null
};

StackedListItem.propTypes = {
  item: PropTypes.shape(ListItemPropType),
  menuOptions: PropTypes.array,
  onMenuSelect: PropTypes.func,
  isReply: PropTypes.bool,
  pinnedItemId: PropTypes.string,
  showRepliesList: PropTypes.array,
  onToggleShowReplies: PropTypes.func,
  candidacy: PropTypes.shape({ id: PropTypes.string }),
  projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setAddButtonVisibility: PropTypes.func,
  projectType: PropTypes.shape({ clientInvite: PropTypes.bool }),
  parentsVisibilityContext: PropTypes.bool,
  editForm: PropTypes.func,
  replyForm: PropTypes.func
};

export default StackedListItem;

export const Title = ({ title, avatar, pinned }) => (
  <div className="stacked-list-with-threads__item__title">
    <div className="stacked-list-with-threads__item__title__avatar">
      {pinned && <PinIcon className="stacked-list-with-threads__item__title__avatar__pin-icon" />}
      <Avatar name={title} src={avatar} type="circle" />
    </div>
    <div className="stacked-list-with-threads__item__title__title">{title}</div>
  </div>
);
