import {useState} from "react";
import {useMainContext} from "../context/mainContext.jsx";
import {useSecondaryContext} from "../context/secondaryContext.jsx";
import {redirectTo, Link} from "../router.jsx";
import {disNameValidConst, validateDisplayName, emailValidConst, passValidConst, validateEmail, validatePassword, genPatchReqWithRefreshToken, 
       genPostReqWithRefreshToken, genDeleteReqWithRefreshToken} from "../utils";
import {gohost} from "../assets/data.jsx";
import {authenticate} from "../auth";

function UserSetting() {
  const {updateLoggedIn, accountName, displayName, email, updateDisplayName, updateEmail, updateEmailVerified} = useMainContext();
  const {settingVisibility, toggleSettingVisibility} = useSecondaryContext();
  const [changeDisplayName, setChangeDisplayName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDisplayNameProm, setNewDisplayNameProm] = useState("");
  const [newEmailProm, setNewEmailProm] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [currentPasswordProm, setCurrentPasswordProm] = useState("INITIAL_PROM");
  const [newPasswordProm, setNewPasswordProm] = useState("INITIAL_PROM");
  const [confirmPasswordProm, setConfirmPasswordProm] = useState("INITIAL_PROM");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [deleteAccountProm, setDeleteAccountProm] = useState("INITIAL_PROM");
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");

  let refreshToken;

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
    const request = genPatchReqWithRefreshToken(`${gohost}/api/user/panel/change-display-name`, bodyJson, refreshToken);
    try {
      const response = await fetch(request);
      if (response.ok) {
        const resBody = await response.json()
        updateDisplayName(resBody.displayName);
        setNewDisplayNameProm(resBody.displayNameProm);
      }else if (response.status === 401) {
        updateLoggedIn(false);
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
    const request = genPatchReqWithRefreshToken(`${gohost}/api/user/panel/change-email`, bodyJson, refreshToken)
    try {
      const response = await fetch(request);
      if (response.ok) {
        const resBody = await response.json();
        updateEmail(resBody.email);
        updateEmailVerified(resBody.emailVerified);
      }else if (response.status === 401) {
        updateLoggedIn(false);
      }else {
        window.alert("Internal server error, please try again");
      }
    }catch (err) {
      window.alert("Connection error, please try again");
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

  function showChangePassword() {
    setChangePassword(true);
  }
  function handleCurrentPasswordChange(e) {
    setCurrentPassword(e.target.value.trim());
  }
  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value.trim());
  }
  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value.trim());
  }
  function handlePasswordChangeCancel() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setChangePassword(false);
    setCurrentPasswordProm("INITIAL_PROM");
    setNewPasswordProm("INITIAL_PROM");
    setConfirmPasswordProm("INITIAL_PROM");
  }
  async function submitNewPassword(e) {
    e.preventDefault();
    const rofCurrentPassword = validatePassword(currentPassword);
    const rofNewPassword = validatePassword(newPassword);
    const rofConfirmPassword = validatePassword(confirmPassword);

    setCurrentPasswordProm(rofCurrentPassword);
    setNewPasswordProm(rofNewPassword);
    setConfirmPasswordProm(rofConfirmPassword);

    if (rofCurrentPassword !== "OK" || rofNewPassword != "OK" || rofCurrentPassword != "OK") {
      return;
    }

    if (confirmPassword !== newPassword) {
      setConfirmPasswordProm("NEW_PASSWORDS_NOT_SAME");
    }
    const refreshToken = localStorage.getItem("refreshToken");
    const body = {oldPassword: currentPassword, newPassword: newPassword};
    const bodyJson = JSON.stringify(body);
    const request = genPostReqWithRefreshToken(`${gohost}/api/user/panel/change-password`, bodyJson, refreshToken);
    try {
      const response = await fetch(request);
      if (response.status === 200) {
        setCurrentPasswordProm("SUCCESS");
        setNewPasswordProm("INITIAL_PROM");
        setConfirmPasswordProm("INITIAL_PROM");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }else if (response.status === 400) {
        setCurrentPasswordProm("WRONG_PASSWORD");
        setNewPasswordProm("INITIAL_PROM");
        setConfirmPasswordProm("INITIAL_PROM");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }else if (response.status === 401) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        updateLoggedIn(false);
      }else {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        window.alert("Internal server error, please try later");
      }
    }catch(err) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      window.alert("A connection error occurred, please try again");
    }
  }

  function showDeleteAccount() {
    setDeleteAccount(true);
  }
  function cancelDeleteAccount() {
    setDeleteAccount(false);
    setDeleteAccountProm("INITIAL_PROM")
    setDeleteAccountPassword("");
  }
  function handleDeleteAccountPasswordChange(e) {
    setDeleteAccountPassword(e.target.value.trim());
  }
  async function submitDeleteAccount(e) {
    e.preventDefault();
    const rofDeleteAccountPassword = validatePassword(deleteAccountPassword);
    setDeleteAccountProm(rofDeleteAccountPassword);
    if (rofDeleteAccountPassword !== "OK") {
      return;
    }
    const body = {password: deleteAccountPassword}; 
    const bodyJson = JSON.stringify(body);
    const refreshToken = localStorage.getItem("refreshToken");
    const request = genDeleteReqWithRefreshToken(`${gohost}/api/user/panel/delete-account`, bodyJson, refreshToken);
    try {
      const response = await fetch(request);
      if (response.ok) {
        updateLoggedIn(false);
      }else if (response.status === 400) {
        setDeleteAccountProm("WRONG_PASSWORD");
      }else if (response.status === 401) {
        updateLoggedIn(false);
      }else {
        window.alert("Internal server error, please try again.");
      }
    }catch(err) {
      window.alert("Connection error, please try again.");
    }
  }

  return (
      <aside className={settingVisibility ? "user-setting" : "user-setting hidden"}>
        <section className="account-name-container">
          <span className="account-name-text">Account name: {accountName}</span>
        </section>
        <section className="display-name-container">
          <div className="display-name-text">Display name: {displayName}</div>
          <div className={changeDisplayName ? "display-name-prom" : "display-name-prom hidden"}>{disNameValidConst[newDisplayNameProm]}</div>
          <form className="display-name-change-form" onSubmit={submitNewDisplayName}>
            <div className="display-name-change-left-btns-container">
              <div className={changeDisplayName ? "display-name-change-btn hidden btn" : "display-name-change-btn btn"} onClick={showDisplayNameChangeInput}>Change</div>
              <input type="submit" className={changeDisplayName ? "display-name-change-confirm-btn btn" : "display-name-change-confirm-btn hidden btn"} value="Confirm"/>
            </div>
            <input className={changeDisplayName ? "display-name-change-input" : "display-name-change-input hidden"} placeholder="new display name" value={newDisplayName} onChange={handleDisplayNameChange} maxLength="100"/>
            <div className={changeDisplayName ? "display-name-change-cancel-btn btn" : "display-name-change-btn hidden btn"} onClick={cancelDisplayNameChange}>Cancel</div>
          </form>
        </section>
        <section className="email-container">
          <div className="email-text">{email}</div>
          <div className={changeEmail ? "email-prom" : "email-prom hidden"}>{emailValidConst[newEmailProm]}</div>
          <form className="email-change-form" onSubmit={submitNewEmail}>
            <div className="email-change-left-btns-container">
              <div className={changeEmail ? "email-change-btn hidden btn" : "email-change-btn btn"} onClick={showEmailChangeInput} >Change</div>
              <input type="submit" className={changeEmail ? "email-change-confirm-btn btn" : "email-change-confirm-btn hidden btn"} value="Confirm"/>
            </div>
            <input className= {changeEmail ? "email-change-input" : "email-change-input hidden"} maxLength="100" placeholder="new email address" value={newEmail} onChange={handleEmailChange}/>
            <div className={changeEmail ? "email-change-cancel-btn btn" : "email-change-btn hidden btn"} onClick={cancelEmailChange}>Cancel</div>
          </form>
        </section>
        <section className="password-container">
          <div className="change-password-btn btn" onClick={showChangePassword}>Change password</div>
          <form className={changePassword ? "change-password-form" : "change-password-form hidden"} onSubmit={submitNewPassword}>
            <div className="change-password-items-container">
              <div className="change-password-item">
                <label htmlFor="change-password-input-current" className="change-password-label">Current</label>
                <div>
                  <label className="current-password-prom">{passValidConst[currentPasswordProm]}</label>
                  <input type="password" className="change-password-input" id="change-password-input-current" name="change-password-input-current" maxLength="50" value={currentPassword} onChange={handleCurrentPasswordChange}/>
                </div>
              </div>
              <div className="change-password-item">
                <label htmlFor="change-password-input-new" className="change-password-label">New</label>
                <div>
                  <label className="new-password-prom">{passValidConst[newPasswordProm]}</label>
                  <input type="password" className="change-password-input" id="change-password-input-new" name="change-password-input-new" value={newPassword} maxLength="50" onChange={handleNewPasswordChange}/>
                </div>
              </div>
              <div className="change-password-item">
                <label htmlFor="change-password-input-confirm" className="change-password-label">Confirm</label>
                <div>
                  <label className="confirm-password-prom">{passValidConst[confirmPasswordProm]}</label>
                  <input type="password" className="change-password-input" id="change-password-input-confirm" name="change-password-input-confirm" value={confirmPassword} maxLength="50" onChange={handleConfirmPasswordChange}/>
                </div>
              </div>
            </div>
            <div className="change-password-btns-container">
              <input className="change-password-confirm-btn btn" type="submit" value="Confirm"/>
              <div className="change-password-cancel-btn btn" onClick={handlePasswordChangeCancel}>Cancel</div>
            </div>
          </form>
        </section>
        <section className="delete-account-container">
          <div className={"delete-account-btn btn"} onClick={showDeleteAccount}>Delete account</div>
          <form className={deleteAccount ? "delete-account-form" : "delete-account-form hidden"} onSubmit={submitDeleteAccount}>
            <div className="delete-account-alert">
              {accountDeleted ? "Your account has been deleted." : "Your account and data will be deleted permanently!"}
            </div>
            <label className={"delete-account-prom"}>{passValidConst[deleteAccountProm]}</label>
            <input className="delete-account-password" type="password" onChange={handleDeleteAccountPasswordChange} maxLength="50" placeholder="Please enter your password" value={deleteAccountPassword}/>
            <div className="delete-account-btns-container">
              <input type="submit" className="delete-account-confirm-btn btn" value="Confirm"/>
              <div className="delete-account-cancel-btn btn" onClick={cancelDeleteAccount}>Cancel</div>
            </div>
          </form>
        </section>
        <section className="user-setting-btns-container">
          <span className="btn close-setting-btn" onClick={handleCloseSetting}>close</span>
          <span className="btn log-out-btn" onClick={handleLogout}>log out</span>
        </section>
      </aside>
  )

}

export default UserSetting;
