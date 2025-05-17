import AppStore from "../../store/AppStore";
import LinkPopup from "./LinkPopup";
import UserListPopup from "./UserListPopup";

function PopupBox() {
  const popupId = AppStore((state) => state.popupId);

  if (popupId == "userlist") {
    return <UserListPopup />;
  } else if (popupId == "link") {
    return <LinkPopup/>
  }
  return;
}

export default PopupBox;
