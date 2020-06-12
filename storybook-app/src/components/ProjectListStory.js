import React, { useState, useEffect } from 'react';

import { requestProjects } from '@clockwork/api';
import { Layout, ProjectList, Loading } from '@clockwork/styleguide';
import { EVENTS, dispatchEventListener } from '@clockwork/configuration';

const ProjectListStory = () => {
  const [loading, setLoading] = useState(false);
  const [projectsEntities, setProjectsEntities] = useState([]);

  const handleShowInfo = () => {
    dispatchEventListener(EVENTS.RIGHT_BAR_APP.showInfo, {
      info: '<strong>ProjectListStory:</strong><br/> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    });
  };

  useEffect(() => {
    setLoading(true);
    requestProjects().then((data) => {
      setProjectsEntities(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout title="ProjectListStory">
      <button onClick={handleShowInfo} style={{ margin: 30 }}>Show Info</button>
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
    </Layout>
  );
};

export default ProjectListStory;
