import React, { Fragment } from 'react';

import useApi from 'common/hooks/api';

import PageError from 'common/components/PageError/PageError';
import Button from 'common/components/Button/Button';

import Loader from './Loader/Loader';
import Type from './Type/Type';
import Delete from './Delete/Delete';
import Title from './Title/Title';
import Description from './Description/Description';
import Comments from './Comments/Comments';
import Status from './Status/Status';
import AssigneesReporter from './AssigneesReporter/AssigneesReporter';
import Priority from './Priority/Priority';
import EstimateTracking from './EstimateTracking/EstimateTracking';
import Dates from './Dates/Dates';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';

const SimpleIssueDetail = ({srId}) => {  
  
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
    viewServiceRequestDetail(1);
  }, []);

  if (data == null) {
    return <Loader />;
  }

  if (error) return <PageError />;

  const { issue } = data;


  return (
    <Fragment>
      <TopActions>
        <Type issue={issue} updateIssue={updateIssue} />
        <TopActionsRight>
          <Delete issue={issue} fetchProject={fetchProject} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
    </Fragment>
  );
};

export default SimpleIssueDetail;
