import React from 'react';
import PropTypes from 'prop-types';

import IssueStatus from './IssueStatus/IssueStatus';
import { List, Title, Statuses} from './IssueStatusListStyles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};



const StatusList = ({ issue }) => {

  return (

    <List>
      <Title>서비스 처리 현황</Title>
      <Statuses>
        {issue.nbpm_commentList.map((comment, index) => (
              <IssueStatus comment={comment} />
        ))}
      </Statuses>
    </List>
  );
};

StatusList.propTypes = propTypes;

export default StatusList;
