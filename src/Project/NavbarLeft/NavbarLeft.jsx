import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'common/components/Icon/Icon';
import AboutTooltip from 'common/components/AboutTooltip/AboutTooltip';

import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles';

import { useNavigate } from 'react-router-dom'



const propTypes = {
  issueCreateModalOpen: PropTypes.func.isRequired,
};

const ProjectNavbarLeft = ({ issueCreateModalOpen }) => {


  const navigate = useNavigate();

  const useNavigateOpen = () => {    
    navigate(`/project/board/createIssue`, {replace: true});
  }

  const useNavigateBoard = () => {    
    navigate(`/project/board`, {replace: true});
  }

  const useNavigateReadyBoard = () => {    
    navigate(`/project/readyboard`, {replace: true});
  }

  return (

  <NavLeft>
    <LogoLink to="/">
      <StyledLogo color="#fff" />
    </LogoLink>
    
    <Item onClick={useNavigateReadyBoard}>
      <Icon type="plus" size={27} />
      <ItemText>작업 대기 List</ItemText>
    </Item>

    <Item onClick={useNavigateBoard}>
      <Icon type="plus" size={27} />
      <ItemText>요청 진행사항</ItemText>
    </Item>

    <Item onClick={useNavigateOpen}>
      <Icon type="plus" size={27} />
      <ItemText>Create Issue</ItemText>
    </Item>

    <Bottom>
      <AboutTooltip
        placement="right"
        offset={{ top: -218 }}
        renderLink={linkProps => (
          <Item {...linkProps}>
            <Icon type="help" size={25} />
            <ItemText>About</ItemText>
          </Item>
        )}
      />
    </Bottom>
  </NavLeft>
  )
};

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
