import styled from 'styled-components';

import { color, font } from 'common/utils/styles';

export const Comments = styled.div`
  padding-top: 40px;
  border-top: 1px solid ${color.borderLightest};
`;

export const Title = styled.div`
  ${font.medium}
  ${font.size(15)}
`;
