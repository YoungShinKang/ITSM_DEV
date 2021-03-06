import React from 'react';
import PropTypes from 'prop-types';

import { IssueType, IssueTypeCopy } from 'common/constants/issues';
import IssueTypeIcon from 'common/components/IssueTypeIcon/IssueTypeIcon';
import Select from 'common/components/Select/Select';

import { TypeButton, Type, TypeLabel } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsType = ({ issue }) => (
  <Select
    variant="empty"
    dropdownWidth={150}
    withClearValue={false}
    name="type"
    value={issue.SERVICE_TYPE} //ITSM에 맞춰서 수정
    options={Object.values(IssueType).map(type => ({
      value: type,
      label: IssueTypeCopy[type],
    }))}    
    renderValue={({ value: type }) => (
      <TypeButton variant="empty" icon={<IssueTypeIcon type={type} />}>
        {`${IssueTypeCopy[type]}-${issue.SR_ID}`}
      </TypeButton>
    )}
    renderOption={({ value: type }) => (
      <Type key={type}>
        <IssueTypeIcon type={type} top={1} />
        <TypeLabel>{IssueTypeCopy[type]}</TypeLabel>
      </Type>
    )}
  />
);

ProjectBoardIssueDetailsType.propTypes = propTypes;

export default ProjectBoardIssueDetailsType;
