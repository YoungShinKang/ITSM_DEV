import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';

import useApi from 'common/hooks/api';
import Form from 'common/components/Form/Form';
import SystemTypeIcon from 'common/components/SystemTypeIcon/SystemTypeIcon';
import {
  SelectItem,
  SelectItemLabel,
} from './Styles';

const propTypes = {
  srId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

let optionsCopy = [];

const SystemTypeSelect = ({ srId, token, }) => {
  
  const propsVariables = {
    headers : {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    isAuthHeader : true,
  }

  const [{ data, error, setLocalData }, ] = useApi.get(`/base/searchServiceCombo/${userId}`,propsVariables);

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



  return (
    <Form.Field.Select
      name="assignee"
      label="유지관리 담당자"
      options={typeOptions}
      renderOption={renderType}
      renderValue={renderType}
    />
  );

};

const renderType = ({ value: USER_ID }) => (
  <SelectItem>
    <SystemTypeIcon type={'help'} top={1} />
    {/*
    이건 되지 않는다. options는 참조가 불가능한 배열이다. 스코프가 안쪽이다.
    <SelectItemLabel>{options.find(option => option.CODE_ID === CODE_ID ).CODE_TEXT}</SelectItemLabel>
    아래와 같이 바깥에 하나 더 만들어서 그걸 사용해야 한다. optionsCopy는 밖에서 초기화 되었다.
    */}
    <SelectItemLabel>{optionsCopy.find(option => option.USER_ID === USER_ID ).USER_NM}</SelectItemLabel>
  </SelectItem>
);

SystemTypeSelect.propTypes = propTypes;

export default SystemTypeSelect;
