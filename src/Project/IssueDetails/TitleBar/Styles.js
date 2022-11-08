import styled, { css } from 'styled-components';

import { issueTitleBarColors, issueTitleBarBackgroundColors, mixin, font } from 'common/utils/styles';

export const TitleBar = styled.div`
  text-transform: uppercase;
  transition: all 0.1s;
  position: relative;
  width: 98%;
  ${font.size(20)}
  ${props => mixin.tag(issueTitleBarBackgroundColors[props.color], issueTitleBarColors[props.color])}
  ${props =>
    css`
      margin: 0 5px ${props.withBottomMargin ? 5 : 0}px 5px;
      padding: 4px 8px;
      border-radius: 4px;
      min-height: 35px;
      transition: background 0.1s;
    `}
`;

export const TitleBar2 = styled.div`
  text-transform: uppercase;
  transition: all 0.1s;
  width: 70%;
  ${font.size(20)}
  ${props => mixin.tag(issueTitleBarBackgroundColors[props.color], issueTitleBarColors[props.color])}
  ${props =>
    css`
      margin: 0 5px ${props.withBottomMargin ? 5 : 0}px 5px;
      padding: 4px 8px;
      border-radius: 4px;
      min-height: 35px;
      transition: background 0.1s;
    `}
`;
