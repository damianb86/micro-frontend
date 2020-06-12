import React from 'react';

import { Layout, Loading } from '@clockwork/styleguide';
import { EVENTS, dispatchEventListener } from '@clockwork/configuration';

const LoadingStory = () => {
  const handleShowInfo = () => {
    dispatchEventListener(EVENTS.RIGHT_BAR_APP.showInfo, {
      info: '<strong>LoadingStory:</strong><br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    });
  };

  return (
    <Layout title="LoadingStory">
      <button onClick={handleShowInfo} style={{ margin: 30 }}>Show Info</button>
      <Loading />
    </Layout>
  );
};

export default LoadingStory;
