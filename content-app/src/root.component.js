import React, { useState } from "react";

import { EVENTS, rxjsGetEvent, dispatchEventListener } from '@clockwork/configuration';
import { CollapsibleCard, ProjectList, Layout, Loading } from '@clockwork/styleguide';
import { requestProjects } from '@clockwork/api';

const Root = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [projectsEntities, setProjectsEntities] = useState([]);

  const handleEmitEvent = () =>
    dispatchEventListener(EVENTS.LEFT_APP.toggleCollapsed, { some: 'from content-app' });

  const handleEmitEventRxJS = () =>
    rxjsGetEvent(EVENTS.LEFT_APP.toggleCollapsed).next({ some: 'from content-app' });

  const handleAxiosCall = () => {
    setLoading(true);
    requestProjects().then((data) => {
      setProjectsEntities(data.data);
      setLoading(false);
    });
  };

  const style = { padding: 10, border: '1px solid grey', borderRadius: 5, backgroundColor: 'lightsalmon', curson: 'pointer' };

  return (
    <Layout title="Content Page">
      <div style={{ width: 'calc(100vw - 240px)' }}>
        <CollapsibleCard title="Title" isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
          <button style={style} onClick={handleEmitEvent}>Emit Event</button> -
          <button style={style} onClick={handleEmitEventRxJS}>Emit Event with RxJS</button> -
          <button style={{ ...style, backgroundColor: 'lightgrey' }} onClick={handleAxiosCall}>Get fake projects</button> -<br/><br/>
        </CollapsibleCard>
        <br /><br />
        {loading ? (
          <Loading />
        ) : (
          <ProjectList
            projects={projectsEntities}
            visibility={{
              name: true,
              status: true,
              isInternal: true,
              isConfidential: true,
              type: true,
              clientTeam: true,
              projectTeam: true,
              clientLogo: true,
              tags: true,
              createdAt: true,
              updatedAt: true,
              industry: true,
              specialty: true,
              seniority: true
            }}
            onProjectSelect={() => {}}
          />
        )}
      </div>
    </Layout>
  );
}

export default Root;
