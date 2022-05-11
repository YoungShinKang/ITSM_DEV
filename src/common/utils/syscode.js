 
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