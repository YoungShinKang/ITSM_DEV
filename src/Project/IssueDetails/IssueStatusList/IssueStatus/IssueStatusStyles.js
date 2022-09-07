import styled, { css } from 'styled-components';

import { color, font, mixin } from 'common/utils/styles';

export const Status = styled.div`
  padding: 5px 5px 5px 10px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;
  width: 100%;
  ${mixin.clickable}
  @media (max-width: 90%) {
    padding: 10px 8px;
  }
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const Title = styled.p`
  padding-bottom: 5px;
  ${font.size(15)}
  @media (max-width: 1100px) {
    ${font.size(14.5)}
  }
`;

export const Bottom = styled.div`
  display: flex;
  padding: 5px 5px 5px 10px;
  justify-content: space-between;
  align-items: center;
`;

