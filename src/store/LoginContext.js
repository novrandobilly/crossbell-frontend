import { createContext, useState } from 'react';

export const LoginContext = createContext({
  login: false,
  showLogin: () => {},
  closeLogin: () => {},
});

export const LoginContextProvider = (props) => {
  const [loginState, setLoginState] = useState(false);

  const showLogin = () => setLoginState(true);
  const closeLogin = () => setLoginState(false);

  const contextValue = {
    login: loginState,
    showLogin,
    closeLogin,
  };

  return <LoginContext.Provider value={contextValue}>{props.children}</LoginContext.Provider>;
};
