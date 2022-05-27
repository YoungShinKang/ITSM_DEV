import styled from 'styled-components';

import { color, font, mixin } from 'common/utils/styles';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 5px;
  min-height: 200px;
  max-height: 350px;
  width: 100%;
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

export const Table = styled.div`
  padding: 0 5px;

  table 			      { 
    border-spacing: 1; 
    border-collapse: collapse; 
    background:white;
    border-radius:6px;
    overflow:hidden;
    width: 100%;
    max-width: 100%;
    margin:0 auto;
    position:relative;
    
    *               { position:relative }
    
    td,th           { padding-left:4px}

    thead tr        { 
      height:30px; 
      color: #ffffff;
      background: #324960;
      font-size:14px;
    }    
    
    tbody tr        { 
      height:30px; 
      border-bottom:1px solid #E3F1D5 ;
      font-size:13px;
      &:last-child  { border:0; }
    }
    
    td,th 					{ text-align:left;
      &.l 					{ text-align:right }
      &.c 					{ text-align:center }
      &.r 					{ text-align:center }
    }
  }
`;
