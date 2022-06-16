import React from 'react';
import PropTypes from 'prop-types';

import { sortByNewest } from 'common/utils/javascript';

import Create from './Create/Create';
import Comment from './Comment';
import { Comments, Title } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsComments = ({ issue, fetchIssue }) => (
  <Comments>
    <Title>담당자 코멘트</Title>
    <Create issueId={issue.id} fetchIssue={fetchIssue} />

    {sortByNewest(issue.comments, 'createdAt').map(comment => (
      <Comment key={comment.id} comment={comment} fetchIssue={fetchIssue} />
    ))}
  </Comments>
);

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
