import React, { Fragment , useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';

import Lists from './Lists/Lists';

const ProjectBoard = () => {

  //실제로는 파라미터로 넘어오는 project에서 issuIssueStatuseState 를 받아야 한다.
  //무슨말이냐면 사용자별로 IssueStatus가 달라질 수 있다. 
  //혹은 Role에 따라서 여기서 다르게 지정 할 수 있다.
  const IssueStatus = { 
    REQUEST : 'REQUEST',  //REQUESTOR
    SERVICE_GROUP : 'SERVICE_GROUP',  //SERVICEDESK
    SERVICE_RESULT_INSERT : 'SERVICE_RESULT_INSERT',
    SERVICE_CHECK : 'SERVICE_CHECK',
  };

  return (
    <Fragment>
      <Breadcrumbs items={['Projects', 'ready list', 'Itsm v0.1']} />
      <Lists
        IssueStatus={IssueStatus}
      />
    </Fragment>
  );
};

export default ProjectBoard;
