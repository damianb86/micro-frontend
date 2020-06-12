import React from 'react';
import PropTypes from 'prop-types';

import EditableImageModal from './EditableImageModal';

import '../styles/user_initials_circle.scss';

class PersonImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editMode: false };
  }

  handleClick() { return this.setState({ editMode: !this.state.editMode }) };

  handleSubmit(e, croppedData = null) {
    this.setState({ loading: true });
    return this.props.onSubmit(e, croppedData).then((response) => {
      if (response.error) {
        this.setState({ errors: response.payload.response.errors, loading: false });
      } else {
        this.setState({ editMode: !this.state.editMode, loading: false });
      }
      return response;
    });
  };

  renderProfileImgModal() {
    if (this.state.editMode) {
      return (
        <EditableImageModal
          onClose={this.handleClick}
          handleAddedFile={this.props.handleAddedFile}
          handleRemovedFile={this.props.handleRemovedFile}
          handleSubmit={this.handleSubmit}
          attachable={this.props.person}
          attachableType="person"
          attachment={this.props.person.profilePicture ? this.props.person.profilePicture : null}
          maxSize={20000000}
          loading={this.state.loading}
          errors={this.state.errors ? this.state.errors.map(e => e.title).join('\n') : null}
        />
      );
    }
  }

  render() {
    const { person } = this.props;
    const nameInitials = person.nameInitials || 'CW';
    let sizeClass;
    let imageView;
    switch (this.props.size) {
      case 'xsmall':
        sizeClass = 'user-initials-circle-xsm';
        break;
      case 'icon':
        sizeClass = 'user-initials-circle-sm';
        break;
      case 'medium':
        sizeClass = 'user-initials-circle-md';
        break;
      case 'large_icon':
        sizeClass = 'user-initials-circle-lg';
        break;
      case 'original':
        sizeClass = 'user-initials-circle-img-mask';
        break;
      default:
        sizeClass = 'user-initials-circle-sm';
        break;
    }

    const pictureSize = this.props.size === 'xsmall' ? 'icon' : this.props.size;
    if (person.profilePicture && person.profilePicture.urls[pictureSize] && this.props.showImage) {
      imageView = (
        <span
          className={`user-initials-circle ${sizeClass}`}
          onClick={this.props.editable ? this.handleClick : null}
          role="button"
          tabIndex="0"
        >
          <img src={person.profilePicture.urls[pictureSize]} alt={nameInitials} style={{ width: '100%' }} />
        </span>
      );
    } else {
      imageView = (
        <span
          className={`user-initials-circle ${sizeClass} ${this.props.className || ''}`}
          onClick={this.props.editable ? this.handleClick : null}
          role="button"
          tabIndex="0"
        >
          {nameInitials}
        </span>
      );
    }

    if (!this.state.editMode) {
      return imageView;
    }

    return (
      <React.Fragment>
        {imageView}
        {this.renderProfileImgModal()}
      </React.Fragment>
    );
  }
}

PersonImage.defaultProps = {
  size: 'icon',
  editable: false,
  showImage: true
};

PersonImage.propTypes = {
  className: PropTypes.string,
  person: PropTypes.object.isRequired,
  showImage: PropTypes.bool,
  handleAddedFile: PropTypes.func,
  handleRemovedFile: PropTypes.func,
  editable: PropTypes.bool,
  onSubmit: PropTypes.func,
  size: PropTypes.oneOf(['xsmall', 'icon', 'large_icon', 'medium', 'wide_icon', 'wide_large_icon', 'original'])
};

export default PersonImage;
