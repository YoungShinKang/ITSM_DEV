import styled from 'styled-components';

import { color, font, mixin } from 'common/utils/styles';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  min-height: 400px;
  width: 100%;
  border-radius: 3px;
  background: ${color.backgroundLightest};
`;

export const Title = styled.div`
  padding: 13px 10px 17px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12.5)};
  ${mixin.truncateText}
`;

export const Statuses = styled.div`
  height: 100%;
  padding: 0 5px;
`;

