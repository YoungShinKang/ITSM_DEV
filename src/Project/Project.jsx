//import React from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from './Board/Board';
import DashBoard from './DashBoard/DashBoard';
import RequestBoard from './RequestBoard/RequestBoard';
import NavbarLeft from './NavbarLeft/NavbarLeft';
import IssueCreate from './IssueCreate/SimpleIssueCreate';

import { ProjectPage } from './Styles';

import PageLoader from 'common/components/PageLoader/PageLoader'

import useApi from 'common/hooks/api';

import Modal from 'common/components/Modal/Modal';
import IssueDetails from './IssueDetails/ProjectBoardIssueDetails';
import SimpleIssueDetail from './IssueDetails/SimpleIssueDetail';

import { createQueryParamModalHelpers } from 'common/utils/queryParamModal';
import authContext from 'common/utils/authContext';

import { useNavigate,useLocation } from 'react-router-dom'


const Project = () => {
  
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');

  const [ userRole, setUserRole ] = useState('');

  //로그인 상태 context 호출
  const { loggedUser, loggedIn } = useContext(authContext);

  //로그인 되지 않았으면 redirect
  const navigate = useNavigate();
  if(!loggedIn) navigate('/login', {replace: true});


  const location = useLocation();

  const propsVariables = {
    headers : {
      'Content-Type': 'application/json',
      'Authorization': loggedIn ? `Bearer ${loggedUser.token}` : undefined,
    },
    isAuthHeader : true,
  }

  const [{ data, error, setLocalData }, ] = useApi.get(`/user/info/${loggedUser.username}`,propsVariables);

  

  useEffect(() => {   
    
    if (!data) {
      return <PageLoader />;
    }

    console.log('data :'+JSON.stringify(data));  

    const sysAuthList = data.sysAuthList;

    //여기서 rows를 검사해서 Role을 뽑아낸다.
    const sDeskRole = sysAuthList.filter(sysAuth => sysAuth.AUTH_ID === 'sdesk');
    const commUserRole = sysAuthList.filter(sysAuth => sysAuth.AUTH_ID === 'COMM_USER');
    const role2Role = sysAuthList.filter(sysAuth => sysAuth.AUTH_ID === 'ROLE2');

    if(sDeskRole.length > 0) {
      setUserRole('sdesk');
    } else if(role2Role.length > 0) {
      setUserRole('ROLE2');
    } else if(commUserRole.length > 0) {
      setUserRole('COMM_USER');  
    }

    if (userRole == '') {
      return <h1>사용자 권한 없음</h1>;
    }

  }, [data]);  

  return (
    <ProjectPage>
      {/** 이 left 바는 만약 로그인이 되어 있지 않다면 화면에 표시되지 않아야 한다. */}
      <NavbarLeft
        issueCreateModalOpen={issueCreateModalHelpers.open}
      />
      
      {issueCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-create"
          width={800}
          withCloseIcon={false}
          onClose={issueCreateModalHelpers.close}
          renderContent={() => <Board />}
        />
      )}

      <Routes>
        <Route
          path="dashBoard"
          element={<DashBoard userId={loggedUser.username} token={loggedUser.token} role={userRole}/>}
        />
        <Route
          path="board"
          element={<Board userId={loggedUser.username} role={userRole} />}
        />
        <Route
          path="readyboard"
          element={<RequestBoard userId={loggedUser.username} role={userRole}/>}
        />
        <Route
          path="openIssue"
          element={
            <Modal
              isOpen
              testid="modal:issue-details"
              width={1040}
              withCloseIcon={false}
              onClose={() => navigate(-1)}
              renderContent={modal => (
                <SimpleIssueDetail 
                  srId = {location.state.srId}  
                  modalClose={modal.close}              
                />
              )}
            />
          }
        />
        {/*
        <Route
          path="openIssue"
          element={
            <Modal
              isOpen
              testid="modal:issue-details"
              width={1040}
              withCloseIcon={false}
              onClose={() => {}}
              renderContent={modal => (
                <IssueDetails
                  issueId={"issueid"}
                  userId={loggedUser.username} token={loggedUser.token} role={userRole}
                  fetchProject={fetchProject}
                  updateLocalProjectIssues={updateLocalProjectIssues}
                  modalClose={modal.close}
                />
              )}
            />
          }
        />
        */}      
        <Route
            path="board/createIssue"
            element={
              <Modal
                isOpen
                testid="modal:issue-create"
                width={800}
                withCloseIcon={false}
                onClose={issueCreateModalHelpers.close}
                renderContent={modal => (
                  <IssueCreate
                    userId={loggedUser.username} token={loggedUser.token} role={userRole}
                    userInfo={data}
                    onCreate={() => {}}
                    modalClose={modal.close}
                  />
                )}
              />
            }
          />
      </Routes>

    </ProjectPage>
  );
};

export default Project;





  /*
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setProject(null);

        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        
        const response = await axios.get(
          'http://localhost:8080/board/list/test1'
        );
        setProject(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchProject();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!project) return null;
  */