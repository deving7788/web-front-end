import Navbar from "./navbar";
import ColorTheme from "./colorTheme.jsx";
import {Link} from "../router.jsx";
import {useMainContext} from "../context/mainContext.jsx";
import {useUserPanelContext} from "../context/userPanelContext.jsx";
import {authenticate} from "../auth";

function TopBanner() {
  const {toggleSettingVisibility} = useUserPanelContext();
  const {displayName, loggedIn, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified} = useMainContext();
  function handleLoginClick() {
    if (loggedIn) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        authenticate({refreshToken, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified});
      }
      toggleSettingVisibility(true);
    }
  }

  return (
    <div className="top-banner">
      <div className="navbar-container"><Navbar/></div>
      <div className="top-banner-btns-container">
        <div className="signup-btn-container">
          <div className={loggedIn ? "signup-btn hidden" : "signup-btn btn"}>
            <Link to="/signup" className="router-link">Sign Up</Link>
          </div>
        </div>
        <div className="login-btn-container">
          <div className="login-btn btn" onClick={handleLoginClick}>
            <Link to={loggedIn ? "/user-panel" : "/login"} className="router-link">{loggedIn ? displayName : "Log In"}</Link>
          </div>
        </div>
        <div className="color-theme-btn-container">
          <ColorTheme/>
        </div>
      </div>
    </div>
  )
}

export default TopBanner; 
