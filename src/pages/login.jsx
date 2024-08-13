import {useState} from "react";
import {redirectTo} from "../router.jsx";
import {useMainContext} from "../context/mainContext.jsx";
import {genPostReq} from "../utils";
import {gohost} from "../assets/data.jsx";

function Login() {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredential, setWrongCredential] = useState(false);
  const {updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified} = useMainContext();
  
  function handleChange(e) {
    switch (e.target.name) {
      case "accountName":
        setAccountName(e.target.value.trim());
        break;
      case "password":
        setPassword(e.target.value.trim());
        break;
    }
  }

  async function submitForm(e) {
    e.preventDefault(); 
    const bodyObj = {accountName, password};
    const bodyJson = JSON.stringify(bodyObj);

    if (accountName.length == 0 || password.length ==0) {
      return;
    }

    try {
      const request = genPostReq(`${gohost}/api/user/login`, bodyJson);
      const response = await fetch(request);
      if (response.ok) {
        const body = await response.json();
        localStorage.setItem("refreshToken", body.refreshToken);

        updateAccountName(body.accountName);
        updateDisplayName(body.displayName);
        updateRole(body.role);
        updateEmail(body.email);
        updateEmailVerified(body.emailVerified)

        updateLoggedIn(true);
        setWrongCredential(false);
        return redirectTo("/");
      }else if (response.status == 400) {
        setWrongCredential(true);
      }else {
        window.alert("Internal server error, please try later");
      }
    } catch (err) {
      window.alert("A connection error occurred, please try again");
    }
  }

  return (
    <div className="login-page"> 
      <div className="login-section-container">
        <label className={wrongCredential ? "wrong-credential-label" : "wrong-credential-label hidden" }>Account name and password do not match</label>
        <form className="login-form" onSubmit={submitForm}>
          <div className="login-items-container">
            <div className="login-item">
              <label htmlFor="accountName" className="login-item-label">Account name</label>
              <div>
                <input type="text" id="accountName" name="accountName" value={accountName} className="login-item-input" maxLength="100" onChange={handleChange}/>
              </div>
            </div>
            <div className="login-item">
              <label htmlFor="password" className="login-item-label">Password</label>
              <div>
                <input type="text" id="password" name="password" value={password} className="login-item-input" maxLength="100" onChange={handleChange}/>
              </div>
            </div>
          </div>
          <input type="submit" className="btn login-btn-submit" value="Submit"/>
        </form>
        <span className="reset-password">Reset password</span>
      </div>
    </div>
  );
}

export default Login;
