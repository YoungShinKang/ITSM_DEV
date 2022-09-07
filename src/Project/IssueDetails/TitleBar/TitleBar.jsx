import React, { Fragment } from 'react';

import AwesomeIcon from 'common/components/Icon/AwesomeIcon';

import { SectionTitle } from '../Styles';
import { TitleBar } from './Styles';

const ProjectBoardIssueDetailsTitleBar = ({ title, contents, barType,}) => (
  <Fragment>
    <SectionTitle>{title}</SectionTitle>
    <TitleBar color={barType}>
      <AwesomeIcon type={barType} size={15} />      
      &nbsp;&nbsp;&nbsp;
      <div>{contents}</div>
    </TitleBar>
  </Fragment>
);

export default ProjectBoardIssueDetailsTitleBar;
