import { useEffect } from "react";
import Login from "./components/Login";

import "./styles/index.css";
import Socket from "./socket-client";
import GroupStore from "./store/GroupStore";
import ProfileStore from "./store/ProfileStore";
import AppWindow from "./components/AppWindow";
import Group from "./classes/Group";
import AppStore from "./store/AppStore";

function App() {
  // user
  const setLogin = ProfileStore((state) => state.login);
  const setLogout = ProfileStore((state) => state.logout);

  // group
  const setGroupData = GroupStore((state) => state.setData);
  const clearGroupData = GroupStore((state) => state.clearData);

  // app
  const setPopupId = AppStore((state) => state.setPopupId);

  // states
  const logged = ProfileStore((state) => state.logged);

  useEffect(() => {
    Socket.on("logged", (data) => {
      setLogin(data.user);
      setGroupData(Group.fromJSON(data.group));
      setPopupId(data.group.users.length < 2 ? "link" : "");
      history.pushState({}, "", "/" + data.group.id);
    });

    Socket.on("disconnect", () => {
      setLogout();
      clearGroupData();
    });

    return () => {
      Socket.off("logged");
      Socket.off("disconnect");
    };
  });

  if (logged) {
    return <AppWindow></AppWindow>;
  } else {
    return <Login></Login>;
  }
}

export default App;
