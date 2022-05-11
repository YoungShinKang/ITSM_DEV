import React from 'react';
import PropTypes from 'prop-types';


import { IssueStatusCopy } from 'common/utils/syscode';

import Issue from './Issue/Issue';
import { List, Title, IssuesCount, Issues } from './ListStyles';


const ProjectBoardList = ({ status, project }) => {
  
  const filteredListIssues = filterIssues(project.issues, status);
  const allListIssues = project.issues;


  return (
    <List>
      <Title>
        {`${IssueStatusCopy[status]} `}
        <IssuesCount>{formatIssuesCount(allListIssues, filteredListIssues)}</IssuesCount>
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
const filterIssues = (projectIssues, status) => {
  
  let issues = projectIssues;
  issues = issues.filter(issue => issue.status.includes(status));

  return issues;
};

const formatIssuesCount = (allListIssues, filteredListIssues) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`;
  }
  return allListIssues.length;
};

export default ProjectBoardList;
