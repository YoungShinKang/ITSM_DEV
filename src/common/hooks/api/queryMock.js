import { useRef, useCallback, useEffect } from 'react';
import { isEqual } from 'lodash';

import api from 'common/utils/api';
import useMergeState from 'common/hooks/mergeState';
import useDeepCompareMemoize from 'common/hooks/deepCompareMemoize';

const useQueryMock = (url, propsVariables = {}, options = {}) => {

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


      //임시로 생성하는 테스트용 data
      /*
      const data = {
        issue: {status : 'TEMP',id : 'ITSM001',title : 'ITSM 테스트1',userIds : ['frazer91','frazer92','frazer93'] ,type : '01', priority:'1' },
       };
      */

       const data = {
        "issue": {
          "id": 598697,
          "title": "Try leaving a comment on this issue.",
          "type": "task",
          "status": "done",
          "priority": "3",
          "listPosition": 7,
          "description": "<p>Adding comments to an issue is a useful way to record additional detail about an issue, and collaborate with team members. Comments are shown in the&nbsp;<strong>Comments</strong>&nbsp;section when you&nbsp;<a href=\"https://confluence.atlassian.com/jira064/what-is-an-issue-720416138.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 82, 204); background-color: rgb(255, 255, 255);\">view an issue</a>.</p><p><br></p><ol><li>Open the&nbsp;<a href=\"https://confluence.atlassian.com/jira064/what-is-an-issue-720416138.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 82, 204);\">issue</a>&nbsp;on which to add your comment.</li><li>Click the&nbsp;<strong>Add a comment</strong>&nbsp;button.</li><li class=\"ql-indent-1\"><img src=\"https://confluence.atlassian.com/s/en_GB/7901/af536c7c6dffcc1d697b914b797aa7f2f306b4f8/_/images/icons/emoticons/check.svg\" alt=\"(tick)\">&nbsp;<a href=\"https://confluence.atlassian.com/jira064/using-keyboard-shortcuts-720416165.html#UsingKeyboardShortcuts-issues\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 82, 204);\">Keyboard shortcut</a>:&nbsp;<strong>m</strong></li><li>In the&nbsp;<strong>Comment</strong>&nbsp;text box, type your comment, using as many lines as you require.&nbsp;<img src=\"https://confluence.atlassian.com/s/en_GB/7901/af536c7c6dffcc1d697b914b797aa7f2f306b4f8/_/images/icons/emoticons/check.svg\" alt=\"(tick)\">&nbsp;</li><li>Click the&nbsp;<strong>Save</strong>&nbsp;button to save the comment.</li></ol>",
          "descriptionText": "Adding comments to an issue is a useful way to record additional detail about an issue, and collaborate with team members. Comments are shown in the&nbsp;Comments&nbsp;section when you&nbsp;view an issue.Open the&nbsp;issue&nbsp;on which to add your comment.Click the&nbsp;Add a comment&nbsp;button.&nbsp;Keyboard shortcut:&nbsp;mIn the&nbsp;Comment&nbsp;text box, type your comment, using as many lines as you require.&nbsp;&nbsp;Click the&nbsp;Save&nbsp;button to save the comment.",
          "estimate": 10,
          "timeSpent": 2,
          "timeRemaining": null,
          "createdAt": "2022-03-25T02:25:29.246Z",
          "updatedAt": "2022-03-25T02:25:29.246Z",
          "reporterId": 222220,
          "projectId": 73826,
          "users": [
            {
              "id": 222222,
              "name": "Baby Yoda",
              "email": "yoda@jira.guest",
              "avatarUrl": "https://i.ibb.co/6n0hLML/baby-yoda.jpg",
              "createdAt": "2022-03-25T02:25:29.204Z",
              "updatedAt": "2022-03-25T02:25:29.209Z",
              "projectId": 73826
            }
          ],
          "comments": [
            {
              "id": 596430,
              "body": "Everything I touch\nwith tenderness, alas,\npricks like a bramble.",
              "createdAt": "2022-03-25T02:25:29.272Z",
              "updatedAt": "2022-03-25T02:25:29.272Z",
              "userId": 222221,
              "issueId": 598697,
              "user": {
                "id": 222221,
                "name": "Lord Gaben",
                "email": "gaben@jira.guest",
                "avatarUrl": "https://i.ibb.co/6RJ5hq6/gaben.jpg",
                "createdAt": "2022-03-25T02:25:29.204Z",
                "updatedAt": "2022-03-25T02:25:29.209Z",
                "projectId": 73826
              }
            }
          ],
          "userIds": [
            222222
          ]
        }
      }

       mergeState({ data, error: null, isLoading: false });

      /*
      api.get(url, apiVariables).then(
        data => {
          mergeState({ data, error: null, isLoading: false });
        },
        error => {
          mergeState({ error, data: null, isLoading: false });
        },
      );
      */

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


export default useQueryMock;
