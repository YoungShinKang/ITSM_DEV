/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import PageLoader from 'common/components/PageLoader/PageLoader'

import useApi from 'common/hooks/api';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const PersonalStatics = ({userId, token}) => {

  const propsVariables = {
    headers : {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    isAuthHeader : true,
  }
  
  const [{ data, error, setLocalData }] = useApi.get(`/dashBoard/simpleStatistics/${userId}`,propsVariables);

  if (!data) {
    return <PageLoader />;
  }


  const statistics = data.resultMap.requestStatistics;

  //1. 금월 요청 신규/기능개선
  const newReq = calcNewReq(statistics);

  //2. 금월 요청 데이터처리
  const dbReq = calcDBReq(statistics);

  //3. 금월 요청 오류수정
  const defectReq = calcDefectReq(statistics);

  //4. 금월 요청 자료추출
  const dataReq = calcDataReq(statistics);

  /*
  let statDatas = {
    'myValThis':myValThis.toLocaleString('en-US'),
    'sysValThis':sysValThis.toLocaleString('en-US'),
    'arrow':arrow,
    'comp':comp.toLocaleString('en-US'),
  }
  */

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          금월 요청 신규/기능개선
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {newReq.myValThis} / {newReq.sysValThis}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className={`fa ${newReq.arrow}`} /> {newReq.comp}건
                      </span>{" "}
                      <span className="text-nowrap">전월대비</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          금월 요청 데이터처리
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {dbReq.myValThis} / {dbReq.sysValThis}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                      <i className={`fa ${dbReq.arrow}`} /> {dbReq.comp}건
                      </span>{" "}
                      <span className="text-nowrap">전월대비</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          금월 요청 오류수정
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {defectReq.myValThis} / {defectReq.sysValThis}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                      <i className={`fa ${defectReq.arrow}`} /> {defectReq.comp}건
                      </span>{" "}
                      <span className="text-nowrap">전월대비</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          금월 요청 자료추출
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {dataReq.myValThis} / {dataReq.sysValThis}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                      <i className={`fa ${dataReq.arrow}`} /> {dataReq.comp}건
                      </span>{" "}
                      <span className="text-nowrap">전월대비</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

/* 1. 금월 요청 신규/기능개선 */
const calcNewReq = (statistics) => {

  //내가 요청한 금월
  let myValThis = statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_MY_REQ').NAME1_VALUE
    + statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_MY_REQ').NAME2_VALUE;

  //전체 요청한 금월 (내가 포함된 시스템들을 대상)
  let sysValThis = statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_SYSTEM_REQ').NAME1_VALUE
    + statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_SYSTEM_REQ').NAME2_VALUE;

  //내가 요청한 전월
  let myValPrev = statistics.find(statistic => statistic.STA_TYPE === 'PREV_MONTH_MY_REQ').NAME1_VALUE
    + statistics.find(statistic => statistic.STA_TYPE === 'PREV_MONTH_MY_REQ').NAME2_VALUE;

  let arrow = 'fa-arrow-up';
  let comp = myValThis - myValPrev;

  if(myValThis < myValPrev) {
    arrow = 'fa-arrow-down';
    comp = myValPrev - myValThis;
  }

  let statDatas = {
    'myValThis':myValThis.toLocaleString('en-US'),
    'sysValThis':sysValThis.toLocaleString('en-US'),
    'arrow':arrow,
    'comp':comp.toLocaleString('en-US'),
  }

  return statDatas;
};

/* 2. 금월 요청 데이터처리 */
const calcDBReq = (statistics) => {

  //내가 요청한 금월
  let myValThis = statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_MY_REQ').NAME3_VALUE;

  //전체 요청한 금월 (내가 포함된 시스템들을 대상)
  let sysValThis = statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_SYSTEM_REQ').NAME3_VALUE;

  //내가 요청한 전월
  let myValPrev = statistics.find(statistic => statistic.STA_TYPE === 'PREV_MONTH_MY_REQ').NAME3_VALUE;

  let arrow = 'fa-arrow-up';
  let comp = myValThis - myValPrev;

  if(myValThis < myValPrev) {
    arrow = 'fa-arrow-down';
    comp = myValPrev - myValThis;
  }

  let statDatas = {
    'myValThis':myValThis.toLocaleString('en-US'),
    'sysValThis':sysValThis.toLocaleString('en-US'),
    'arrow':arrow,
    'comp':comp.toLocaleString('en-US'),
  }

  return statDatas;
};

/* 3. 금월 요청 오류수정 */
const calcDefectReq = (statistics) => {

  //내가 요청한 금월
  let myValThis = statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_MY_REQ').NAME5_VALUE;

  //전체 요청한 금월 (내가 포함된 시스템들을 대상)
  let sysValThis = statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_SYSTEM_REQ').NAME5_VALUE;

  //내가 요청한 전월
  let myValPrev = statistics.find(statistic => statistic.STA_TYPE === 'PREV_MONTH_MY_REQ').NAME5_VALUE;

  let arrow = 'fa-arrow-up';
  let comp = myValThis - myValPrev;

  if(myValThis < myValPrev) {
    arrow = 'fa-arrow-down';
    comp = myValPrev - myValThis;
  }

  let statDatas = {
    'myValThis':myValThis.toLocaleString('en-US'),
    'sysValThis':sysValThis.toLocaleString('en-US'),
    'arrow':arrow,
    'comp':comp.toLocaleString('en-US'),
  }

  return statDatas;
};

/* 4. 금월 요청 자료추출 */
const calcDataReq = (statistics) => {

  //내가 요청한 금월
  let myValThis = statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_MY_REQ').NAME6_VALUE;

  //전체 요청한 금월 (내가 포함된 시스템들을 대상)
  let sysValThis = statistics.find(statistic => statistic.STA_TYPE === 'THIS_MONTH_SYSTEM_REQ').NAME6_VALUE;

  //내가 요청한 전월
  let myValPrev = statistics.find(statistic => statistic.STA_TYPE === 'PREV_MONTH_MY_REQ').NAME6_VALUE;

  let arrow = 'fa-arrow-up';
  let comp = myValThis - myValPrev;

  if(myValThis < myValPrev) {
    arrow = 'fa-arrow-down';
    comp = myValPrev - myValThis;
  }

  let statDatas = {
    'myValThis':myValThis.toLocaleString('en-US'),
    'sysValThis':sysValThis.toLocaleString('en-US'),
    'arrow':arrow,
    'comp':comp.toLocaleString('en-US'),
  }

  return statDatas;
};


/*  
"STA_TYPE":"PREV_MONTH_MY_REQ"
"STA_TYPE":"PREV_MONTH_SYSTEM_REQ"
"STA_TYPE":"THIS_MONTH_MY_REQ"
"STA_TYPE":"THIS_MONTH_SYSTEM_REQ"
"STA_TYPE":"TOTAL_REQ" -- 올해 토탈
"NAME5_VALUE":오류수정
"NAME6_VALUE":자료추출
"NAME7_VALUE":문의응대
"NAME8_VALUE":Push
"NAME9_VALUE":합계
*/



export default PersonalStatics;
