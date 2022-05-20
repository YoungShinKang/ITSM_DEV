import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import authContext from 'common/utils/authContext';
import { useNavigate } from 'react-router-dom'


import { IssueStatusCopy } from 'common/utils/syscode';

import Issue from './Issue/Issue';
import { List, Title, IssuesCount, Issues } from './ListStyles';

import useApi from 'common/hooks/api';
import PageLoader from 'common/components/PageLoader/PageLoader'
import toast from 'common/utils/toast';


const ProjectBoardList = ({ status }) => {

  //로그인 상태 context 호출
  const { loggedUser, loggedIn } = useContext(authContext);

  //로그인 되지 않았으면 redirect
  const navigate = useNavigate();
  if(!loggedIn) navigate('/login', {replace: true});

  const [{ data, error, isWorking }, searchServiceRequest] = useApi.post('/board/searchServiceRequestList');

  const searchServiceRequestList = async () => {
    try {
      await searchServiceRequest({
        page:1,
        start:0,
        limit:10,
        sd_list_type:'ING',
        status,
        user_id:loggedUser.username,
        //header도 추가로 넣어줘야 한다.
        headers : {
          'Content-Type': 'application/json',
          'Authorization': loggedIn ? `Bearer ${loggedUser.token}` : undefined,
        },
        isAuthHeader : true,
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

  //이 리스트에서는 아래의 필터링이 필요가 없다. 어짜피 status에 맞게 불러온다.
  //const filteredListIssues = filterIssues(data.gridVO.rows, status);
  const rows = data.gridVO.rows;
  
  return (
    <List>
      <Title>
        {`${IssueStatusCopy[status]} `}
        <IssuesCount>{formatIssuesCount(data.gridVO.totalCount, rows)}</IssuesCount>
      </Title>
      <Issues>
        {rows.map((issue, index) => (
          <Issue issue={issue} />
        ))}
      </Issues>
    </List>
  );
};

const formatIssuesCount = (totalCount, filteredListIssues) => {
  if (totalCount !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${totalCount}`;
  }
  return totalCount;
};

export default ProjectBoardList;
