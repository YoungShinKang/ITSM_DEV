import React from 'react';
import PropTypes from 'prop-types';

import CommentList from './Comment/CommentList';
import { Comments, Title } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsComments = ({ issue }) => (
  <Comments>
    <Title>담당자 코멘트</Title>
    {issue.commentHistory.filter(comment => (comment.TASK_NAME != 'REQUEST')).map(comment => (
      <CommentList comment={comment} />
    ))}
  </Comments>
);

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
