import AppStore from "../../store/AppStore";
import GroupStore from "../../store/GroupStore";
import LinkIcon from "../svg/24/LinkIcon";
import XMarkIcon from "../svg/24/XMarkIcon";

function LinkPopup() {
  const popupId = AppStore((state) => state.popupId);
  const setPopupId = AppStore((state) => state.setPopupId);
  const chatId = GroupStore((state) => state.id);

  if (popupId != "link") return null;

  const link = location.origin + "/" + chatId;
  const copyLink = () =>
    navigator.clipboard
      .writeText(link)
      .then(() => console.log("Texto copiado al portapapeles"))
      .catch((err) => console.error("Error al copiar: ", err));

  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/25 animate-appear">
      <div className="bg-main-500 border border-main-400 rounded-md shadow-md overflow-hidden">
        <div className="flex items-center">
          <button className="cursor-pointer p-2 text-white/75 hover:text-white" onClick={() => setPopupId("")}>
            <XMarkIcon />
          </button>
          <label>Invitation link</label>
        </div>
        <div className="flex items-center bg-main-700 p-1">
          <button className="cursor-pointer flex gap-2 p-2 bg-main-600 rounded border border-main-400 hover:bg-main-400" onClick={copyLink}>
            <LinkIcon />
            <span>Copy</span>
          </button>
          <label className="text-center underline px-5">{link}</label>
        </div>
      </div>
    </div>
  );
}

export default LinkPopup;
