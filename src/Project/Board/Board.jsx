import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from 'common/components/Breadcrumbs/Breadcrumbs';

import Lists from './Lists/Lists';

const propTypes = {
  project: PropTypes.object.isRequired,
};

const ProjectBoard = ({ project }) => {
  return (
    <Fragment>
      <Breadcrumbs items={['Projects', project.itsmBoardInfo.name, 'Itsm v0.1']} />
      <Lists
        project={project}
      />
    </Fragment>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
