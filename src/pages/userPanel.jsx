import {UserSetting} from "../components"

function UserPanel() {
  return (
    <div className="user-panel-page">
      <aside className="user-panel-left">
        <div></div>
        <div></div>
        <div></div>
      </aside>
      <div className="user-panel-middle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <UserSetting/>
    </div>
  )

}

export default UserPanel;
