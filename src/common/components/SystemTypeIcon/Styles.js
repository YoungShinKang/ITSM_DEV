import styled from 'styled-components';

import { issueTypeColors } from 'common/utils/styles';
import Icon from 'common/components/Icon/Icon';

export const TypeIcon = styled(Icon)`
  color: ${props => issueTypeColors[props.color]};
`;
