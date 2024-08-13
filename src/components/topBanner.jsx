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
      authenticate({refreshToken, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified});
      toggleSettingVisibility(true);
    }
  }

  return (
    <div className="top-banner">
      <span><Navbar/></span>
      <span>
        <b className={loggedIn ? "btn-signup hidden" : "btn-signup btn"}>
          <Link to="/signup" className="router-link">Sign Up</Link>
        </b>
      </span>
      <span>
        <b className="btn-login btn" onClick={handleLoginClick}>
          <Link to={loggedIn ? "/user-panel" : "/login"} className="router-link">{loggedIn ? displayName : "Log In"}</Link>
        </b>
      </span>
      <span>
        <ColorTheme/>
      </span>
    </div>
  )
}

export default TopBanner; 
