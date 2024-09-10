import {useState} from "react";
import {redirectTo} from "../router.jsx";
import {useMainContext} from "../context/mainContext.jsx";
import {genPostReq, genGetReq, emailValidConst, validateEmail} from "../utils";
import {gohost} from "../assets/data.jsx";
import {LoadingCircle} from "../components";

function Login() {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredential, setWrongCredential] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [emailProm, setEmailProm] = useState("INITIAL_PROM");
  const [loading, setLoading] = useState(false);

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

  function showResetPassword() {
    setResetPassword(true);
  }
  function cancelResetPassword() {
    setLoading(false);
    setResetPassword(false);
    setEmail("");
    setEmailSent(false);
    setEmailProm("INITIAL_PROM");
  }
  function handleEmailChange(e) {
    setEmail(e.target.value.trim());
  }
  async function sendResetPasswordLink(e) {
    e.preventDefault();
    const rofEmail = validateEmail(email);
    if (rofEmail !== "OK") {
      setEmailProm(rofEmail);
      return;
    }else {
      setLoading(true);
      setEmailProm("INITIAL_PROM");
      const request = genGetReq(`${gohost}/api/user/forget-password?email=${email.toLowerCase()}`);
      try {
        const response = await fetch(request);
        if (response.ok) {
          setEmailSent(true);
          setLoading(false);
        }else {
          setLoading(false);
          window.alert("Internal server error, please try later.");
        }
      }catch (err) {
        setLoading(false);
        window.alert("Connection error, please try later.");
      }
    }
  }

  return (
    <div className="login-page"> 
      <div className="login-section-container">
        <div className="login-content">
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
                  <input type="password" id="password" name="password" value={password} className="login-item-input" maxLength="50" onChange={handleChange}/>
                </div>
              </div>
            </div>
            <input type="submit" className="btn login-btn-submit" value="Submit"/>
          </form>
          <span className="reset-password-btn" onClick={showResetPassword}>Forget password?</span>
        </div>
        <div className={resetPassword ? "reset-password" : "reset-password hidden"}>
          <form onSubmit={sendResetPasswordLink}>
            {loading ? 
              <div className={"reset-password-loading"}>
                <LoadingCircle/>
              </div> : 
              <label className="reset-password-label">{emailSent ? `A reset link will be sent to ${email} if it's valid.` : "Please enter the email address used to create your account."}</label>
            }
            <label className="reset-password-email-prom">{emailValidConst[emailProm]}</label>
            <input type="text" className={emailSent ? "reset-password-input hidden" : "reset-password-input"} name="email" maxLength="100" value={email} disabled={loading ? true : false} placeholder="Your email address" onChange={handleEmailChange}/>
            <input type="submit" className={emailSent ? "reset-password-send-btn hidden" : "reset-password-send-btn btn"} value="Send" disabled={loading ? true : false} onClick={sendResetPasswordLink}/>
          </form>
          <button className="reset-password-quit-btn btn" disabled={loading ? true : false} onClick={cancelResetPassword}>+</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
