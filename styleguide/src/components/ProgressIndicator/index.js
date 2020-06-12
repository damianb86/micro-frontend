import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Step = ({ state }) => (
  <div className="progress-indicator__item">
    <span className={`progress-indicator__item__indicator ${state}`} />
    <span className={`progress-indicator__item__splitter ${state}`} />
  </div>
);

Step.propTypes = { state: PropTypes.oneOf(['active', 'inactive', 'completed', 'validated']) };
Step.defaultProps = { state: 'inactive' };

const ProgressIndicator = ({ steps }) => (
  <div className="progress-indicator">{steps.map(step => <Step key={step.id} state={step.state} />)}</div>
);

ProgressIndicator.propTypes = { steps: PropTypes.array.isRequired };

export default ProgressIndicator;
