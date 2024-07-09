import {useState, useContext, createContext} from "react";

const UserPanelContext = createContext(null);

function UserPanelContextProvider({children}) {
  const [settingVisibility, toggleSettingVisibility] = useState(true);
  return <UserPanelContext.Provider value={{settingVisibility, toggleSettingVisibility}}>
           {children}
         </UserPanelContext.Provider>

}

function useUserPanelContext() {
  return useContext(UserPanelContext);
}

export default UserPanelContextProvider;
export {useUserPanelContext};

