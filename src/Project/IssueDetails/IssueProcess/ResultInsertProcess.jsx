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

const ResultInsertProcess = ({ issue }) => {

  const { loggedUser, loggedIn } = useContext(authContext); 
  
  const [{ isInserting }, resultInsertIssue] = useApi.post('/issue/processResultInsert'); 

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
        
        
        //이 함수 내에서 시분초를 구해야 한다.
        const work_date = new Date();

        const work_dt_day = work_date.toISOString().split('T')[0];
        const work_dt_hour = work_date.getHours() < 10 ? '0' + work_date.getHours() : work_date.getHours();
        const work_dt_min = work_date.getMinutes() < 10 ? '0' + work_date.getMinutes() : work_date.getMinutes();

        try {
          await resultInsertIssue(
            {
              system_type: issue.SYSTEM_TYPE,
              sub_work: issue.SUB_WORK,
              work_dt_day: work_dt_day,
              
              work_dt: work_dt_day+work_dt_hour+work_dt_min,
              work_dt_hour: work_dt_hour,
              work_dt_min: work_dt_min,
              
              result_service_type: issue.SERVICE_TYPE,	
              work_result: values.nbpm_commnet,	
              sr_id: issue.SR_ID,
              nbpm_task_id: '0',	                    				//고정값
              nbpm_task_name: 'SERVICE_GROUP',	    				//고정값
              nbpm_user_id: loggedUser.username,	    				//이관을 하는 ID, 로그인 ID
              nbpm_process_type: 'SERVICE',	          				//고정값	
              nbpm_processId: '',	                    				//고정값
              nbpm_processInstanceId: '0',	          				//고정값
              nbpm_version: '1',	                    				//고정값
              req_type: 'SERVICE',	                  				//고정값
              sub_req_type: '',	                  						//고정값
              /*
              gridMapList: [
                {
                  gridInsertQueryKey: 'insertSERVICE_RESOURCES',	//고정값
                  gridDeleteQueryKey: 'deleteSERVICE_RESOURCES',	//고정값
                  gridData: []									//고정값
                },
                {
                  gridData: []									//고정값
                }
              ],
              */
              nbpm_operList: [],										//고정값
              originSrData: issue,
              child_sr_data: [],										//고정값
              workType: 'comp',										//고정값
              loginId: loggedUser.username,	          				//로그인 ID
              queryKey: 'updatePROC_SERVICE',	        				//고정값
              headers : {
                          'Content-Type': 'application/json',
                          'Authorization': loggedIn ? `Bearer ${loggedUser.token}` : undefined,
                        },
              isAuthHeader : true,
            }
          );
          toast.success('Issue has been successfully created.');
          //onCreate();
        } catch (error) {
          toast.error(error);
        }
      }}

    >
      <FormElement>
        <FormHeading>서비스 결과등록</FormHeading>
        <Form.Field.Textarea
          name="nbpm_commnet"
          label="내용"
        />
        <Divider />         
        
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isInserting}>
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


ResultInsertProcess.propTypes = propTypes;

export default ResultInsertProcess;
