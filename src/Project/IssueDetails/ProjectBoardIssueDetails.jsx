import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import api from 'common/utils/api';
import useApi from 'common/hooks/api';
//테스트용 목 파일
import useQuery from 'common/hooks/api/queryMock';

import PageError from 'common/components/PageError/PageError';
import Button from 'common/components/Button/Button';

import Loader from './Loader/Loader';
import Type from './Type/Type';
import Delete from './Delete/Delete';
import Title from './Title/Title';
import Description from './Description/Description';
import Comments from './Comments/Comments';
import AssigneesReporter from './AssigneesReporter/AssigneesReporter';
import Priority from './Priority/Priority';
import EstimateTracking from './EstimateTracking/EstimateTracking';
import Dates from './Dates/Dates';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetails = ({
  issueId,
  projectUsers,
  fetchProject,
  updateLocalProjectIssues,
  modalClose,
}) => {
  
  const [{ data, error, setLocalData }, fetchIssue] = useQuery(`/issues/${issueId}`);

  if (!data) return <Loader />;
  if (error) return <PageError />;

  const { issue } = data;

  const updateLocalIssueDetails = fields =>
    setLocalData(currentData => ({ issue: { ...currentData.issue, ...fields } }));

  const updateIssue = updatedFields => {
    api.optimisticUpdate(`/issues/${issueId}`, {
      updatedFields,
      currentFields: issue,
      setLocalData: fields => {
        updateLocalIssueDetails(fields);
        updateLocalProjectIssues(issue.id, fields);
      },
    });
  };

  return (
    <Fragment>
      <TopActions>
        <Type issue={issue} updateIssue={updateIssue} />
        <TopActionsRight>
          <Delete issue={issue} fetchProject={fetchProject} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          <Description issue={issue} updateIssue={updateIssue} />
          <Comments issue={issue} fetchIssue={fetchIssue} />
        </Left>
        <Right>
          
          {/*
          <AssigneesReporter issue={issue} updateIssue={updateIssue} projectUsers={projectUsers} />
          */}
          <Priority issue={issue} updateIssue={updateIssue} />
          <EstimateTracking issue={issue} updateIssue={updateIssue} />
          <Dates issue={issue} />
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;
