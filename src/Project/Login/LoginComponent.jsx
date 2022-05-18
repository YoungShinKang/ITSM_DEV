import React, {useState, useEffect, useContext} from 'react'
import useApi from 'common/hooks/api';
import toast from 'common/utils/toast';
import authContext from 'common/utils/authContext';
import { useNavigate } from 'react-router-dom'


import PageLoader from 'common/components/PageLoader/PageLoader'
import axios from 'axios'
import api from 'common/utils/api';

function LoginComponent(props) {

    //사용자가 입력하는 username, password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { setLoggedUser, setLoggedIn } = useContext(authContext);

    const onChangeUsername = event => setUsername(event.target.value);
    const onChangePassword = event => setPassword(event.target.value);

    const navigate = useNavigate();

    const [{ data, error, isWorking }, loginRequest] = useApi.post('/auth/authenticate');
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
            navigate(`/project/board`, {replace: true});
        }
      }, [data]);
    
    
    //유레카!
    //API 사용과 관련된 방식을 정의하고자 한다.
    /*********************************************************************************************************
    1. 전통적인 방식
    const requestAuthTokenService= (username, password) => {
        const globalAxios = axios.create();
        return globalAxios.post('/auth/login', {
            username,
            password
        })
    }    
    const onLoginClick = () => {
        requestAuthTokenService(username, password)
        .then((response)=>{
            console.log('is login response?');
            console.log(response.data.token);
            setToken(response.data.token);
            setShowSuccessMessage(true);
        }).catch( () => {
            setShowSuccessMessage(false);
            setHasLoginFailed(true);
        });
    }

    잘 동작함. 만약 API 호출을 본 시스템에서 사용된 방식을 차용한다면 아래와 같이 만들 수 있음
    
    2. API 함수 사용하는 방식

    const createGuestAccount = async (username, password) => {
        try {
          const { token } = await api.post('/auth/login',{
            //post로 날아가는 요청내용. 아마 ID/PASSWD
            username,
            password,
            });
            console.log('token_val :'+token);
            setShowSuccessMessage(true);
            setToken(token);
        } catch (error) {
          toast.error(error);
        }
      };

    const onLoginClick = () => { 
        createGuestAccount(username, password);
    }    

    잘 동작함. 마지막으로 본 시스템에서 주로 사용하는 useApi 방식으로, 즉 결과값을 state로 관리하고자 한다면
    아래와 같이 하며 특히 useEffect의 사용을 잘 봐야 한다

    const [{ data, error, isWorking }, loginRequest] = useApi.post('/auth/login');
    const login = async (username1, password1) => {
        try {
            await loginRequest({
                //post로 날아가는 요청내용. 아마 ID/PASSWD
                username:username1,
                password:password1,
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
            setShowSuccessMessage(true); //여기서 값을 바꿔도 rerendering 되지 않는다.....
            setToken(data.token);
            console.log('token_val :'+data.token);
        }
      }, [data]);

    여기서 만약 useEffect 없이 내부의 if(data != null) 을 쓴다면, setShowSuccessMessage(true); 때문에
    Too many reredering이 발생한다. (state가 바뀔때 마다 렌더링을 하기 위해 함수 컴퍼넌트가 호출됨. 근데 또 바꾸니
        또 호출됨..무한반복) 반복을 피하기 위해서 useEffect를 쓰며, 그리고 api 호출의 async 값이 업데이트 되었음을
        확인하는 data 값을 두번째 인자로 줌으로써 api 응답이 왔음을 확인한다.

    자체 api를 사용할 때 응답값이 state로 관리가 되면 해당 데이터가 변경될 때 re-rendering 된다. 즉 화면에 그리는 것 외에
    다른 작업이 필요하면  useEffect가 필요하다는 것이다. 이때 useEffect의 두번째 인자를 셋팅해야 한다.

    자체 api를 쓰더라도 state로 관리하지 않으려면 두번째 샘플처럼 sync, await 처리를 하면 된다.


     */  


    return (
        <div>
            <h1>Login</h1>
            <div className="container">
                {hasLoginFailed && <div className="alert alert-warning">잘못된 계정입니다.</div>}
                {showSuccessMessage && <div>로그인 성공</div>}
                User Name: <input type="text" name="username" value={username} onChange={onChangeUsername}/>
                Password: <input type="password" name="password" value={password}  onChange={onChangePassword}/>
                <button className="btn btn-success" onClick={onLoginClick}>Login</button>
            </div>
        </div>
    )
}

export default LoginComponent