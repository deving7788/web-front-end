import {createContext, useContext, useState, useReducer} from "react";
import {userInfoReducer} from "../reducers";

const MainContext = createContext(null);

function MainContextProvider({children}) {
  const userInfoInitial = {
    accountName: "",
    displayName: "",
    role: "",
    email: "",
  }

  const [loggedIn, updateLoggedIn] = useState(false);
  const [emailConfirmed, updateEmailConfirmed] = useState(false);
  const [state, dispatch] = useReducer(userInfoReducer, userInfoInitial);

  function updateAccountName(accountName) {
    dispatch({type: "SET_ACCOUNT_NAME", payload: accountName});
  }
  function updateDisplayName(displayName) {
    dispatch({type: "SET_DISPLAY_NAME", payload: displayName});
  }
  function updateRole(role) {
    dispatch({type: "SET_ROLE", payload: role});
  }
  function updateEmail(email) {
    dispatch({type: "SET_EMAIL", payload: email});
  }

  return <MainContext.Provider value={{loggedIn, updateLoggedIn, emailConfirmed, updateEmailConfirmed, ...state, updateAccountName, updateDisplayName, updateRole, updateEmail}}>
           {children}
         </MainContext.Provider>;
}

function useMainContext() {
  return useContext(MainContext);
}

export default MainContextProvider;

export {useMainContext};
