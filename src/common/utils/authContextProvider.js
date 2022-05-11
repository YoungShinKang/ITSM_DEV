import autnContext from './authContext';
import {useState} from 'react';

const AuthContextProvider = ({children}) => {

    const setLoggedUser = (data) => {
        setAuth(prevState => (
            {
                ...prevState,
                loggedUser: data
            }
        ))
    }

    const setLoggedIn = () => {
        setAuth(prevState => (
            {
                ...prevState, 
                loggedIn: !prevState.loggedIn
            }
        ))
    }

    const initialAuth = {
        loggedUser: {},
        loggedIn: false,
        setLoggedUser,
        setLoggedIn
    }

    const [auth, setAuth] = useState(initialAuth);

    return (
        <autnContext.Provider value={auth}>
            {children}
        </autnContext.Provider>
    )
}

export default AuthContextProvider;