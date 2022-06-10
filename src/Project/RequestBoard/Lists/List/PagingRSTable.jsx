import React, { useState, useEffect, useContext } from 'react';

import authContext from 'common/utils/authContext';
import { useNavigate } from 'react-router-dom'

import { IssueStatusCopy, srColumnData } from 'common/utils/syscode';

import { List, Title, IssuesCount, Table } from './ListStyles';

import useApi from 'common/hooks/api';
import toast from 'common/utils/toast';
import Pagination from "react-js-pagination";

import './Paging.css'; 

import RSTable from './Table/RSTable';


const PagingBoardRSTable = ({ status }) => {

  const [page, setPage] = useState(1); 
  

  //로그인 상태 context 호출
  const { loggedUser, loggedIn } = useContext(authContext);

  //로그인 되지 않았으면 redirect
  const navigate = useNavigate();

  if(!loggedIn) navigate('/login', {replace: true});

  const [{ data, error, isWorking }, searchServiceRequest] = useApi.post('/board/searchServiceRequestList');

  const searchServiceRequestList = async (pageNum) => {
    try {
      await searchServiceRequest({
        page:pageNum,
        start:0,
        limit:10,
        sd_list_type:'ING',
        status,
        user_id:`${loggedUser.username}`,
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
    searchServiceRequestList(1);
  }, []);

  if (data == null) {
    return <h1>로딩</h1>;
  }

  if (data.length == 0) {
    return <h1>로딩</h1>;
  } 

  const handlePageChange = (page) => { 
    setPage(page); 
    searchServiceRequestList(page);
  };

  const handleRowClick = (srId) => { 
    navigate('/project/openIssue',{state:{srId:srId}, replace: false});
  };

  const rows = data.gridVO.rows;

  //const columnData
  
  return (
    <List>
      <Title>
        {`${IssueStatusCopy[status]} `}
        <IssuesCount>{formatIssuesCount(data.gridVO.totalCount, rows)}</IssuesCount>
      </Title>
      <RSTable
        columns={srColumnData}
        data={rows} 
        rowSelectKey={'SR_ID'}
        onClickEvent={handleRowClick}
      />
      <Pagination 
        activePage={page} 
        itemsCountPerPage={20} 
        totalItemsCount={data.gridVO.totalCount} 
        pageRangeDisplayed={5} 
        prevPageText={"‹"} 
        nextPageText={"›"} 
        onChange={handlePageChange} 
      />
    </List>
  );
};

const formatIssuesCount = (totalCount, requestRows) => {
  if (totalCount !== requestRows.length) {
    return `${requestRows.length} of ${totalCount}`;
  }
  return totalCount;
};

export default PagingBoardRSTable;
