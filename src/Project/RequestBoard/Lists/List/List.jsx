import React from 'react';
import PropTypes from 'prop-types';


import { IssueStatusCopy } from 'common/utils/syscode';

import Issue from './Issue/Issue';
import { List, Title, IssuesCount, Issues } from './ListStyles';


const ProjectBoardList = ({ status }) => {

  const [{ data, error, isWorking }, searchServiceRequest] = useApi.post('/board/searchServiceRequestList');
  //const [{ data, error, setLocalData }, fetchProject] = useQueryMock('/board/list/test1');

  const searchServiceRequestList = async () => {
    try {
      await searchServiceRequest({
        page:1,
        start:0,
        limit:10,
        sd_list_type:'ING',
      });
    } catch (error) {
      toast.error(error);
    }
  };

  /* 처음에는 아래와 같이 useEffect를 쓰지 않고 바로 메소드를 호출함.
  무한반복 에러? 같은게 남..렌더링이 도를 넘었다와 같은거...
  아래와 같이 useEffect를 함. 그러고 보니 아래의 sample도 쓰고 있음.
  get은 왜 그냥 쓰지 하고 살펴보니 이미 훅 내부에서 쓰고 있음
  */

  useEffect(() => {
    searchServiceRequestList();
  }, []);

  if (data == null) {
    return <h1>로딩</h1>;
  }

  if (data.length == 0) {
    return <h1>로딩</h1>;
  } 
  
  const filteredListIssues = filterIssues(data.gridVO.rows, status);
  
  return (
    <List>
      <Title>
        {`${IssueStatusCopy[status]} `}
        <IssuesCount>{formatIssuesCount(data.gridVO.totalCount, filteredListIssues)}</IssuesCount>
      </Title>
      <Issues>
        {filteredListIssues.map((issue, index) => (
          <Issue issue={issue} />
        ))}
      </Issues>
    </List>
  );
};

//이게 의미가 없을 것 같다. 원칙적인 방법이라면, 이미 최소한의 데이터만 필터링이 되어 있어야 한다.
//const filterIssues = (projectIssues, filters, currentUserId) => {
//근데, 이게 또 이미 데이터가 로딩된 상황이라면, 어떻까? 
//아무리 봐도 이건 의미가 없어 보이긴 한다. 쓸지 말지를 고려해 보자..

//기본적으로 filter 이슈는 status (진행상태) 중심으로 구분을 하니거니....
//원본과는 다르게 사용자는 넘어가지 않는다.
const filterIssues = (rows, status) => {
  
  let issues = rows;
  issues = issues.filter(issue => issue.WORK_STATE.includes(status));

  return issues;
};

const formatIssuesCount = (totalCount, filteredListIssues) => {
  if (totalCount !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${totalCount}`;
  }
  return totalCount;
};

export default ProjectBoardList;
