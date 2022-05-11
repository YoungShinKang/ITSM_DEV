import React from 'react';
import List from './List/List';
import { Lists } from './ListsStyles';

const ProjectBoardLists = ({ data , IssueStatus}) => {

  //APi를 호출해야 하나? 아니 여기는 리스트를 그리는 상황이고
  //paging 상황에서의 데이터는 각 List가 가져오는게 맞다.
  console.log('test1');
  console.log(data);
  console.log(IssueStatus);

  return (
    <Lists>
      {Object.values(IssueStatus).map(status => (
        <List
          status={status}
          data={data}
        />
      ))}
    </Lists>
  );
};

export default ProjectBoardLists;
