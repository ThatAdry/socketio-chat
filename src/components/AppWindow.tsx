import { useEffect } from "react";
import ChatBox from "./chat/ChatBox";
import InputBar from "./input/InputBar";
import AddUserIcon from "./svg/24/AddUserIcon";
import ChatIcon from "./svg/24/ChatIcon";
import MoreIcon from "./svg/24/MoreIcon";
import Socket from "../socket-client";
import GroupStore from "../store/GroupStore";
import ChatStore from "../store/ChatStore";
import BubbleContainer from "../classes/BubbleContainer";
import AppStore from "../store/AppStore";
import ProfileStore from "../store/ProfileStore";
import UserListPopup from "./popup/UserListPopup";
import LinkPopup from "./popup/LinkPopup";

function AppWindow() {
  const myId = ProfileStore((state) => state.id);
  const setProfileAdmin = ProfileStore((state) => state.setAdmin);
  const logout = ProfileStore((state) => state.logout);
  const addUser = GroupStore((state) => state.addUser);
  const setAdmin = GroupStore((state) => state.setAdmin);
  const removeUser = GroupStore((state) => state.removeUser);
  const clearChat = GroupStore((state) => state.clearData);
  const insertBubble = ChatStore((state) => state.insert);
  const setPopupId = AppStore((state) => state.setPopupId);

  useEffect(() => {
    Socket.on("newUser", (user) => {
      addUser(user);
      insertBubble(new BubbleContainer({ type: "alert", level: "normal", description: user.name + " ha entrado al chat" }));
    });

    Socket.on("newAdmin", (user) => {
      setAdmin(user.id);
      if (user.id == myId) setProfileAdmin(true);
      insertBubble(new BubbleContainer({ type: "alert", level: "normal", description: user.id == myId ? user.name + " Ahora es administrador" : "Ahora eres Administrador" }));
    });

    Socket.on("leaveUser", (userId) => {
      const user = removeUser(userId);
      if (user) insertBubble(new BubbleContainer({ type: "alert", level: "warning", description: `${user.name} se ha ido del chat` }));
    });

    Socket.on("disconnect", () => {
      clearChat();
      setPopupId("");
      logout();
      history.pushState({}, "", "/");
    });

    return () => {
      Socket.off("newUser");
      Socket.off("newAdmin");
      Socket.off("leaveUser");
      Socket.off("disconnect");
    };
  });

  return (
    <div className="bg-gradient-to-t from-main-950 to-main-900 h-[100vh] mx-auto flex items-center justify-center">
      <div className="h-[40em] flex items-center justify-center gap-2 text-white">
        <div className="h-full w-[25em] bg-main-600 flex flex-col rounded-md overflow-hidden grow-0">
          <div className="flex border-b border-main-400 items-center gap-2 p-2 grow-0 shadow-md/20 z-1">
            <div className="flex items-center p-2">
              <ChatIcon />
            </div>
            <div>
              <h1 className="text-xl">Chat</h1>
              <p className="text-sm opacity-50">
                <UserCount />
              </p>
            </div>
            <div className="ml-auto flex items-center">
              <button className="text-white/75 hover:text-white cursor-pointer p-2" onClick={() => setPopupId("link")}>
                <AddUserIcon />
              </button>
              <button className="text-white/75 hover:text-white cursor-pointer p-2" onClick={() => setPopupId("userlist")}>
                <MoreIcon />
              </button>
            </div>
          </div>
          <div className="relative grow overflow-hidden">
            <ChatBox />
            <UserListPopup/>
            <LinkPopup/>
          </div>
          <InputBar />
        </div>
      </div>
    </div>
  );
}

const UserCount = () => {
  const users = GroupStore((state) => state.users);
  return users.length + " " + (users.length > 1 ? "users" : "user");
};

export default AppWindow;
