import styled from 'styled-components';

import { systemTypeColors } from 'common/utils/styles';
import Icon from 'common/components/Icon/Icon';

export const TypeIcon = styled(Icon)`
  color: ${props => systemTypeColors[props.color]};
`;
