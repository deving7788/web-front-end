import {useState, useEffect} from "react";
import {useMainContext} from "../context/mainContext.jsx";
import {useUserPanelContext} from "../context/userPanelContext.jsx";
import {redirectTo, Link} from "../router.jsx";
import {disNameValidConst, validateDisplayName, emailValidConst, validateEmail, genPatchReqWithRefreshToken} from "../utils";
import {authenticate} from "../auth";

function UserPanel() {
  console.log("test user panel");
  const {loggedIn, updateLoggedIn, accountName, displayName, role, email, updateAccountName, updateDisplayName, updateRole, updateEmail} = useMainContext();
  const {settingVisibility, toggleSettingVisibility} = useUserPanelContext();
  const [changeDisplayName, setChangeDisplayName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDisplayNameProm, setNewDisplayNameProm] = useState("");
  const [newEmailProm, setNewEmailProm] = useState("");

  let refreshToken

  refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
      if(refreshToken) {
        authenticate({refreshToken, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail});
      }
  }, []);

  let rofEmailChek;

  function handleLogout() {
    localStorage.removeItem("refreshToken");
    updateLoggedIn(false);
    return redirectTo("/");
  }

  function handleCloseSetting() {
    toggleSettingVisibility(!settingVisibility);
  }

  function showDisplayNameChangeInput() {
    setChangeDisplayName(true);
  }

  async function submitNewDisplayName(e) {
    e.preventDefault();
    const rofDisplayNameCheck = validateDisplayName(newDisplayName);
    if (rofDisplayNameCheck !== "OK") {
      setNewDisplayNameProm(rofDisplayNameCheck);
      return;
    }
    refreshToken = localStorage.getItem("refreshToken");
    const body = {displayName: newDisplayName};
    const bodyJson = JSON.stringify(body);
    const request = genPatchReqWithRefreshToken("http://localhost:8080/api/user/panel/change-display-name", bodyJson, refreshToken);
    try {
      const response = await fetch(request);
      if (response.ok) {
        const resBody = await response.json()
        updateDisplayName(resBody.displayName);
      }else {
        window.alert("Internal server error, please try again")
      }
    }catch (err) {
      window.alert("Connection error, please try again")
    }
    setChangeDisplayName(false);
    setNewDisplayName(""); 
  }

  function cancelDisplayNameChange() {
    setChangeDisplayName(false);
    setNewDisplayName(""); 
    setNewDisplayNameProm("");
  }

  function handleDisplayNameChange(e) {
    setNewDisplayName(e.target.value.trim());
  }

  function showEmailChangeInput() {
    setChangeEmail(true);
  }


  async function submitNewEmail(e) {
    e.preventDefault();
    const rofEmailCheck = validateEmail(newEmail);
    if (rofEmailCheck !== "OK") {
      setNewEmailProm(rofEmailCheck);
      return;
    }
    refreshToken = localStorage.getItem("refreshToken");
    const body = {email: newEmail};
    const bodyJson = JSON.stringify(body);
    const request = genPatchReqWithRefreshToken("http://localhost:8080/api/user/panel/change-email", bodyJson, refreshToken)
    try {
      const response = await fetch(request);
      if (response.ok) {
        const resBody = await response.json();
        updateEmail(resBody.email);
      }else {
        window.alert("Internal server error, please try again");
      }
    }catch (err) {
      window.alert("Connection error, please try again")
      console.log(err)
    }
    setChangeEmail(false);
    setNewEmail("");
  }

  function cancelEmailChange() {
    setChangeEmail(false);
    setNewEmail("");
    setNewEmailProm("");
  }

  function handleEmailChange(e) {
    setNewEmail(e.target.value.trim());
  }

  return (
    <div className="user-panel-page">
      <aside className="user-panel-left">
        <div>left</div>
        <div>left</div>
        <div>left</div>
      </aside>
      <div className="user-panel-middle">
        <div>middle</div>
        <div>middle</div>
        <div>middle</div>
        <div>middle</div>
      </div>
      <aside className={settingVisibility ? "user-panel-right" : "user-panel-right hidden"}>
        <section className="user-setting-content-container">
          <div className="account-name-container">
            <span className="account-name-text">Account name: {accountName}</span>
          </div>
          <div className="display-name-container">
            <div className="display-name-text">Display name: {displayName}</div>
            <div className={changeDisplayName ? "display-name-prompt" : "display-name-prompt hidden"}>{disNameValidConst[newDisplayNameProm]}</div>
            <form className="display-name-change-form" onSubmit={submitNewDisplayName}>
              <div className="display-name-change-left-btns-container">
                <div className={changeDisplayName ? "display-name-change-btn hidden btn" : "display-name-change-btn btn"} onClick={showDisplayNameChangeInput}>Change</div>
                <input type="submit" className={changeDisplayName ? "display-name-change-confirm-btn btn" : "display-name-change-confirm-btn hidden btn"} value="Confirm"/>
              </div>
              <input className={changeDisplayName ? "display-name-change-input" : "display-name-change-input hidden"} placeholder="new display name" value={newDisplayName} onChange={handleDisplayNameChange}/>
              <div className={changeDisplayName ? "display-name-change-cancel-btn btn" : "display-name-change-btn hidden btn"} onClick={cancelDisplayNameChange}>Cancel</div>
            </form>
          </div>
          <div className="email-container">
            <div className="email-text">{email}</div>
            <div className={changeEmail ? "email-prompt" : "email-prompt hidden"}>{emailValidConst[newEmailProm]}</div>
            <form className="email-change-form" onSubmit={submitNewEmail}>
              <div className="email-change-left-btns-container">
                <div className={changeEmail ? "email-change-btn hidden btn" : "email-change-btn btn"} onClick={showEmailChangeInput} >Change</div>
                <input type="submit" className={changeEmail ? "email-change-confirm-btn btn" : "email-change-confirm-btn hidden btn"} value="Confirm"/>
              </div>
              <input className= {changeEmail ? "email-change-input" : "email-change-input hidden"} placeholder="new email address" value={newEmail} onChange={handleEmailChange}/>
              <div className={changeEmail ? "email-change-cancel-btn btn" : "email-change-btn hidden btn"} onClick={cancelEmailChange}>Cancel</div>
            </form>
          </div>
          <div className="password-container">
            <div className="password-change-btn btn">Change password</div>
          </div>
        </section>
        <section className="user-setting-btns-container">
          <span className="btn close-setting-btn" onClick={handleCloseSetting}>close</span>
          <span className="btn log-out-btn" onClick={handleLogout}>log out</span>
        </section>
      </aside>
    </div>
  )

}

export default UserPanel;
