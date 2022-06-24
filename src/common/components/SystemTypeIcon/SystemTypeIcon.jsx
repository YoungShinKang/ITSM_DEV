import React from 'react';
import PropTypes from 'prop-types';

import { TypeIcon } from './Styles';

const propTypes = {
  type: PropTypes.string.isRequired,
};

const SystemTypeIcon = ({ type, ...otherProps }) => {
  return <TypeIcon type={type} color={type} size={18} {...otherProps} />;
};

SystemTypeIcon.propTypes = propTypes;

export default SystemTypeIcon;
