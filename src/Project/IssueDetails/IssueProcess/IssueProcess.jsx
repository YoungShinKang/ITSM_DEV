import React from 'react';
import PropTypes from 'prop-types';

import { ProcessBox, Process} from './IssueProcessStyles';
import { SectionTitle } from '../Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};



const StatusList = ({ issue }) => {

  return (

    <ProcessBox>
      <SectionTitle>이관</SectionTitle>
      <Process>
        
        {issue.nbpm_commentList.map((comment, index) => (
              <IssueStatus comment={comment} />
        ))}
        
      </Process>
    </ProcessBox>
  );
};

StatusList.propTypes = propTypes;

export default StatusList;
