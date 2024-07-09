import Signup from "./signup.jsx";
import SignupLoggedIn from "./signupLoggedIn.jsx";
import {useMainContext} from "../context/mainContext.jsx";


function SignupGate() {
  const {loggedIn} = useMainContext();
  if(loggedIn) {
    return <SignupLoggedIn/>
  }else {
    return <Signup/>
  }
}

export default SignupGate;
