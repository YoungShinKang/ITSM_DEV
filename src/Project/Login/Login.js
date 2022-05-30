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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

import React, {useState, useEffect, useContext} from 'react'
import useApi from 'common/hooks/api';
import toast from 'common/utils/toast';
import authContext from 'common/utils/authContext';
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setLoggedUser, setLoggedIn } = useContext(authContext);

  const onChangeUsername = event => setUsername(event.target.value);
  const onChangePassword = event => setPassword(event.target.value);

  const navigate = useNavigate();

  const [{ data}, loginRequest] = useApi.post('/auth/authenticate');
  const login = async (username, password) => {
      try {
          await loginRequest({
              //post로 날아가는 요청내용. 아마 ID/PASSWD
              username,
              password,
          });            
      } catch (error) {
          toast.error(error);
      }

      //어기서 data의 토큰을 확인해서 로그인 페이지로 redirect 하면 된다.
  };

  const onLoginClick = () => {        
      login(username, password); 
  }  
  
  useEffect(() => {
      if(data != null) {
          //console.log('token_val :'+data.token);
          //localStorage.setItem('token', data.token);
          setLoggedUser(data);
          setLoggedIn(true);
          navigate(`/project/readyboard`, {replace: true});
      }
    }, [data]);

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>ID/Password를 사용하여 로그인 합니다.</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-circle-08" />
                  </InputGroupText>
                  <Input
                    placeholder="id"
                    type="id"
                    autoComplete="new-id"
                    value={username} onChange={onChangeUsername}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}  onChange={onChangePassword}
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={onLoginClick} >
                  로그인
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
