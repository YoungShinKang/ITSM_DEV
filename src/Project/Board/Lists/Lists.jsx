import React from 'react';
import { IssueStatus } from 'common/utils/syscode';
import List from './List/List';
import { Lists } from './ListsStyles';

const ProjectBoardLists = ({ project }) => {

  return (
    <Lists>
      {Object.values(IssueStatus).map(status => (
        <List
          status={status}
          project={project}
        />
      ))}
    </Lists>
  );
};

export default ProjectBoardLists;
