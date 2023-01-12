import React, { useState, useContext, } from 'react';
import PropTypes from 'prop-types';

import useApi from 'common/hooks/api';
import Form from 'common/components/Form/Form';
import AssigneeSelect from './AssigneeSelect';
import authContext from 'common/utils/authContext';
import toast from 'common/utils/toast';

import {
  FormHeading,
  FormElement,
  Divider,
  Actions,
  ActionButton,
} from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,  
};

const ServiceGroupProcess = ({ issue }) => {

  const { loggedUser, loggedIn } = useContext(authContext);
 
  const [ operUserNm, setOperUserNm ] = useState('');

  const [ dateValue, setDateValue ] = useState(new Date().toISOString().split('T')[0]);
  const [{ isCreating }, createIssue] = useApi.post('/issue/processTransfer'); 

  const onOperUserSelectClick = (selectedUserNm) => {
    setOperUserNm(selectedUserNm);
  };

  const onRequestDateChange = (value) => {
    setDateValue(value.split('T')[0]);
  };

  return (
    <Form
      enableReinitialize
      initialValues={{
        nbpm_commnet: '',
      }}
      validations={{
        nbpm_commnet: Form.is.required(),        
      }}

      onSubmit={async (values, form) => {        

        try {
          await createIssue({
            ROLE2_user_id: values.assignee,  	      //이관을 받은 개발자
            nbpm_comment: values.nbpm_commnet,			//이관 떄 넣은 코멘트
            result_hope_dt_day: dateValue,	        //이관 때 넣은 날짜
            result_hope_dt: dateValue+'2359',	      //이관 때 넣은 날짜
            result_hope_dt_hour: '23',	            //이관 때 넣은 날짜
            result_hope_dt_min: '59',	              //이관 때 넣은 날짜
            sr_id: issue.SR_ID,                     //SR 아이디
            nbpm_task_id: '0',	                    //고정값
            nbpm_task_name: 'REQUEST',	            //고정값
            nbpm_user_id: loggedUser.username,	    //이관을 하는 ID, 로그인 ID
            nbpm_process_type: 'SERVICE',	          //고정값
            nbpm_processId: '',	                    //고정값
            nbpm_processInstanceId: '0',	          //고정값
            nbpm_version: '1',	                    //고정값
            req_type: 'SERVICE',	                  //고정값
            gridMapList: [],	                      //고정값
            nbpm_operList: [
                {
                    select_type: 'SINGLE',	        //고정값
                    oper_type: 'ROLE2',	            //고정값
                    oper_user_id: values.assignee,	//이관을 받은 개발자
                    oper_user_name: operUserNm	    //이관을 받은 개발자 이름
                }
            ],
            originSrData: issue,
            child_sr_data: [],	                    //고정값
            workType: 'transfer',	                  //고정값
            loginId: loggedUser.username,	          //로그인 ID
            queryKey: 'updatePROC_SERVICE',	        //고정값
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
        <Divider />
        <AssigneeSelect srId={issue.SR_ID} callBack={onOperUserSelectClick} />
        <Divider /> 
        <Form.Field.Textarea
          name="nbpm_commnet"
          label="내용"
        />
        <Divider />         
        <Form.Field.DatePicker
          name="result_hope_dt_day"
          label="완료 Due"
          withTime={false}
          value={dateValue}
          onChangeCallback={onRequestDateChange}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Issue
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={()=>{}}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};


ServiceGroupProcess.propTypes = propTypes;

export default ServiceGroupProcess;
