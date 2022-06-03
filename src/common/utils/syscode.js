 
 //이 값은 원래 DB에서 읽어오는 것으로 구현되어야 할 듯
  export const IssueType = {
    NEW_FUNC : '01',
    FUNC_IMP : '02',
    DATA_MOD : '03',
    DEL_FUNC : '04',
    BUG_MOD : '05',
    DATA_EXP : '06',
    CALL_RESP : '07',
    PUSH_JOB : '08',
    UI_JOB : '09'
  };

  export const IssueStatus = {
    TEMP : 'TEMP', //REQUEST
    REQUEST : 'REQUEST',  //REQUESTOR
    SERVICE_GROUP : 'SERVICE_GROUP',  //SERVICEDESK
    SERVICE_RESULT_INSERT : 'SERVICE_RESULT_INSERT',  //SERVICE_ROLE2
    SERVICE_CHECK : 'SERVICE_CHECK',  //SERVICEDESK
    RESULT : 'RESULT',  //REQUESTOR
    END : 'END'
  };
  
  export const IssuePriority = {
    HIGHEST: '5',
    HIGH: '4',
    MEDIUM: '3',
    LOW: '2',
    LOWEST: '1',
  };

  export const IssueTypeCopy = {    
    [IssueType.NEW_FUNC]: '신규기능',
    [IssueType.FUNC_IMP]: '기능개선',
    [IssueType.DATA_MOD]: '데이터처리',
    [IssueType.DEL_FUNC]: '기능삭제',
    [IssueType.BUG_MOD]: '오류수정',
    [IssueType.DATA_EXP]: '자료추출',
    [IssueType.CALL_RESP]: '문의응대',
    [IssueType.PUSH_JOB]: 'PUSH서비스',
    [IssueType.UI_JOB]: 'UI변경',
  };
  
  export const IssueStatusCopy = {
    [IssueStatus.TEMP] : '임시저장', //REQUEST
    [IssueStatus.REQUEST] : '서비스요청',  //REQUESTOR
    [IssueStatus.SERVICE_GROUP] : '서비스분류',  //SERVICEDESK
    [IssueStatus.SERVICE_RESULT_INSERT] : '서비스결과등록',  //SERVICE_ROLE2
    [IssueStatus.SERVICE_CHECK] : '서비스결과승인',  //SERVICEDESK
    [IssueStatus.RESULT] : '서비스만족도등록',  //REQUESTOR
    [IssueStatus.END] : '완료'
  };
  
  export const IssuePriorityCopy = {
    [IssuePriority.HIGHEST]: 'Highest',
    [IssuePriority.HIGH]: 'High',
    [IssuePriority.MEDIUM]: 'Medium',
    [IssuePriority.LOW]: 'Low',
    [IssuePriority.LOWEST]: 'Lowest',
  };


  //"SR_ID":"SR220421_4044"
  //"SERVICE_TYPE":"08","SERVICE_TYPE_NM":"PUSH서비스"
  //"REQ_USER_ID" : "2017057", "REQ_USER_NM":"이지현"
  //"REQ_DT":"2022-04-21 15:24"
  //"SYSTEM_TYPE":"AP15010003","SYSTEM_TYPE_NM":"NCS"
  //"SUB_WORK":" 0002987","SUB_WORK_NM":"통합관리"
  //"WORK_STATE":"SERVICE_CHECK", "TASK_NAME":"서비스결과검토"
  //"TITLE":"서비스 안내 팝업 작성요청"


  export const srColumnData = [
    {
      accessor: 'SR_ID',
      Header: '요청번호',
    },
    {
      accessor: 'TITLE',
      Header: '타이틀',
    },
    {
      accessor: 'SERVICE_TYPE_NM',
      Header: '요청 유형',
    },
    {
      accessor: 'REQ_USER_ID',
      Header: '요청자 ID',
    },
    {
      accessor: 'REQ_USER_NM',
      Header: '요청자',
    },
    {
      accessor: 'SYSTEM_TYPE_NM',
      Header: '시스템',
    },
    {
      accessor: 'SUB_WORK_NM',
      Header: '시스템 업무',
    },
    {
      accessor: 'REQ_DT',
      Header: '요청일',
    },
]