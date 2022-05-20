import React from 'react';
import List from './List/List';
import { Lists } from './ListsStyles';

const ProjectBoardLists = ({ IssueStatus}) => {

  return (
    <Lists>
      {Object.values(IssueStatus).map(status => (
        <List
          status={status}
        />
      ))}
    </Lists>
  );
};

export default ProjectBoardLists;
