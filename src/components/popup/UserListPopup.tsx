import Socket from "../../socket-client";
import AppStore from "../../store/AppStore";
import GroupStore from "../../store/GroupStore";
import ProfileStore from "../../store/ProfileStore";
import CrownIcon from "../svg/24/CrownIcon";
import ExitIcon from "../svg/24/ExitIcon";
import XMarkIcon from "../svg/24/XMarkIcon";

function UserListPopup() {
  const myId = ProfileStore((state) => state.id);
  const users = GroupStore((state) => state.users);
  const adminId = GroupStore((state) => state.admin.id);

  const popupId = AppStore((state) => state.popupId);
  const setPopupId = AppStore((state) => state.setPopupId);

  
  if (popupId != "userlist") return null;

  const onClick = () => {
    Socket.disconnect();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/25 p-4 animate-appear">
      <div className="bg-main-500 border border-main-400 rounded shadow-md overflow-hidden">
        <div className="flex items-center text-white/75">
          <button className="cursor-pointer p-2 hover:text-white" onClick={() => setPopupId("")}>
            <XMarkIcon />
          </button>
          <label>Users</label>
          <div className="ml-auto">
            <button className="cursor-pointer p-2 hover:text-white flex gap-2" onClick={onClick}>
              Exit from the chat
              <ExitIcon />
            </button>
          </div>
        </div>
        <div className="bg-main-700">
          {users.map((user, i) => (
            <div className="flex justify-between" key={i}>
              <div className="flex gap-2 items-center p-2">
                <span className="text-white/50">{i + 1}</span>
                <label>{user.name}</label>
                {myId == user.id ? <span className="text-white/50">(Tu)</span> : null}
                {user.admin ? <CrownIcon /> : null}
              </div>
              {adminId == myId && user.id != myId ? (
                <button className="cursor-pointer p-2 text-white/75 hover:text-white" onClick={() => Socket.emit("kickUser", user.id)}>
                  <XMarkIcon />
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserListPopup;
