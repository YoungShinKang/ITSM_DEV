import styled from 'styled-components';

import { issuePriorityColors } from 'common/utils/styles';
import Icon from 'common/components/Icon/Icon';

export const PriorityIcon = styled(Icon)`
  color: ${props => issuePriorityColors[props.color]};
`;
