import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar';

import useShortPolling from '../../../hooks/useShortPolling';

import { showAlertMessage } from '../../../actions/alertMessage';
import { requestJobStatus } from '../../../api/jobStatuses';

const JobStatusLoadingBar = ({ jobStatusId, onFinish, dispatch, noOfRecords = 1, showMessage, indexingDelay = true }) => {
  const updateFactor = (100 / noOfRecords);
  const [maxProgress, setMaxProgress] = useState(updateFactor);

  const shouldPollingContinue = (payload) => {
    if (payload.data.attributes.status === 'succeeded' || payload.data.attributes.status === 'failed') {
      return false;
    }

    return true;
  };

  const handleSuccessfulFinish = () => {
    // TODO: Remove when backend is able to handle es update in sync
    // This timeout is added temporarily to escape the delay for elasticsearch indexing 2 seconds per import file
    setTimeout(() => {
      dispatch(hideLoading());
      onFinish();
    }, indexingDelay ? noOfRecords * 2000 : 0);
  };

  const [isPolling, startPolling, stopPolling] = useShortPolling({
    apiCaller: () => requestJobStatus(jobStatusId),
    onSuccess: shouldPollingContinue,
    onFailure: () => dispatch(hideLoading()),
    onFinish: handleSuccessfulFinish
  });

  useEffect(() => {
    dispatch(showLoading());
    startPolling();

    const interval = setInterval(() => {
      setMaxProgress(prevValue => ((prevValue < 90) ? (prevValue + updateFactor) : prevValue));
    }, 5000);

    return () => {
      dispatch(hideLoading());
      stopPolling();
      clearInterval(interval);

      if (showMessage) {
        dispatch(showAlertMessage('Refresh and display'));
      }
    };
  }, []);

  return (
    <Fragment>
      <LoadingBar showFastActions style={{ backgroundColor: '#049cf6' }} maxProgress={maxProgress} progressIncrease={2} />
    </Fragment>
  );
};

JobStatusLoadingBar.defaultProps = { showMessage: true };

JobStatusLoadingBar.propTypes = {
  jobStatusId: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
  noOfRecords: PropTypes.number,
  showMessage: PropTypes.bool,
  indexingDelay: PropTypes.bool
};

export default connect()(JobStatusLoadingBar);
