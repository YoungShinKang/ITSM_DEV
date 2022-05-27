import React from 'react';
import List from './List/List';
import PagingList from './List/PagingList';
import PagingTable from './List/PagingTable';

import { Lists } from './ListsStyles';

const ProjectBoardLists = ({ IssueStatus}) => {

  return (
    <Lists>
      {Object.values(IssueStatus).map(status => (
        <PagingTable
          status={status}
        />
      ))}
    </Lists>
  );
};

export default ProjectBoardLists;
