import BubbleContainer from "../../classes/BubbleContainer";
import Stickers from "../../consts/stickers";
import Socket from "../../socket-client";
import AppStore from "../../store/AppStore";
import ChatStore from "../../store/ChatStore";
import ProfileStore from "../../store/ProfileStore";
import XMarkIcon from "../svg/24/XMarkIcon";

function StickerSelector() {
  const userId = ProfileStore((state) => state.id);
  const username = ProfileStore((state) => state.name);

  const replyId = AppStore((state) => state.replyId);
  const showStickerBar = AppStore((state) => state.stickerBar);

  const setReplyIdFlag = AppStore((state) => state.setReplyId);
  const setShowStickerBar = AppStore((state) => state.setStickerBar);

  const insertBubble = ChatStore((state) => state.insert);

  if (!showStickerBar) return;

  const closeStickerBar = () => setShowStickerBar(false);
  const sendSticker = (id: number) => {
    if (replyId != -1) setReplyIdFlag(-1);
    setShowStickerBar(false);

    const bubble = new BubbleContainer({ type: "sticker", id }, -1, userId, username, replyId);
    Socket.emit("message", bubble.content, bubble.replyId, (res) => {
      bubble.id = res;
      insertBubble(bubble);
    });
  };

  return (
    <div className="bg-main-800 pb-2">
      <div className="flex items-center text-white/75">
        <button className="cursor-pointer hover:text-white px-4 py-2" onClick={closeStickerBar}>
          <XMarkIcon />
        </button>
        <label className="text-center">Send a sticker</label>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {Stickers.map((sticker, i) => (
          <button className="cursor-pointer border border-main-400 rounded overflow-hidden hover:scale-110" key={i} onClick={() => sendSticker(i)}>
            <img src={sticker} width="75px" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default StickerSelector