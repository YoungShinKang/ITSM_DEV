import React from 'react';
import PropTypes from 'prop-types';

import { StyledAwesomeIcon } from './AwesomeStyles';


// f2b9, f2bb
const fontIconCodes = {
  [`addressCard`]: '\\f2bb',
  'status': '\\f050',
  'reporter': '\\f659',
  'assignee': '\\e04c',
  'developer': '\\f5fc',
  'REQUEST': '\\f128',
  'SERVICE_GROUP': '\\f055',
  'SERVICE_RESULT_INSERT': '\\f5fc',
  'SERVICE_CHECK': '\\f604',
  'RESULT': '\\f681',
  'END': '\\f253',
};

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(fontIconCodes)).isRequired,
  size: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  size: 16,
  left: 0,
  top: 0,
};

const AwesomeIcon = ({ type, ...iconProps }) => (
  <StyledAwesomeIcon {...iconProps} data-testid={`icon:${type}`} code={fontIconCodes[type]} />
);

AwesomeIcon.propTypes = propTypes;
AwesomeIcon.defaultProps = defaultProps;

export default AwesomeIcon;
