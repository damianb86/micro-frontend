import React from 'react';

import ProjectListItem from './ProjectListItem';

const ProjectList = ({ projects, visibility, onProjectSelect }) => (
  <div className="project-list">
    {projects.length === 0 ?
      <div className="project-list-item empty-message">No Projects</div> :
      (projects.map(project => (
        <ProjectListItem key={project.id} project={project} visibility={visibility} handleProjectSelect={onProjectSelect} />
      )))
    }
  </div>
);

export default ProjectList;
