import styled, { css } from 'styled-components';

import { issueTitleBarColors, issueTitleBarBackgroundColors, mixin, font } from 'common/utils/styles';

export const TitleBar = styled.div`
  text-transform: uppercase;
  transition: all 0.1s;
  position: relative;
  width: 100%;
  ${font.size(20)}
  ${props => mixin.tag(issueTitleBarBackgroundColors[props.color], issueTitleBarColors[props.color])}
  ${props =>
    css`
      margin: 0 10px ${props.withBottomMargin ? 5 : 0}px 0;
      padding: 4px 8px;
      border-radius: 4px;
      min-height: 35px;
      transition: background 0.1s;
    `}
`;
