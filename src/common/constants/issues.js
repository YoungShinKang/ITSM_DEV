
//Issue Type의 구성
export const IssueType = {
  NEW_FUCTION: '01',
  IMPROVEMNT: '02',
  DATA_WORK: '03',
  DELETE_FUCTION: '04',
  DEFACT: '06',
  DATA_EXPORT: '06',
  CALL_RESPONSE: '07',
  PUSH: '08',
  SUB_REQ: '09',
};

export const IssueStatus = {
  BACKLOG: 'backlog',
  SELECTED: 'selected',
  INPROGRESS: 'inprogress',
  DONE: 'done',
};

export const IssuePriority = {
  HIGHEST: '5',
  HIGH: '4',
  MEDIUM: '3',
  LOW: '2',
  LOWEST: '1',
};

export const IssueTypeCopy = {
  [IssueType.NEW_FUCTION]: '신규기능',
  [IssueType.IMPROVEMNT]: '기능개선',
  [IssueType.DATA_WORK]: '데이터처리',
  [IssueType.DELETE_FUCTION]: '기능삭제',
  [IssueType.DEFACT]: '오류수정',
  [IssueType.DATA_EXPORT]: '자료추출(통계/현황)',
  [IssueType.CALL_RESPONSE]: '문의응대',
  [IssueType.PUSH]: 'PUSH서비스',
  [IssueType.SUB_REQ]: 'Sub Req',  
};


export const IssueStatusCopy = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for development',
  [IssueStatus.INPROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done',
};

export const IssuePriorityCopy = {
  [IssuePriority.HIGHEST]: 'Highest',
  [IssuePriority.HIGH]: 'High',
  [IssuePriority.MEDIUM]: 'Medium',
  [IssuePriority.LOW]: 'Low',
  [IssuePriority.LOWEST]: 'Lowest',
};
