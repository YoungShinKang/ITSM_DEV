import React, { useContext, } from 'react';
import PropTypes from 'prop-types';

import useApi from 'common/hooks/api';
import Form from 'common/components/Form/Form';
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

const CheckProcess = ({ issue }) => {

  const { loggedUser, loggedIn } = useContext(authContext); 
  
  const [{ isChecking }, checkIssue] = useApi.post('/issue/processCheck'); 

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
          await checkIssue(
            {
              nbpm_comment: values.nbpm_commnet,	
              sr_id: issue.SR_ID,
              nbpm_task_id: '0',	                    				//고정값
              nbpm_task_name: 'SERVICE_RESULT_INSERT',				//고정값
              nbpm_user_id: loggedUser.username,	    				//이관을 하는 ID, 로그인 ID
              nbpm_process_type: 'SERVICE',	          				//고정값	
              nbpm_processId: '',	                    				//고정값
              nbpm_processInstanceId: '0',	          				//고정값
              nbpm_version: '1',	                    				//고정값
              req_type: 'SERVICE',	                  				//고정값
              originSrData: issue,
              nbpm_operList: [],										          //고정값
              child_sr_data: [],										          //고정값
              workType: 'comp',										            //고정값
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
        <FormHeading>서비스 결과승인</FormHeading>
        <Form.Field.Textarea
          name="nbpm_commnet"
          label="내용"
        />
        <Divider />         
        
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isChecking}>
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


CheckProcess.propTypes = propTypes;

export default CheckProcess;
