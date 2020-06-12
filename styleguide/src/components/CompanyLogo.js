import React from 'react';
import PropTypes from 'prop-types';
import CompanyIcon from '../assets/images/Companies-Grey.svg';
import EditableImageModal from './EditableImageModal';

class CompanyLogo extends React.Component {
  state = { editMode: false };
  handleClick = () => this.setState({ editMode: !this.state.editMode });

  handleSubmit = (e, croppedData = null) => {
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

  renderLogoModal() {
    if (this.state.editMode) {
      return (
        <EditableImageModal
          onClose={this.handleClick}
          handleAddedFile={this.props.handleAddedFile}
          handleRemovedFile={this.props.handleRemovedFile}
          handleSubmit={this.handleSubmit}
          attachable={this.props.company}
          attachableType="company"
          attachment={this.props.company.logo ? this.props.company.logo : null}
          maxSize={20000000}
          loading={this.state.loading}
          errors={this.state.errors ? this.state.errors.map(e => e.title).join('\n') : null}
        />
      );
    }
  }

  render() {
    const { company } = this.props;
    let imageView;
    if (company.logo && company.logo.urls[this.props.size]) {
      imageView = (
        <img
          src={company.logo.urls[this.props.size]}
          alt={company.name}
          onClick={this.props.editable ? this.handleClick : null}
          style={{ maxWidth: '100%' }}
          role="presentation"
        />
      );
    } else {
      imageView = <img src={CompanyIcon} alt={company.name} onClick={this.props.editable ? this.handleClick : null} role="presentation" />;
    }

    return (
      <div>
        {imageView}
        {this.renderLogoModal()}
      </div>
    );
  }
}

CompanyLogo.defaultProps = {
  size: 'large_icon',
  editable: false
};

CompanyLogo.propTypes = {
  company: PropTypes.object.isRequired,
  handleAddedFile: PropTypes.func,
  handleRemovedFile: PropTypes.func,
  editable: PropTypes.bool,
  onSubmit: PropTypes.func,
  size: PropTypes.oneOf(['icon', 'large_icon', 'medium', 'wide_icon', 'wide_large_icon', 'original'])
};

export default CompanyLogo;
