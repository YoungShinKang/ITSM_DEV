import styled from 'styled-components';

import { color, font, mixin } from 'common/utils/styles';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 5px;
  min-height: 200px;
  max-height: 350px;
  width: 25%;
  border-radius: 3px;
  background: ${color.backgroundLightest};
  overflow: auto;
`;

export const Title = styled.div`
  padding: 13px 10px 17px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12.5)};
  ${mixin.truncateText}
`;

export const IssuesCount = styled.span`
  text-transform: lowercase;
  ${font.size(13)};
`;

export const Issues = styled.div`
  height: 100%;
  padding: 0 5px;
`;
