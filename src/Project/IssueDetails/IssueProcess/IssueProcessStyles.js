import styled from 'styled-components';

import { color, font, mixin } from 'common/utils/styles';

export const ProcessBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  width: 100%;
  border-radius: 3px;
  background: ${color.backgroundLightSuccess};
`;

export const Process = styled.div`
  height: 100%;
  padding: 0 5px;
`;

