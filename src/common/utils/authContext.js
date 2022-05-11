import { createContext } from "react";

const authContext = createContext({
    loggedUser: {
        userNm: '',
        userId: '',
        token: '',
    },
    loggedIn: false,
    setLoggedUser: () => {},
    setLoggedIn: () => {}
});

export default authContext;