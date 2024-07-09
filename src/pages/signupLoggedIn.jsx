import {Link} from "../router.jsx"

function SignupLoggedIn() {
  return (
    <div className="signup-logged-in">Greetings. You are already logged in, click <Link to="/user-panel">here</Link> for user panel.</div>
  );
}

export default SignupLoggedIn;
