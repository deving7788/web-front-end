import {genGetReqWithRefreshToken} from "../utils";

async function authenticate({refreshToken, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail}) {
  const request = genGetReqWithRefreshToken("http://localhost:8080/api/user/panel", refreshToken);
  try {
    const response = await fetch(request);
    if (response.ok) {
      const body = await response.json();
      if (body.refreshToken) {
        localStorage.setItem("refreshToken", body.refreshToken);
      }
      updateLoggedIn(true)
      updateAccountName(body.accountName);
      updateDisplayName(body.displayName);
      updateRole(body.role);
      updateEmail(body.email);
    }else if (response.status === 401) {
      console.log("not logged in")
      //window.alert("please login")
    }else if (response.status ===500){
      window.alert("Internal server error. Please try later.");
    }
    
  }catch (err) {
    window.alert("Connection error. Please try again.");
    console.log(err);
  }
}

export default authenticate;

