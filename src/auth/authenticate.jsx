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
      window.alert("please login")
    }else if (response.status ===500){
      window.alert("Something wrong. Please try again.");
    }
    
  }catch (err) {
    console.log(err);
  }
}

export default authenticate;

