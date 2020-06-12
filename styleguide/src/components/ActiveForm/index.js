import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';
import '../../styles/form.scss';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default class ActiveForm extends React.Component {
  state = { loading: false };

  componentDidMount() {
    this._isMounted = true;

    this.setInnerHeightProperty();
    window.addEventListener('resize', this.setInnerHeightProperty);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.setInnerHeightProperty);
  }

  setInnerHeightProperty() {
    document.documentElement.style.setProperty('--innerHeight', `${window.innerHeight}px`);
  }

  handleAction = (ev, action = this.props.onSubmit) => {
    if (action && !this.state.loading) {
      const handler = action(ev);
      if (isPromise(handler)) {
        this.setState({ loading: true });
        handler.then(
          (v) => {
            if (this._isMounted) {
              this.setState({ loading: false });
            }
            return v;
          },
          (e) => {
            if (this._isMounted) {
              this.setState({ loading: false });
            }
            throw e;
          }
        );
      }
    }
    ev.preventDefault();
  };

  renderActionButtons() {
    let buttons;
    let submitButton;
    let cancelButton;
    let customButton;
    let deleteButton;
    const {
      submitButtonClass,
      disabled,
      onCancel,
      onDelete,
      onSubmit,
      reverseButtons,
      activeFormButtonSpace,
      onCustomButtonClick,
      customButtonDisabled
    } = this.props;

    if (onSubmit) {
      if (typeof this.props.submitButton === 'function') {
        submitButton = this.props.submitButton(this.state.loading);
      } else {
        submitButton = (
          <button
            type="submit"
            className={`btn pri-button ${submitButtonClass}`}
            disabled={this.state.loading || disabled}
          >
            {this.state.loading ? '...' : this.props.submitButton}
          </button>
        );
      }
    }

    if (onCancel) {
      cancelButton = (
        <a className="btn btn-decline sec-button" onClick={onCancel} role="button" tabIndex="0">
          Cancel
        </a>
      );
    }

    if (onCustomButtonClick) {
      customButton = (
        <button
          type="button"
          className="btn pri-button custom-button"
          onClick={e => this.handleAction(e, onCustomButtonClick)}
          disabled={this.state.loading || customButtonDisabled}
        >
          {this.props.customButton}
        </button>);
    }

    if (onDelete) {
      deleteButton = (
        <a className="secondary-delete-button" onClick={onDelete} role="button" tabIndex="-1">
          Delete
        </a>
      );
    }

    if (reverseButtons) {
      buttons = (
        <div className={activeFormButtonSpace}>
          {cancelButton}
          {submitButton}
          {customButton}
        </div>
      );
    } else {
      buttons = (
        <div className={classNames('form-actions__buttons', activeFormButtonSpace)}>
          {submitButton}
          {customButton}
          {cancelButton}
          {deleteButton}
        </div>
      );
    }

    return <div className={classNames('form-actions clearfix', { hasOnDelete: onDelete })}>{buttons}</div>;
  }

  renderErrors = () => {
    const { errors } = this.props;

    if (errors) {
      return (
        <p className="error">
          {Array.isArray(errors)
            ? errors.map(e => e.title).join('\n')
            : errors.title
              ? errors.title
              : errors}
        </p>
      );
    }
  };

  render() {
    return (
      <form className={classNames('active-form', this.props.className)} onSubmit={this.handleAction} noValidate={this.props.noValidate}>
        {this.renderErrors()}
        {this.props.children}
        {this.renderActionButtons()}
      </form>
    );
  }
}

ActiveForm.defaultProps = {
  disabled: false,
  reverseButtons: false,
  submitButton: 'Save Changes',
  submitButtonClass: 'btn-primary'
};

ActiveForm.propTypes = {
  reverseButtons: PropTypes.bool,
  activeFormButtonSpace: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
  submitButton: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  submitButtonClass: PropTypes.string,
  customButton: PropTypes.string,
  customButtonDisabled: PropTypes.bool,
  onCustomButtonClick: PropTypes.func
};
