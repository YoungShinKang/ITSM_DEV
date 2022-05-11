import { useRef, useCallback, useEffect } from 'react';
import { isEqual } from 'lodash';

import api from 'common/utils/api';
import useMergeState from 'common/hooks/mergeState';
import useDeepCompareMemoize from 'common/hooks/deepCompareMemoize';

const useQuery = (url, propsVariables = {}, options = {}) => {

  //옵션에 해당 항목이 있으면 다른값이 들어가겠고, 없으면 최초로 지정한 값이 되겠지?
  const { lazy = false, cachePolicy = 'cache-first' } = options;

  const wasCalled = useRef(false);

  //처음에는 빈 객체.
  const propsVariablesMemoized = useDeepCompareMemoize(propsVariables);

  //처음에는 lazy가 false 니깐...그리고 useRef를 쓴 것 대로 wasCalled.current 이렇게 하네..
  //일단 isSleeping의 최초 false
  const isSleeping = lazy && !wasCalled.current;

  //맨 아래에 보면 const cache = {}; 라고 선언되어 있다. 이게 영역 밖이니깐 최초에 const로 초기화 되겠지
  //cache 객체에 url 이름으로 저장을 하는거다. 이게 배열이라도 되지 않나? 실제로 사용은 배열처럼 한다.\
  //cache[url]에는 해당 url에 넘겨진 검색 조건이 들어간다. 이 조건이 같으면 그냥 cache를 사용하는 거다.
  //그래도 이건 계속 조회해야 하지 않을까?
  const isCacheAvailable = cache[url] && isEqual(cache[url].apiVariables, propsVariables);

  const canUseCache = isCacheAvailable && cachePolicy !== 'no-cache' && !wasCalled.current;

  //초기 데이터로 state를 만들고, 그 state를 업데이트 할 수 있는 mergeState 함수를 받는다.
  //mergeState 함수는 기존 setState 보다 개선되어 함수를 받을 수 있다.
  const [state, mergeState] = useMergeState({
    data: canUseCache ? cache[url].data : null,  //cache 에 데이터가 있으면 쓰고 없으면 null
    error: null,
    isLoading: !lazy && !canUseCache,
    variables: {},
  });


  //호출을 위한 makeRequest를 만든다. 이 함수는 이전에 useQuery가 인자로 받는 propsVariables을 카피한 propsVariablesMemoized
  //가 변경되면 다시 생성된다. 
  //사실 함수를 다시 만드는게 그렇게 리소스가 많이 먹는건 아니라서...이건 그냥 함수로 만들어도 될 듯....

  const makeRequest = useCallback(
    newVariables => {
      const variables = { ...state.variables, ...(newVariables || {}) };
      const apiVariables = { ...propsVariablesMemoized, ...variables };

      const skipLoading = canUseCache && cachePolicy === 'cache-first';

      if (!skipLoading) {
        mergeState({ isLoading: true, variables });
      } else if (newVariables) {
        mergeState({ variables });
      }

      api.get(url, apiVariables).then(
        data => {
          cache[url] = { data, apiVariables };
          mergeState({ data, error: null, isLoading: false });
        },
        error => {
          mergeState({ error, data: null, isLoading: false });
        },
      );

      wasCalled.current = true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [propsVariablesMemoized],
  );

  useEffect(() => {
    if (isSleeping) return;
    if (canUseCache && cachePolicy === 'cache-only') return;

    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //propsVariablesMemoized가 바뀌면 makeRequest가 바뀌고....
    //그러면 자동적으로 useEffect가 호출되어 화면을 계선한다.

    //결국은 mergeState가 발생하면 화면이 갱신된다고 보면 된다.
    
  }, [makeRequest]);

  const setLocalData = useCallback(
    getUpdatedData =>
      mergeState(({ data }) => {
        const updatedData = getUpdatedData(data);
        cache[url] = { ...(cache[url] || {}), data: updatedData };
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


const cache = {};

export default useQuery;
