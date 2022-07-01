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
  token: PropTypes.string.isRequired,
  codeId: PropTypes.string.isRequired,
};

let optionsCopy = [];

const SystemSubTypeSelect = ({ token, codeId, }) => {

  const [ options, setOptions ] = useState([]);  
  
  const propsVariables = {
    headers : {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    isAuthHeader : true,
    CODE : codeId
  }

  if(codeId == '') codeId='noCode'

  const [{data}] = useApi.get(`/base/searchServiceSubCombo/${codeId}`,propsVariables);  

  useEffect(() => {

    if (!data || !data.gridVO || !data.gridVO.rows) {
      return <h1>No data</h1>;
    } 

    setOptions(data.gridVO.rows);
    optionsCopy = data.gridVO.rows;
  }, [data]);

  const typeOptions = options.map(option => ({
    value: option.CODE_ID,
    label: option.CODE_TEXT,
  }));

  return (
    <Form.Field.Select
      name="sub_work"
      label="하위업무"
      options={typeOptions}
      renderOption={renderType}
      renderValue={renderType}
    />
  );
};

const renderType = ({ value: CODE_ID }) => (
  <SelectItem>
    <SystemTypeIcon type={'subSystem'} top={1} />
    {/*
    이건 되지 않는다. options는 참조가 불가능한 배열이다. 스코프가 안쪽이다.
    <SelectItemLabel>{options.find(option => option.CODE_ID === CODE_ID ).CODE_TEXT}</SelectItemLabel>
    아래와 같이 바깥에 하나 더 만들어서 그걸 사용해야 한다. optionsCopy는 밖에서 초기화 되었다.
    */}
    <SelectItemLabel>{optionsCopy.find(option => option.CODE_ID === CODE_ID ).CODE_TEXT}</SelectItemLabel>
  </SelectItem>
);

SystemSubTypeSelect.propTypes = propTypes;

export default SystemSubTypeSelect;
