import React from "react";

import { Header } from '@clockwork/styleguide';
import { useCurrentUser } from "./hooks/useCurrentUser";

const Root = () => {
  const [currentUser] = useCurrentUser();

  return (
    <div>
      <center><h3>From Local</h3></center>
      <Header
        currentUser={currentUser}
        pageTitle="P.O.C. DEMO"
      />
    </div>
  )

  /*return (
    <section style={{ padding: 20, backgroundColor: 'lightseagreen' }}>
      {currentUser ? (
        <div>
          <div>You are: {currentUser.name}</div>
          <div>Your roles are: <strong>{Object.keys(currentUser.claims).map(role => `${role}: ${currentUser.claims[role]}`).join(' | ')}</strong></div>
          <div style={{ position: 'absolute', right: 25, top: 25 }}>
            <a href="/login" style={{ color: 'white', padding: 10, backgroundColor: 'darkslategrey', borderRadius: 5 }}>Login/Logout</a>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </section>
  );*/
};

export default Root;
