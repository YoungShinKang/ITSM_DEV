import React from 'react';
import List from './List/List';
import PagingList from './List/PagingList';
import PagingTable from './List/PagingTable';
import PagingRSTable from './List/PagingRSTable';

import { Lists } from './ListsStyles';

const ProjectBoardLists = ({ IssueStatus}) => {

  return (
    <Lists>
      {Object.values(IssueStatus).map(status => (
        <PagingRSTable
          status={status}
        />
      ))}
    </Lists>
  );
};

export default ProjectBoardLists;
