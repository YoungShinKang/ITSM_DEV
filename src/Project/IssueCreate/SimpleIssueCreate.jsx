import React from 'react';
import PropTypes from 'prop-types';

import {
  IssueType,
  IssueStatus,
  IssuePriority,
  IssueTypeCopy,
  IssuePriorityCopy,
} from 'common/constants/issues';

import toast from 'common/utils/toast';
import useApi from 'common/hooks/api';
import useCurrentUser from 'common/hooks/currentUser';
import Form from 'common/components/Form/Form';
import IssueTypeIcon from 'common/components/IssueTypeIcon/IssueTypeIcon';
import Icon from 'common/components/Icon/Icon';
import Avatar from 'common/components/Avatar/Avatar';
import IssuePriorityIcon from 'common/components/IssuePriorityIcon/IssuePriorityIcon';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from './Styles';

const propTypes = {
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectIssueCreate = ({ userId, token, role,  onCreate, modalClose }) => {
  
  const [{ isCreating }, createIssue] = useApi.post('/board/createIssue');

  const { currentUserId } = useCurrentUser();

  return (
    <Form
      enableReinitialize
      initialValues={{

        /*
        type: IssueType.TASK,
        title: '',
        description: '',
        reporterId: currentUserId,
        userIds: [],
        priority: IssuePriority.MEDIUM,
        */
      }}
      validations={{
        type: Form.is.required(),
        
      }}

      onSubmit={async (values, form) => {
        
      }}
    >
      <FormElement>
        <FormHeading>Create issue</FormHeading>
        <Form.Field.Select
          name="type"
          label="Issue Type"
          tip="Start typing to get a list of possible matches."
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />     
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
