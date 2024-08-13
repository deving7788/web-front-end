import {UserSetting} from "../components"

function UserPanel() {
  console.log("test user panel");
  return (
    <div className="user-panel-page">
      <aside className="user-panel-left">
        <div>left</div>
        <div>left</div>
        <div>left</div>
      </aside>
      <div className="user-panel-middle">
        <div>middle</div>
        <div>middle</div>
        <div>middle</div>
        <div>middle</div>
      </div>
      <UserSetting/>
    </div>
  )

}

export default UserPanel;
