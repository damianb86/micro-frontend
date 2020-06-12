import mock from '../mock';

mock.onPost("//clk-iam.herokuapp.com/session").reply(({ data }) => {
  const { email, password } = JSON.parse(data);

  if (email === 'admin@email.com' && password === '123123') {
    return [200, {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwicm9sZXMiOlsiYWRtaW4iLCJmaXJtIl0sImlhdCI6MTUxNjIzOTAyMn0.HCsnE6PWYbgC3V_6dK6RyZbxQbyUwYICXMSI9WjecIQ',
      expiration: Math.floor(Date.now() / 1000) + (10 * 60)
    }];
  } else if (email === 'firm@email.com' && password === '123123') {
    return [200, {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlVzZXIgdHdvIiwicm9sZXMiOlsiZmlybSJdfQ.5oLbTiNEGihfMqQs45ZXJXbGDeBJPrSWbYvQ-GBr3EY',
      expiration: Math.floor(Date.now() / 1000) + (10 * 60)
    }];
  }

  return [401, { message: '401 Unauthorized' }];
});

mock.onPost("//clk-iam.herokuapp.com/session/refresh").reply(() => [
  200,
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwicm9sZXMiOlsiYWRtaW4iLCJmaXJtIl0sImlhdCI6MTUxNjIzOTAyMn0.HCsnE6PWYbgC3V_6dK6RyZbxQbyUwYICXMSI9WjecIQ',
    expiration: Math.floor(Date.now() / 1000) + (10 * 60)
  }
]);
