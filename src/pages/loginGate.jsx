import Login from "./signup.jsx";
import LoginLoggedIn from "./loginLoggedIn.jsx";
import {useMainContext} from "../context/mainContext.jsx";


function LoginGate() {
  const {loggedIn} = useMainContext();
  if (loggedIn) {
    return <LoginLoggedIn/>
  }else {
    return <Login/>
  }
}

export default LoginGate;
