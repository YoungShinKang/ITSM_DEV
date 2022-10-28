import styled, { css } from 'styled-components';

import { color, font, mixin } from 'common/utils/styles';

export const Status = styled.div`
  margin: 10px 10px 0px 0px;
  padding: 5px 5px 5px 0px;
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

export const Title = styled.div`
  display: inline-block;
  padding-right: 12px;
  padding-bottom: 10px;
  color: ${color.textDark};
  ${font.medium}
`;

export const Bottom = styled.div`
  display: flex;
  padding: 5px 5px 5px 10px;
  justify-content: space-between;
  align-items: center;
`;

