import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import useApi from 'common/hooks/api';

import PageError from 'common/components/PageError/PageError';
import Button from 'common/components/Button/Button';

import Loader from './Loader/Loader';
import Type from './Type/Type';
import Delete from './Delete/Delete';
import Title from './Title/Title';
import Description from './Description/Description';
import Comments from './Comments/Comments';
import TitleBar from './TitleBar/TitleBar';
import AssigneesReporter from './AssigneesReporter/AssigneesReporter';
import Priority from './Priority/Priority';
import EstimateTracking from './EstimateTracking/EstimateTracking';
import Dates from './Dates/Dates';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';
import authContext from 'common/utils/authContext';
import { useNavigate,useLocation } from 'react-router-dom'
import toast from 'common/utils/toast';
import IssueStatusList from './IssueStatusList/IssueStatusList';
import IssueProcess from './IssueProcess/IssueProcess'

const propTypes = {
  srId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const SimpleIssueDetail = ({srId, modalClose}) => {  
  
  //로그인 상태 context 호출
  const { loggedUser, loggedIn } = useContext(authContext);

  //로그인 되지 않았으면 redirect
  const navigate = useNavigate();
  if(!loggedIn) navigate('/login', {replace: true});

  const [{ data, error, isWorking }, viewServiceRequest] = useApi.post('/issue/viewIssue');

  const viewServiceRequestDetail = async (srId) => {
    try {
      await viewServiceRequest({
        sr_id:srId,
        user_id:`${loggedUser.username}`,
        //header도 추가로 넣어줘야 한다.
        headers : {
          'Content-Type': 'application/json',
          'Authorization': loggedIn ? `Bearer ${loggedUser.token}` : undefined,
        },
        isAuthHeader : true,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    viewServiceRequestDetail(srId);
  }, []);

  if (data == null) {
    return <Loader />;
  }

  if (error) return <PageError />;

  const  issue  = data.resultMap;
  
  return (
    <Fragment>
      <IssueProcess issue={issue}  />
      <TopActions>
        <Type issue={issue} />
        <TopActionsRight>
          {/* //delete는 insert 개발 완료 이후로(TO-DO)
          <Delete issue={issue} />
          */}          
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />          
        </TopActionsRight>        
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue}  />          
          <Description issue={issue} />  
          <Comments issue={issue} />
        </Left>
        <Right>
          <IssueStatusList issue={issue}  />
          
        </Right>
      </Content>
    </Fragment>
  );
};

SimpleIssueDetail.propTypes = propTypes;

export default SimpleIssueDetail;
