import UserPanel from "./userPanel.jsx";
import UserPanelNotLoggedIn from "./userPanelNotLoggedIn.jsx";
import UserPanelNotVerified from "./userPanelNotVerified.jsx";
import {useMainContext} from "../context/mainContext.jsx";

function UserPanelGate() {
  const {loggedIn, emailVerified} = useMainContext();
  if (loggedIn) {
    return emailVerified ? <UserPanel/> : <UserPanelNotVerified/>
  }else {
    return <UserPanelNotLoggedIn/>
  }


}

export default UserPanelGate;
