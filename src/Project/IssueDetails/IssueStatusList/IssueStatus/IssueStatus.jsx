import React from 'react';
import PropTypes from 'prop-types';

import TitleBar from '../../TitleBar/TitleBar';

import { Status, Title, Bottom, } from './IssueStatusStyles';

const propTypes = {
  comment: PropTypes.object.isRequired,
};

const ProjectIssueStatus = ({ comment }) => {
  return (
    <Status>
      <Title>{comment.NODENAME}</Title>
      <TitleBar title={'담당자'} contents={comment.WORK_USER_NM} barType={'REQUEST'} />
      <TitleBar title={'일자'} contents={comment.WORK_DATE} barType={comment.TASK_NAME} />
    </Status>
  );
};

ProjectIssueStatus.propTypes = propTypes;

export default ProjectIssueStatus;
