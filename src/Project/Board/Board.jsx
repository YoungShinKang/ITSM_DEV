import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';

import Lists from './Lists/Lists';

import authContext from 'common/utils/authContext';

import { useNavigate } from 'react-router-dom'

const ProjectBoard = () => {

  //로그인 상태 context 호출
  const { loggedUser, loggedIn } = useContext(authContext);

  //로그인 되지 않았으면 redirect
  const navigate = useNavigate();
  if(!loggedIn) navigate('/login', {replace: true});

  const propsVariables = {
    headers : {
      'Content-Type': 'application/json',
      'Authorization': loggedIn ? `Bearer ${loggedUser.token}` : undefined,
    },
    isAuthHeader : true,
  }

  const [{ data, error, setLocalData }, fetchProject] = useApi.get('/board/list/test1',propsVariables);

  if (!data) {
    return <PageLoader />;
  }
  const project = {...data};

  return (
    <Fragment>
      <Breadcrumbs items={['Projects', project.itsmBoardInfo.name, 'Itsm v0.1']} />
      <Lists
        project={project}
      />
    </Fragment>
  );
};

export default ProjectBoard;
