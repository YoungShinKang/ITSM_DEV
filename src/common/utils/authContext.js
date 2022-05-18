import { createContext } from "react";

// 초기화 값은 쓰지 않아도 된다. 차후에 알아보기 편리하기 때문에 써 주는 것이다.
//실제로 넘어가는 값은 provider에서 넘어가는 value가 처리한다.

const authContext = createContext({
    loggedUser: {
        username: '', //userId
        token: '', //token
    },
    loggedIn: false,
    setLoggedUser: () => {},
    setLoggedIn: () => {}
});

export default authContext;