import { useRef, useCallback, useEffect } from 'react';
import { isEqual } from 'lodash';

import api from 'common/utils/api';
import useMergeState from 'common/hooks/mergeState';
import useDeepCompareMemoize from 'common/hooks/deepCompareMemoize';

const useQuery = (url, propsVariables = {}, options = {}) => {

  //처음에는 빈 객체.
  const propsVariablesMemoized = useDeepCompareMemoize(propsVariables);

  //초기 데이터로 state를 만들고, 그 state를 업데이트 할 수 있는 mergeState 함수를 받는다.
  //mergeState 함수는 기존 setState 보다 개선되어 함수를 받을 수 있다.
  const [state, mergeState] = useMergeState({
    data: null,  //cache 에 데이터가 있으면 쓰고 없으면 null
    error: null,
    isLoading: true,
    variables: {},
  });

  const makeRequest = useCallback(
    newVariables => {
      const variables = { ...state.variables, ...(newVariables || {}) };
      const apiVariables = { ...propsVariablesMemoized, ...variables };
      
      mergeState({ isLoading: true, variables });

      api.get(url, apiVariables).then(
        data => {
          mergeState({ data, error: null, isLoading: false });
        },
        error => {
          mergeState({ error, data: null, isLoading: false });
        },
      );

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );  

  useEffect(() => {

    makeRequest();
    
  }, []);

  const setLocalData = useCallback(
    getUpdatedData =>
      mergeState(({ data }) => {
        const updatedData = getUpdatedData(data);
        return { data: updatedData };
      }),
    [mergeState, url],
  );

  return [
    {
      ...state,
      variables: { ...propsVariablesMemoized, ...state.variables },
      setLocalData,
    },
    makeRequest,
  ];

};


export default useQuery;
