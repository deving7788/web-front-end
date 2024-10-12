import {useReducer} from "react";
import {accNameValidConst, disNameValidConst, passValidConst, emailValidConst, validateAccountName,
        validateDisplayName, validateEmail, validatePassword, genPostReq} from "../utils";
import {signupReducer} from "../reducers";
import {redirectTo} from "../router.jsx";
import {useMainContext} from "../context/mainContext.jsx";
import {gohost} from "../assets/data.jsx";

function Signup() {
  const signupInitial = {
    accountName: "",
    displayName: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
    accountNameProm: "INITIAL_PROM",
    displayNameProm: "INITIAL_PROM",
    emailProm: "INITIAL_PROM",
    createPasswordProm: "INITIAL_PROM",
    confirmPasswordProm: "INITIAL_PROM",
  };

  const [state, dispatch] = useReducer(signupReducer, signupInitial);
  const {accountName, displayName, email, createPassword, confirmPassword, accountNameProm, displayNameProm, emailProm, createPasswordProm, confirmPasswordProm} = state;
  const {updateLoggedIn, updateEmailVerified, updateAccountName, updateDisplayName, updateRole, updateEmail} = useMainContext();

  function handleChange(e) {
    if(e.target.name === "accountName")
      dispatch({type: "RESET_ACCOUNT_NAME", payload: e.target.value.trim()});
    else if (e.target.name === "displayName")
      dispatch({type: "RESET_DISPLAY_NAME", payload: e.target.value.trim()});
    else if (e.target.name === "email")
      dispatch({type: "RESET_EMAIL", payload: e.target.value.trim()});
    else if (e.target.name === "createPassword")
      dispatch({type: "RESET_CREATE_PASSWORD", payload: e.target.value.trim()});
    else
      dispatch({type: "RESET_CONFIRM_PASSWORD", payload: e.target.value.trim()});
  }

  async function submitForm(e) {
    e.preventDefault();
    const {accountName, displayName, email, createPassword, confirmPassword} = state;
    const rofAccName = validateAccountName(accountName);
    const rofDisName = validateDisplayName(displayName); 
    const rofEmail = validateEmail(email);
    const rofCreaPass = validatePassword(createPassword);
    let rofConfPass = validatePassword(confirmPassword);
    if (rofConfPass === "ZERO_LENGTH" ) {
      rofConfPass = "ZERO_LENGTH_CONF_PASS"
    }

    dispatch({type: "RESET_ACCOUNT_NAME_PROM", payload: rofAccName});
    dispatch({type: "RESET_DISPLAY_NAME_PROM", payload: rofDisName});
    dispatch({type: "RESET_EMAIL_PROM", payload: rofEmail});
    dispatch({type: "RESET_CREATE_PASSWORD_PROM", payload: rofCreaPass});
    dispatch({type: "RESET_CONFIRM_PASSWORD_PROM", payload: rofConfPass});

    if(createPassword !== confirmPassword) {
      dispatch({type: "RESET_CONFIRM_PASSWORD_PROM", payload: "PASSWORDS_NOT_SAME"});
      return;
    } else {
      rofConfPass = "OK";
    }

    let password;
    if(rofAccName !== "OK" || rofDisName !== "OK" || rofCreaPass !== "OK" || rofConfPass !== "OK" || rofEmail !== "OK") {
      return
    }
    
    const emailLC = email.toLowerCase();

    const bodyObj = {accountName, displayName, email: emailLC, password: createPassword, role: "user"};
    const bodyJson = JSON.stringify(bodyObj);
    const signupRequest = genPostReq(`${gohost}/api/user/signup`, bodyJson);

    try {
      const response = await fetch(signupRequest);
      if (response.ok){
        updateLoggedIn(true);
        const body = await response.json();
        if ("refreshToken" in body) {
          localStorage.setItem("refreshToken", body.refreshToken)
        }

        updateAccountName(body.accountName);
        updateDisplayName(body.displayName);
        updateRole(body.role);
        updateEmail(body.email);
        updateEmailVerified(body.emailVerified);

        return redirectTo("/user-panel");
      }else if(response.status === 400) {
        const body = await response.json();
        if ("accountNameProm" in body) {
          dispatch({type:"RESET_ACCOUNT_NAME_PROM", payload: body.accountNameProm})
        }
        if ("displayNameProm" in body) {
          dispatch({type:"RESET_DISPLAY_NAME_PROM", payload: body.displayNameProm})
        }
        if ("emailProm" in body) {
          dispatch({type:"RESET_EMAIL_PROM", payload: body.emailProm})
        }
      }else if (response.status === 501) {
        window.alert("Wellcome. Please log in with your account name.");
      }else {
        window.alert("Internal server error, please try later");
      }
    } catch (err) {
      window.alert("Connection error, please try again");
    }

  }
  return (
    <div className="signup-page"> 
      <div className="signup-section-container">
        <form onSubmit={submitForm}>
          <div className="signup-items-container">
            <div className="signup-item">
              <label htmlFor="accountName" className="signup-item-label">Account name</label>
              <div>
                <label className="signup-item-prom">{accNameValidConst[accountNameProm]}</label>
                <input type="text" id="accountName" name="accountName" className="signup-item-input" value={accountName} maxLength="100" onChange={handleChange}/>
              </div>
            </div>
            <div className="signup-item">
              <label htmlFor="displayName" className="signup-item-label">Display name</label>
              <div>
                <label className="signup-item-prom">{disNameValidConst[displayNameProm]}</label>
                <input type="text" id="displayName" name="displayName" className="signup-item-input" value={displayName} maxLength="100" onChange={handleChange}/>
              </div>
            </div>
            <div className="signup-item">
              <label htmlFor="email" className="signup-item-label">Email</label>
              <div>
                <label className="signup-item-prom">{emailValidConst[emailProm]}</label>
                <input type="text" id="email" name="email" className="signup-item-input" value={email} maxLength="100" onChange={handleChange}/>
              </div>
            </div>
            <div className="signup-item">
              <label htmlFor="createPassword" className="signup-item-label">Password</label>
              <div>
                <label className="signup-item-prom">{passValidConst[createPasswordProm]}</label>
                <input type="password" id="createPassword" name="createPassword" className="signup-item-input" value={createPassword} maxLength="50" onChange={handleChange}/>
              </div>
            </div>
            <div className="signup-item">
              <label htmlFor="confirmPassword" className="signup-item-label">Confirm</label>
              <div>
                <label className="signup-item-prom">{passValidConst[confirmPasswordProm]}</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="signup-item-input" value={confirmPassword} maxLength="50" onChange={handleChange}/>
              </div>
            </div>
          </div>
          <input type="submit" className="btn signup-btn-submit" value="Submit"/>
        </form>
      </div>
    </div>
  );
}

export default Signup;
