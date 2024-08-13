import {Link} from "../router.jsx"

function SignupLoggedIn() {
  return (
    <div className="signup-logged-in">
      <div className="signup-logged-in-content">Greetings. You are already logged in, click <Link to="/user-panel">here</Link> for user panel.</div>
    </div>
  );
}

export default SignupLoggedIn;
