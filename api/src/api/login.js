import axios from 'axios';

import { saveJwtToken } from '../helpers';

export const requestJwtCreate = (email, password) =>
  fetch('https://clk-iam.herokuapp.com/session', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json'}
  })
    .then((response) => {
      console.log({ response });
      if (response.status === 200) {
        return response.json().then(data => saveJwtToken(data));
      }

      return response.json().then(({ error: message }) => Promise.reject({ message }));
    })

  /*axios.post('https://clk-iam.herokuapp.com/session', { email, password }, { headers: { 'Content-Type': 'application/json' } }).then((response) => {
    console.log('NICE', response);
    if (response.status === 200) {
      saveJwtToken(response.data);
    }

    return response;
  });*/
  
  export const requestJwtRefresh = () =>
  axios.post('https://clk-iam.herokuapp.com/session/refresh').then((response) => {
    console.log('Refreshing token', response);
    if (response.status === 200) {
      saveJwtToken(response.data);
    } else {
      alert('Can`t refresh token');
    }
    
    return response;
  });

export const requestJwtValidate = () =>
  axios.post('https://clk-iam.herokuapp.com/session/validate');

export const requestUserCreate = (email, password, password_confirmation) =>
  axios.post('https://clk-iam.herokuapp.com/user.create', { email, password, password_confirmation });
