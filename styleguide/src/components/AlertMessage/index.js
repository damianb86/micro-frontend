import React from 'react';
import PropTypes from 'prop-types';
import IconLink from '../../common/IconLink';
import './index.scss';

class AlertMessage extends React.Component {
  componentDidMount() {
    this.resetTimeOut(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.resetTimeOut(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.timeoutObj) {
      clearTimeout(this.timeoutObj);
    }
  }

  resetTimeOut(props) {
    clearTimeout(this.timeoutObj);

    if (props.hideHandler) {
      const timeInterval = props.timeInterval || 3000;

      this.timeoutObj = setTimeout(() => {
        this.containerDiv.classList.add('alert-message--hide');
        setTimeout(this.props.hideHandler, 600);
      }, timeInterval);
    }
  }

  renderCloseLink() {
    if (this.props.hideHandler) {
      return <IconLink type="close-white" size="sm" className="pull-right" title="Close" onClick={this.props.hideHandler} />;
    }
  }

  render() {
    return (
      <div
        className={`alert-message ${this.props.className} alert-message--${this.props.type}`}
        ref={(d) => {
          this.containerDiv = d;
        }}
      >
        {this.props.closeLink ? this.renderCloseLink() : null}
        <p>{this.props.children}</p>
      </div>
    );
  }
}

AlertMessage.defaultProps = { type: 'success' };

AlertMessage.propTypes = {
  type: PropTypes.oneOf(['warning', 'info', 'success', 'error']),
  // eslint-disable-next-line react/no-unused-prop-types
  timeInterval: PropTypes.number,
  hideHandler: PropTypes.func
};

export default AlertMessage;
