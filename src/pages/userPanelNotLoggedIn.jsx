import {Link} from "../router.jsx"
function UserPanelNotLoggedIn() {
  return (
    <div>
      <div className="not-loggedin-page">
        <Link to="/login">Please login</Link>
      </div>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  )
}

export default UserPanelNotLoggedIn;
