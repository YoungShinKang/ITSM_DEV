import React, { Fragment , useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';

import Lists from './Lists/Lists';
import useApi from 'common/hooks/api';
import PageLoader from 'common/components/PageLoader/PageLoader'

import toast from 'common/utils/toast';
import axios from 'axios';

const ProjectBoard = () => {

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
  } else {
    console.log(data.gridVO.rows);
  }

  //실제로는 파라미터로 넘어오는 project에서 issuIssueStatuseState 를 받아야 한다.
  const IssueStatus = {
    REQUEST : 'REQUEST',  //REQUESTOR
    SERVICE_CHECK : 'SERVICE_GROUP',  //SERVICEDESK
  };


  return (
    <Fragment>
      <Breadcrumbs items={['Projects', 'ready list', 'Itsm v0.1']} />
      <Lists
        data={data}
        IssueStatus={IssueStatus}
      />
    </Fragment>
  );
};

export default ProjectBoard;
