import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import useApi from 'common/hooks/api';
import Form from 'common/components/Form/Form';
import authContext from 'common/utils/authContext';
import SystemTypeIcon from 'common/components/SystemTypeIcon/SystemTypeIcon';
import {
  SelectItem,
  SelectItemLabel,
} from './Styles';

const propTypes = {
  srId: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};

let optionsCopy = [];

const AssigneeSelect = ({ srId, callBack}) => {

  const { loggedUser, loggedIn } = useContext(authContext);
  
  const propsVariables = {
    headers : {
      'Content-Type': 'application/json',
      'Authorization': loggedIn ? `Bearer ${loggedUser.token}` : undefined,
    },
    isAuthHeader : true,
  }

  const [{ data, error, setLocalData }, ] = useApi.get(`/base/searchOperUserCombo/${srId}`,propsVariables);

  const [ options, setOptions ] = useState([]);

  useEffect(() => {

    if (!data) {
      return <h1>No data</h1>;
    } 
    setOptions(data.gridVO.rows);
    optionsCopy = data.gridVO.rows;
  }, [data]);

  const typeOptions = options.map(option => ({
    value: option.USER_ID,
    label: option.USER_NM,
  }));

  const onChangeCallback = userId => {
    callBack(optionsCopy.find(option => option.USER_ID === userId ).USER_NM);
  }

  return (
    <Form.Field.Select
      name="assignee"
      label="유지관리 담당자"
      options={typeOptions}
      renderOption={renderType}
      renderValue={renderType}
      onSelect={onChangeCallback}
    />
  );

};

const renderType = ({ label: USER_NM }) => (
  <SelectItem>
    <SystemTypeIcon type={'help'} top={1} />    
    <SelectItemLabel>{USER_NM}</SelectItemLabel>
  </SelectItem>
);

AssigneeSelect.propTypes = propTypes;

export default AssigneeSelect;
