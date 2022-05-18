import authContext from './authContext';
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
        loggedUser: {
            username : '',
            token : '',
        },
        loggedIn: false,
        setLoggedUser,
        setLoggedIn
    }

    const [auth, setAuth] = useState(initialAuth);

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )

}

export default AuthContextProvider;