import Navbar from "./navbar";
import ColorTheme from "./colorTheme.jsx";
import {Link} from "../router.jsx";
import {useMainContext} from "../context/mainContext.jsx";
import {useUserPanelContext} from "../context/userPanelContext.jsx";

function TopBanner() {
  const {loggedIn, displayName} = useMainContext();
  const {toggleSettingVisibility} = useUserPanelContext();
  function handleLoginClick() {
    toggleSettingVisibility(true);
  }

  return (
    <div className="top-banner">
      <span><Navbar/></span>
      <span>
        <b className={loggedIn ? "btn-signup btn hidden" : "btn-signup btn"}>
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
