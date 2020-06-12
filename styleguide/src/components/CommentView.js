import React, { Component } from 'react';
import ActiveForm from './ActiveForm';
import CKEditor from 'react-ckeditor-wrapper';
import editableView from './EditableView';
import IconLink from '../common/IconLink';
import ReadMore from '../common/ReadMore';
import { FormattedDate } from 'react-intl';
import DeleteConfirmPopup from './DeleteConfirmPopup';

class CommentView extends Component {
  state = { content: '' };

  onChange = content => this.setState({ content: content });
  handleUnconfirm = () => this.setState({ deleteComment: false });
  handleDelete = comment => this.setState({ deleteComment: comment });
  handleSubmit = () => this.props.addComment(this.state.content);

  closeEditor = () => {
    this.props.closeCommentEditor();
    this.setState({ content: '' });
  };

  onEdit = e => {
    const comment = this.props.record;

    if (comment) {
      this.setState({ content: comment.content });
    }
    this.props.onEdit(e);
  };

  handleDeleteConfirm = () => {
    this.props.handleDelete(this.props.record.notableType, this.props.record.id);
    this.setState({ deleteComment: null });
  };

  deleteConfirmPopup() {
    let deleteMessage = 'Are you sure you want to delete this comment?';

    if (this.state.deleteComment) {
      return (
        <DeleteConfirmPopup
          categoryIcon="task"
          onYes={this.handleDeleteConfirm}
          onNo={this.handleUnconfirm}
          isDeleteMode={true}
          title="Delete Confirmation"
        >
          {deleteMessage}
        </DeleteConfirmPopup>
      );
    }

    return null;
  }

  render() {
    const { record } = this.props;

    if (this.props.editMode || !record) {
      return (
        <ActiveForm activeFormButtonSpace="hide">
          <div className="notes__body__list__item__reply-editor clr">
            <CKEditor value={this.state.content} id="note-ckeditor" onChange={this.onChange} />
            <IconLink type="close-circle" className="close-reply-btn" size="sm" onClick={this.closeEditor} />
            <IconLink type="up-arrow" size="sm" className="reply-btn" onClick={this.handleSubmit} />
          </div>
        </ActiveForm>
      );
    }

    return (
      <section>
        <div className="notes__body__list__item__left">
          <span className="user-initials-circle user-initials-circle-sm sky">
            {record.author
              ? record.author.user.name
                  .split(' ')
                  .map(str => str.charAt(0))
                  .join('')
              : null}
          </span>
        </div>
        <div className="notes__body__list__item__right">
          <div className="notes__body__list__item__right__content">
            <ReadMore content={record.content} limitLines={4} />
          </div>
          <section className="notes__body__list__item__right__info">
            <section className="notes__body__list__item__right__info__content">
              <span>{record.author ? record.author.user.name : null}</span>
              <span className="dot-splitter" />
              <span>
                <FormattedDate
                  value={record.createdAt}
                  month="numeric"
                  day="numeric"
                  year="numeric"
                  hour="numeric"
                  minute="numeric"
                />
              </span>
            </section>
            <section className="notes__body__list__item__right__info__actions">
              <IconLink type="close-circle" size="sm" onClick={this.handleDelete} />
            </section>
          </section>
        </div>
        {this.deleteConfirmPopup()}
      </section>
    );
  }
}

export default editableView(CommentView);
