import React from 'react';
import PropTypes from 'prop-types';

import { ProcessBox, Process} from './IssueProcessStyles';
import { SectionTitle } from '../Styles';

import ServiceGroupProcess from './ServiceGroupProcess'
import ResultInsertProcess from './ResultInsertProcess'
import CheckProcess from './CheckProcess'

const propTypes = {
  issue: PropTypes.object.isRequired,
};



const IssueProcess = ({ issue }) => {

  return (

    <ProcessBox>
      <SectionTitle>이관</SectionTitle>
      <Process>
        
        {
          issue.WORK_STATE == 'REQUEST' && <ServiceGroupProcess issue={issue} />          
        }  
        {
          issue.WORK_STATE == 'SERVICE_GROUP' && <ResultInsertProcess issue={issue} />
        } 
        {
          issue.WORK_STATE == 'SERVICE_RESULT_INSERT' && <CheckProcess issue={issue} />
        } 
        
      </Process>
    </ProcessBox>
  );
};

IssueProcess.propTypes = propTypes;

export default IssueProcess;
