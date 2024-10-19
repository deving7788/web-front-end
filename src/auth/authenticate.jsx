import {genGetReqWithRefreshToken} from "../utils";
import {gohost} from "../assets/data.jsx";

async function authenticate({refreshToken, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified}) {
  const request = genGetReqWithRefreshToken(`${gohost}/api/user/panel`, refreshToken);
  try {
    const response = await fetch(request);
    if (response.ok) {
      const body = await response.json();
      if (body.refreshToken) {
        sessionStorage.setItem("refreshToken", body.refreshToken);
      }
      updateLoggedIn(true);
      updateAccountName(body.accountName);
      updateDisplayName(body.displayName);
      updateRole(body.role);
      updateEmail(body.email);
      updateEmailVerified(body.emailVerified);
    }else if (response.status === 401) {
      updateLoggedIn(false);
    }else if (response.status === 404) {
      console.log("404")
      updateLoggedIn(false);
    }else {
      window.alert("Internal server error. Please try later.");
    }
    
  }catch (err) {
    window.alert("Connection error. Please try again.");
  }
}

export default authenticate;

