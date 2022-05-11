import React, {useState} from 'react'
import useManageAuth from 'common/hooks/manageAuth'

function LoginComponent(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token") || '');
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const onChangeUsername = event => setUsername(event.target.value);
    const onChangePassword = event => setPassword(event.target.value);

    const auth = useManageAuth();

    const onLoginClick = () => {        

        auth.login(username, password);

        //로그인이되면 해당 user의 리스트로 이동하면 된다. 혹은 user의 project page 이거나...

        /*

        AuthenticationService.requestAuthTokenService(username, password)
        .then((response)=>{
            console.log('is login response?');
            setToken(response.data.token);
            AuthenticationService.registLoginAuthToken(username, response.data.token);
            props.history.push(`/result/${username}`)
        }).catch( () => {

            setShowSuccessMessage(false);
            setHasLoginFailed(true);

        });

        */
    }

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


