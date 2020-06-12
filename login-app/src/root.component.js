import React, { useState } from "react";

import { requestJwtCreate } from '@clockwork/api';
import { Layout } from '@clockwork/styleguide';
import { linkTo } from '@clockwork/configuration';

export const Root = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('admin@email.com');
  const [pass, setPass] = useState('123123');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    requestJwtCreate(user, pass)
      .then((response) => {
        window.location = linkTo('storybook.projectList');
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
        setLoading(false);
      });
  }

  return (
    <Layout title="Login Page">
      <form onSubmit={handleLogin} style={{ width: '200px', margin: '130px auto' }}>
        <p style={{ color: 'red' }}>{message}</p>
        <div style={{ marginRight: 50 }}>
          <label>User</label>
          <input type="text" onChange={({ target: { value } }) => setUser(value)} value={user} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" onChange={({ target: { value } }) => setPass(value)} value={pass} />
        </div>
        <br />
        <input type="submit" value={loading ? 'Loading...' : 'Submit'} disabled={loading} />
      </form>
    </Layout>
  );
};

export default Root;
