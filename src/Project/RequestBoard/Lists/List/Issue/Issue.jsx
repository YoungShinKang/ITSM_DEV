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
          <Title>{issue.TITLE}</Title>          
        </Issue>
      </IssueLink>
    </>
  );
};

export default ProjectBoardListIssue;
