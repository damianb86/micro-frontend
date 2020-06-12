import React from 'react';
import Proptypes from 'prop-types';

import toggleDropdown from '../../common/ToggleDropdown';

import CloseIcon from '../../../icons/icon-16-close.svg';
import AttachmentIcon from '../../../icons/icon-16-attachment.svg';

class AttachmentList extends React.Component {
  handleAttachmentClick = () => {
    if (this.props.dropdownVisible) {
      this.props.hideDropdown(null, true);
    } else if (this.props.attachments.length > 0) {
      this.props.showDropdown();
    } else {
      this.props.openFileSystem();
    }
  }

  handleFileSystemOpener = () => {
    this.props.openFileSystem();
    this.props.hideDropdown(null, true);
  }

  render() {
    const { attachments } = this.props;

    return (
      <section className="text-editor__attachment">
        <a className="text-editor__attachment__link" onClick={this.handleAttachmentClick}>
          {attachments.length > 0 && <span>({attachments.length})</span>}
          <AttachmentIcon className="text-editor__attachment__link__icon" />
        </a>
        {this.props.dropdownVisible && attachments.length > 0 && (
          <section className="text-editor__attachment__dropdown">
            <ul className="text-editor__attachment__dropdown__list">
              {attachments.map(attachment => (
                <React.Fragment key={attachment.name}>
                  <li className="text-editor__attachment__dropdown__list__item">
                    <span className="text-editor__attachment__dropdown__list__item__name">{attachment.name}</span>
                    <CloseIcon className="text-editor__attachment__dropdown__list__item__close" onClick={() => this.props.removedfile(attachment)} />
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <a className="text-editor__attachment__dropdown__add" onClick={this.handleFileSystemOpener}>+ Attach File</a>
          </section>
        )}
      </section>
    );
  }
}

AttachmentList.propTypes = {
  attachments: Proptypes.array.isRequired,
  removedfile: Proptypes.func,
  showDnd: Proptypes.func
};

export default toggleDropdown(AttachmentList, true);
