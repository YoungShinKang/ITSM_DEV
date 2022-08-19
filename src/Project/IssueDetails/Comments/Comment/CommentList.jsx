import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';


import { formatDateTimeConversational } from 'common/utils/dateTime';
import {
  Comment,
  Content,
  Username,
  CreatedAt,
  Body,
} from './Styles';

import {
  IssueStatusCopy,
} from 'common/constants/issues';

const propTypes = {
  comment: PropTypes.object.isRequired,
};

const ProjectBoardCommentList = ({ comment }) => {
  
  //{"TASK_NAME":"REQUEST","TEXT":"인사DB 연동을 통한 관리자 개정관리 고도화",
  //"WORK_USER_NM":"강영신","NODENAME":"서비스요청","WORK_DATE":"2022-03-14 17:41:00"},

  return (
    <Comment data-testid="issue-comment">
      <Content>
        <Username>{comment.WORK_USER_NM + ' (' + IssueStatusCopy[comment.TASK_NAME] + ')'}</Username>
        <CreatedAt>{formatDateTimeConversational(comment.WORK_DATE)}</CreatedAt>
        <Fragment>
          <Body>{comment.TEXT}</Body>
        </Fragment>
      </Content>
    </Comment>
  );
};

ProjectBoardCommentList.propTypes = propTypes;

export default ProjectBoardCommentList;
