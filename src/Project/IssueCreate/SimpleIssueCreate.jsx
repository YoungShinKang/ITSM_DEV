import React, { useState, useContext, useEffect, } from 'react';
import PropTypes from 'prop-types';

import useApi from 'common/hooks/api';
import Form from 'common/components/Form/Form';
import SystemTypeSelect from './SystemTypeSelect'
import SystemSubTypeSelect from './SystemSubTypeSelect'
import IssueTypeIcon from 'common/components/IssueTypeIcon/IssueTypeIcon';
import authContext from 'common/utils/authContext';
import { useNavigate,useLocation } from 'react-router-dom'
import toast from 'common/utils/toast';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from './Styles';

import {
  IssueType,
  IssueTypeCopy,
} from 'common/constants/issues';

const propTypes = {
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectIssueCreate = ({ userId, token, role, userInfo,  onCreate, modalClose }) => {

  const { loggedUser, loggedIn } = useContext(authContext);

  //로그인 되지 않았으면 redirect
  const navigate = useNavigate();
  if(!loggedIn) navigate('/login', {replace: true});
  
  

  const [ codeID, setCodeID ] = useState('');
  const [ dateValue, setDateValue ] = useState(new Date().toISOString().split('T')[0]);

  const [{ data, }, getInsertPageInfo] = useApi.post('/issue/getInsertPageInfo'); 
  const [{ isCreating }, createIssue] = useApi.post('/issue/processRequest'); 

  const requestInsertPageInfo = async () => {
    try {
      await getInsertPageInfo({
        //여기는 수정해야 한다.
        process_type:'SERVICE',
        user_id:loggedUser.username,
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

  /* 처음에는 아래와 같이 useEffect를 쓰지 않고 바로 메소드를 호출함.
  무한반복 에러? 같은게 남..렌더링이 도를 넘었다와 같은거...
  아래와 같이 useEffect를 함. 그러고 보니 아래의 sample도 쓰고 있음.
  get은 왜 그냥 쓰지 하고 살펴보니 이미 훅 내부에서 쓰고 있음
  */
  useEffect(() => {
    requestInsertPageInfo();
  }, []);

  if (data == null) {
    return <h1>로딩</h1>;
  }

  if (data.length == 0) {
    return <h1>로딩</h1>;
  } 

  const onSystemTypeSelectClick = (systemID) => {
    setCodeID(systemID);
  };

  const onRequestDateChange = (value) => {
    setDateValue(value.split('T')[0]);
  };

  return (
    <Form
      enableReinitialize
      initialValues={{
        title: '',
      }}
      validations={{
        title: Form.is.required(),        
      }}

      onSubmit={(values, form) => {
        console.log('values :'+JSON.stringify(values));
        console.log('role :'+ role);
        console.log('userInfo :'+JSON.stringify(userInfo));           
      }}
    >
      <FormElement>
        <FormHeading>서비스 요청</FormHeading>
        <Form.Field.Input
          name="title"
          label="서비스 요청 제목"
        />
        <Divider />
        <SystemTypeSelect userId={userId}  token={token} upperCallBack={onSystemTypeSelectClick} />
        <SystemSubTypeSelect token={token} codeId={codeID} />
        <Divider /> 
        <Form.Field.TextEditor
          name="content"
          label="내용"
        />
        <Divider /> 
        <Form.Field.Select
          name="service_type"
          label="서비스 유형"
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />  
        <Form.Field.DatePicker
          withTime={false}
          value={dateValue}
          onChangeCallback={onRequestDateChange}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Issue
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const typeOptions = Object.values(IssueType).map(type => ({
  value: type,
  label: IssueTypeCopy[type],
}));

const renderType = ({ value: type }) => (
  <SelectItem>
    <IssueTypeIcon type={type} top={1} />
    <SelectItemLabel>{IssueTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

ProjectIssueCreate.propTypes = propTypes;

export default ProjectIssueCreate;
