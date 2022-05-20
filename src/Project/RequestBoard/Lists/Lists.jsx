import React from 'react';
import List from './List/List';
import PagingList from './List/PagingList';

import { Lists } from './ListsStyles';

const ProjectBoardLists = ({ IssueStatus}) => {

  return (
    <Lists>
      {Object.values(IssueStatus).map(status => (
        <PagingList
          status={status}
        />
      ))}
    </Lists>
  );
};

export default ProjectBoardLists;
