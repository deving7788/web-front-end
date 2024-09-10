import {useState} from "react";
import {genGetReqWithRefreshToken} from "../utils";
import {useMainContext} from "../context/mainContext.jsx";
import {validateEmail, emailValidConst, genPatchReqWithRefreshToken} from "../utils/index.jsx";
import {gohost} from "../assets/data.jsx";
import {LoadingCircle} from "../components";

function UserPanelNotVerified() {
  const {email, updateEmail, updateLoggedIn, updateEmailVerified} = useMainContext();
  const [emailSent, updateEmailSent] = useState(false);
  const [waitEmailSent, updateWaitEmailSent] = useState(false);
  const [changeEmailLayer, updateChangeEmailLayer] = useState(false);
  const [newEmail, updateNewEmail] = useState("");
  const [newEmailProm, updateNewEmailProm] = useState("INITIAL_PROM");
  
  async function sendEmailVrfct() {
    updateWaitEmailSent(true);
    const refreshToken = localStorage.getItem("refreshToken");
    const request = genGetReqWithRefreshToken(`${gohost}/api/user/email-vrfct`, refreshToken);
    try {
      const response = await fetch(request);
      if(response.ok) {
        updateWaitEmailSent(false);
        updateEmailSent(true);
      }else if(response.status === 401) {
        updateWaitEmailSent(false);
        updateLoggedIn(false);
      }else {
        updateWaitEmailSent(false);
        window.alert("Internal server error, please try later.");
      }
    }catch (err) {
      updateWaitEmailSent(false);
      console.log(err);
    }
  }

  function showChangeEmailLayer() {
    updateChangeEmailLayer(true);
  }
  function hideChangeEmailLayer() {
    updateChangeEmailLayer(false);
    updateNewEmail("");
    updateNewEmailProm("INITIAL_PROM");
  }
  function handleLogout() {
    updateLoggedIn(false);
    localStorage.removeItem("refreshToken");
  }
  function handleEmailChange(e) {
    updateNewEmail(e.target.value.trim());
  }
  async function submitNewEmail(e) {
    e.preventDefault();
    const rofEmailCheck = validateEmail(newEmail);
    if (rofEmailCheck !== "OK") {
      updateNewEmailProm(rofEmailCheck);
      return;
    }
    const refreshToken = localStorage.getItem("refreshToken");
    const body = {email: newEmail};
    const bodyJson = JSON.stringify(body);
    const request = genPatchReqWithRefreshToken(`${gohost}/api/user/panel/change-email`, bodyJson, refreshToken);
    try {
      const response = await fetch(request);
      if (response.ok) {
        const resBody = await response.json();
        updateEmailSent(false);
        updateEmail(resBody.email);
        updateEmailVerified(resBody.emailVerified);
        updateNewEmailProm("INITAL_PROM");
        updateNewEmail("");
        updateChangeEmailLayer(false);
      }else {
        window.alert("Internal server error, pleae try again");
      }
    }catch(err) {
      window.alert("Connection error, please try again");
    }
  }

  function handleDeleteAccount() {
  }

  return (
    <div className="email-vrfct-page">
      <div className="email-vrfct-container">
        <div className="email-vrfct-top-layer">
          <div className="email-vrfct-text">Howdy. Please click the button to verify your email address: {email}</div>
          <div className="email-vrfct-prom-loading-container">
            {waitEmailSent ? <LoadingCircle/> : <div className={emailSent ? "email-vrfct-prom" : "email-vrfct-prom hidden"}>
                                                  A link has been sent to {email}, which will expire in 15 minutes.
                                                </div>}
          </div>
          <button className="email-vrfct-verify-btn btn" onClick={sendEmailVrfct} disabled={waitEmailSent ? true : false}>Verify</button>
          <div className="email-vrfct-btns-container">
            <button className="email-vrfct-logout-btn btn" onClick={handleLogout} disabled={waitEmailSent ? true : false}>Log out</button>
            <button className="email-vrfct-change-email-btn btn" onClick={showChangeEmailLayer} disabled={waitEmailSent ? true : false}>
              Change email
            </button>
          </div>
        </div>
        <div className={changeEmailLayer ? "email-vrfct-change-email-layer show" : "email-vrfct-change-email-layer"}>
          <label className="email-vrfct-change-email-layer-email-label">Current email address is {email}</label>
          <form className="email-vrfct-change-email-layer-form" onSubmit={submitNewEmail}>
            <label className="email-vrfct-change-email-layer-prom-label">{emailValidConst[newEmailProm]}</label>
            <input type="text" className="email-vrfct-change-email-layer-input" name="newEmail" value={newEmail} onChange={handleEmailChange} placeholder="Enter your new email address"/>
            <input type="submit" className="email-vrfct-change-email-layer-submit btn" onClick={submitNewEmail} value="Submit"/>
          </form>
          <div className="email-vrfct-change-email-layer-cancel btn" onClick={hideChangeEmailLayer}>Cancel</div>
        </div>
      </div>
    </div>
  )
}

export default UserPanelNotVerified;
