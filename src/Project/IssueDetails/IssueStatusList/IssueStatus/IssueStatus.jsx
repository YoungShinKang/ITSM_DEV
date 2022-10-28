import React from 'react';
import PropTypes from 'prop-types';

import TitleBar from '../../TitleBar/TitleBar';

import { Status, Title, Bottom } from './IssueStatusStyles';

import AwesomeIcon from 'common/components/Icon/AwesomeIcon';

const propTypes = {
  comment: PropTypes.object.isRequired,
};

const ProjectIssueStatus = ({ comment }) => {
  return (
    <Status>
      <AwesomeIcon type={comment.TASK_NAME} size={15} />
        &nbsp;&nbsp;&nbsp;
      <Title>{comment.NODENAME}</Title>
      <TitleBar title={'담당자'} contents={comment.WORK_USER_NM} barType={'status'} />
      <TitleBar title={'일자'} contents={comment.WORK_DATE} barType={'RESULT'} />
    </Status>
  );
};

ProjectIssueStatus.propTypes = propTypes;

export default ProjectIssueStatus;
