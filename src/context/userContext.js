import React, {useState} from 'react';
import AuthService from '../services/auth.service'
import TokenService from '../services/tokenService'


const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
});

const UserProvider = ({ children }) => {
  //const value = {};

  let [user, setUserVal] = useState({})

  let setUser = curVal => {
    setUserVal(user = curVal)
  }

  let processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    })
    
  }

  let processLogout = () => {
    TokenService.clearAuthToken()
    setUser({})
  }

  const value ={
    user: user,
    setUser: setUser,
    processLogin: processLogin,
    processLogout: processLogout,
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
