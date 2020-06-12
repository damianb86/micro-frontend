import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/steps_indicator.css';

export default class FormStepIndicator extends React.Component {
  renderSegement(step, segmentWidth) {
    if ((step === this.props.currentStep && this.props.validated) || step < this.props.currentStep) {
      return (
        <div className={`progress-steps__item form-step-indicator-step ${this.props.customClass}`} key={step}>
          <div className="progress-steps__item__count">
            <span className="progress-steps__item__count__indicator completed" />
            <span className="progress-steps__item__count__value text-grey">
              {step}/{this.props.stepsCount}
            </span>
          </div>
          <div className="progress-steps__item__splitter" />
        </div>
      );
    } else if (step === this.props.currentStep && this.props.editMode) {
      return (
        <div className={`progress-steps__item form-step-indicator-step ${this.props.customClass}`} key={step}>
          <div className="progress-steps__item__count">
            <span className="progress-steps__item__count__indicator active" />
            <span className="progress-steps__item__count__value text-grey">
              {step}/{this.props.stepsCount}
            </span>
          </div>
          <div className="progress-steps__item__splitter" />
        </div>
      );
    } else if (this.props.stepsCount === this.props.currentStep) {
      return (
        <div className={`progress-steps__item form-step-indicator-step ${this.props.customClass}`} key={step}>
          <div className="progress-steps__item__count">
            <span className="progress-steps__item__count__indicator completed" />
            <span className="progress-steps__item__count__value text-grey">
              {step}/{this.props.stepsCount}
            </span>
          </div>
          <div className="progress-steps__item__splitter" />
        </div>
      );
    } else {
      return (
        <div className={`progress-steps__item form-step-indicator-step ${this.props.customClass}`} key={step}>
          <div className="progress-steps__item__count disabled">
            <span className="progress-steps__item__count__indicator" />
          </div>
          <div className="progress-steps__item__splitter" />
        </div>
      );
    }
  }

  render() {
    const segmentWidth = `${100 / this.props.stepsCount}%`;

    return (
      <div className="progress-steps" style={{ borderBottom: '0' }}>
        {[...Array(this.props.stepsCount).keys()].map(step => {
          return this.renderSegement(step + 1, segmentWidth);
        })}
      </div>
    );
  }
}

FormStepIndicator.propTypes = {
  stepsCount: PropTypes.number,
  currentStep: PropTypes.number,
  editMode: PropTypes.bool
};

FormStepIndicator.defaultProps = {
  stepsCount: 1,
  currentStep: 0,
  state: false
};
