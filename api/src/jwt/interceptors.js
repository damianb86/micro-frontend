import axios from 'axios';
import get from 'lodash/get';

import { requestJwtRefresh } from '../api/login';
import { getJwtToken } from '../helpers';
import { linkTo } from '@clockwork/configuration';

axios.interceptors.request.use((config) => {
  console.log({ config });

  const token = getJwtToken();
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use( (response) => response, (error) => {
  console.log({ error });
  // Return any error which is not due to authentication back to the calling service
  if (get(error, 'response.status') !== 401) {
    return Promise.reject(error);
  }

  // Logout user if token refresh didn't work
  if (get(error, 'config.url') == 'https://clk-iam.herokuapp.com/session/refresh') {
    removeJwtToken();
    window.location = linkTo('login');

    return Promise.reject(error);
  }

  const token = getJwtToken();
  if (token) {
    return requestJwtRefresh().then(({ data: { token } }) => {
      const config = error.config;
      config.headers['Authorization'] = `Bearer ${token}`;

      return new Promise((resolve, reject) => {
        axios.request(config).then(response => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      })
    });
  }
});
