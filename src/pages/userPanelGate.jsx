import UserPanel from "./userPanel.jsx";
import UserPanelNotLoggedIn from "./userPanelNotLoggedIn.jsx";
import {useMainContext} from "../context/mainContext.jsx";

function UserPanelGate() {
  const {loggedIn, setLoggedIn} = useMainContext();
  if (loggedIn) {
    return <UserPanel/>
  }else {
    return <UserPanelNotLoggedIn/>
  }


}

export default UserPanelGate;
