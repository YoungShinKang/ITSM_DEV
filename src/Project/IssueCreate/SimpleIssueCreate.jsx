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
import { getTextContentsFromHtmlString } from 'common/utils/browser';

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

      onSubmit={async (values, form) => {

        const req_date = new Date();

        const req_dt_day = req_date.toISOString().split('T')[0];
        const req_dt_hour = req_date.getHours();
        const req_dt_min = req_date.getMinutes();

        values.content = getTextContentsFromHtmlString(values.content).trim();

        try {
          await createIssue({
            ...values,
            req_dt_day: `${req_dt_day}`,
            req_dt: req_dt_day+req_dt_hour+req_dt_min,
            req_dt_hour: `${req_dt_hour}`,
            req_dt_min: `${req_dt_min}`,
            due_dt_day: `${dateValue}`,
            due_dt: dateValue+'2359',
            due_dt_hour: '23',
            due_dt_min: '59',
            sr_id : `${data.resultMap.sr_id}`,
            nbpm_task_id : '',
            nbpm_task_name : `${data.resultMap.nbpm_task_name}`,
            nbpm_user_id : `${data.resultMap.nbpm_user_id}`,
            nbpm_process_type : `${data.resultMap.nbpm_process_type}`,
            nbpm_processId : `${data.resultMap.nbpm_processId}`,
            nbpm_processInstanceId : `${data.resultMap.nbpm_processInstanceId}`,
            nbpm_version : `${data.resultMap.nbpm_version}`,
            req_type : `${data.resultMap.req_type}`,
            gridMapList: [],
            nbpm_operList: [],
            child_sr_data: [],
            workType: 'comp',
            loginId: `${data.resultMap.nbpm_user_id}`,
            up_sr_id: '',
            queryKey: 'countPROC_SERVICE,insertPROC_SERVICE,updatePROC_SERVICE2',
            //user id 부분이 누락되어 있어서 추가함
            user_id:userId,
            headers : {
              'Content-Type': 'application/json',
              'Authorization': loggedIn ? `Bearer ${loggedUser.token}` : undefined,
            },
            isAuthHeader : true,
          });
          toast.success('Issue has been successfully created.');
          //onCreate();
        } catch (error) {
          toast.error(error);
        }
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
          name="due_dt_day"
          label="서비스 유형"
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
