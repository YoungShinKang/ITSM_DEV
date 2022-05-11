import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

import IssueTypeIcon from 'common/components/IssueTypeIcon/IssueTypeIcon';
import IssuePriorityIcon from 'common/components/IssueTypeIcon/IssueTypeIcon';

import { Issue, Title, Bottom, IssueLink } from './IssueStyles';

const ProjectBoardListIssue = ({ issue }) => {
  return (
    <>
      <IssueLink
        to={`/project/openIssue`}
      >
        <Issue>
          <Title>{issue.title}</Title>
          <Bottom>
            <div>
              <IssueTypeIcon type={issue.type} />
              <IssuePriorityIcon priority={issue.priority} top={-1} left={4} />
            </div>
          </Bottom>
        </Issue>
      </IssueLink>
    </>
  );
};

export default ProjectBoardListIssue;
