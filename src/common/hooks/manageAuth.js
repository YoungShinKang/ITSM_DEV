import useApi from 'common/hooks/api';
import toast from 'common/utils/toast';


function useManageAuth() {

    const [{ data, error, isWorking }, loginRequest] = useApi.post('/auth/login');

    const login = async (username, password) => {
        try {
            await loginRequest({
            //post로 날아가는 요청내용. 아마 ID/PASSWD
            userId:username,
            pw:password,
        });
        } catch (error) {
            toast.error(error);
        }

        //어기서 data의 토큰을 확인해서 로그인 페이지로 redirect 하면 된다.
    };

    const logout = () => {
        //데이터를 비우는 작업을 하면 된다.
    }
  
 
    return {
        data,
        login,
        logout,
    };
  }

  export default useManageAuth;