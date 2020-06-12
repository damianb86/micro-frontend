import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const Layout = ({ title = 'CW', children }) => (
  <Fragment>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Fragment>
);

export default Layout;
