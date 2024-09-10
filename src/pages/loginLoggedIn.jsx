import {Link} from "../router.jsx"

function LoginLoggedIn() {
  return (
    <div className="login-logged-in-page">
      <div className="login-logged-in-content">Greetings. You are already logged in, click <Link to="/user-panel">here</Link> for user panel.</div>
    </div>
  );
}

export default LoginLoggedIn;
