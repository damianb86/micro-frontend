import React from "react";

import { Layout, Visibility, CollapsibleCard } from '@clockwork/styleguide';

export default function Root() {
  return (
    <Layout title="Cards">
      <div style={{ display: 'flex' }}>
        <CollapsibleCard title="Card for ALL">
          Card for ALL
        </CollapsibleCard>
        
        <Visibility roles={['firm']}>
          <CollapsibleCard title="Card for role FIRM">
            Card for role FIRM
          </CollapsibleCard>
        </Visibility>

        <Visibility roles={['firm', 'admin']}>
          <CollapsibleCard title="Card for role FIRM and ADMIN">
            Card for role FIRM and ADMIN
          </CollapsibleCard>
        </Visibility>

        <Visibility rolesOr={['firm', 'admin']}>
          <CollapsibleCard title="Card for role FIRM or ADMIN">
            Card for role FIRM or ADMIN
          </CollapsibleCard>
        </Visibility>

        <Visibility roles={['admin']}>
          <CollapsibleCard title="Card for role ADMIN">
            Card for role ADMIN
          </CollapsibleCard>
        </Visibility>
      </div>
    </Layout>
  );
}
