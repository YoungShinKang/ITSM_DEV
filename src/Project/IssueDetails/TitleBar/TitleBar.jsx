import React, { Fragment } from 'react';


import { SectionTitle } from '../Styles';
import { TitleBar, TitleBar2 } from './Styles';

const ProjectBoardIssueDetailsTitleBar = ({ title, contents, barType,}) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <TitleBar2 color={barType}>
      <div>{contents}</div>
    </TitleBar2>
  </div>
);

export default ProjectBoardIssueDetailsTitleBar;
