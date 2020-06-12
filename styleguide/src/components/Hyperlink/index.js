import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export class Hyperlink extends Component {
  state = { editing: false };

  handleClick = () => this.setState({ editing: true });

  handleBlur = () => this.setState({ editing: false });

  handleChange = e => this.props.onEdit(e.target.value);

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.setState({ editing: false });
    }
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      value,
      ...props
    } = this.props;

    return (
      editable ? (
        <EditableLink
          {...props}
          value={value}
          editing={editing}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      ) : (
        <SimpleLink {...props} value={value} />
      )
    );
  }
}

Hyperlink.defaultProps = {
  target: '_blank',
  className: '',
  editable: false
};

Hyperlink.propTypes = {
  href: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  target: PropTypes.string,
  className: PropTypes.string,
  editable: PropTypes.bool
};

export default Hyperlink;

const SimpleLink = ({ value, target, href, className }) => (
  <a target={target} href={href} className={`hyperlink ${className}`}>
    {value}
  </a>
);

SimpleLink.propTypes = {
  href: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  className: PropTypes.string
};

const EditableLink = ({ value, target, href, className, editing, onClick, onBlur, onChange, onKeyPress }) => (
  <div className="hyperlink__editable" onClick={onClick}>
    {editing ? (
      <input
        className="hyperlink__editing"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      />
    ) : (
      <a
        target={target}
        href={href}
        className={`hyperlink ${className}`}
      >
        {value}
      </a>
    )}
  </div>
);

EditableLink.defaultProps = {
  editing: false,
  onClick: () => {},
  onBlur: () => {},
  onChange: () => {},
  onKeyPress: () => {},
  className: ''
};

EditableLink.propTypes = {
  href: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  editing: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  className: PropTypes.string
};
