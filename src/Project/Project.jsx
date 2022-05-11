//import React from 'react';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from './Board/Board';
import RequestBoard from './RequestBoard/RequestBoard';
import NavbarLeft from './NavbarLeft/NavbarLeft';
import IssueCreate from './IssueCreate/IssueCreate';

import { ProjectPage } from './Styles';

import PageLoader from 'common/components/PageLoader/PageLoader'

import useQuery from 'common/hooks/api/query';
import useQueryMock from 'common/hooks/api/queryMock';
import useApi from 'common/hooks/api';

import Modal from 'common/components/Modal/Modal';
import IssueDetails from './IssueDetails/ProjectBoardIssueDetails';

import { createQueryParamModalHelpers } from 'common/utils/queryParamModal';


const Project = () => {

  
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');

  //data는 response, setLocalData는 내부 데이터 업데이트 방법(즉 여기에 함수를 인자로 호출하면 그 방식대로 data가 업됨)
  //fetchProject는 부르는 메소트(실제로는 makerequest 였음)
  //const [{ data, error, setLocalData }, fetchProject] = useQuery('/board/list/test1');
  const [{ data, error, setLocalData }, fetchProject] = useApi.get('/board/list/test1');
  //const [{ data, error, setLocalData }, fetchProject] = useQueryMock('/board/list/test1');

  if (!data) {
    return <PageLoader />;
  }

  const project = {...data};
  /*
  정확히 모르는데, 원래의 코드인 아래 코드는 동작하지 않는다. 위의 코드로 고친다.
  원인은 단순했다. 아래 구조분해는 data.project를 project에 넣는다는 말인데..나는 data에
  project라는 이름의 항목을 넣지 않았기 때문이다.....(원래는 data 안에 project로 한번 더 싸져 있었다.)
  */
  //const { project } = data;

  const updateLocalProjectIssues = () => {};

  return (
    <ProjectPage>

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
          renderContent={() => <Board project={project} />}
        />
      )}

      <Routes>
        <Route
          path="board"
          element={<Board project={project} />}
        />
        <Route
          path="readyboard"
          element={<RequestBoard />}
        />
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
                  projectUsers={project.users}
                  fetchProject={fetchProject}
                  updateLocalProjectIssues={updateLocalProjectIssues}
                  modalClose={modal.close}
                />
              )}
            />
          }
        />      
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
                    project={project}
                    fetchProject={fetchProject}
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