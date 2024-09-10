import {Link} from "../router.jsx"
function UserPanelNotLoggedIn() {
  return (
    <div className="user-panel-not-logged-in-page">
      <div className="user-panel-not-logged-in-content">
        <Link to="/login">Please login</Link>
      </div>
    </div>
  )
}

export default UserPanelNotLoggedIn;
