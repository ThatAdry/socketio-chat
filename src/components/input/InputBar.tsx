import { useRef } from "react";
import Socket from "../../socket-client";
import StickersIcon from "../svg/24/StickersIcon";
import SendIcon from "../svg/24/SendIcon";
import AppStore from "../../store/AppStore";
import ChatStore from "../../store/ChatStore";
import BubbleContainer from "../../classes/BubbleContainer";
import ProfileStore from "../../store/ProfileStore";
import ReactSelector from "./ReactSelector";
import ReplyFlag from "./ReplyFlag";
import StickerSelector from "./StickerSelector";

function InputBar() {
  const inputText = useRef<HTMLInputElement>(null);

  const myId = ProfileStore((state) => state.id);
  const myName = ProfileStore((state) => state.name);

  const replyIdFlag = AppStore((state) => state.replyId);
  const setReplyIdFlag = AppStore((state) => state.setReplyId);
  const setStickerBar = AppStore((state) => state.setStickerBar);

  const insertBubble = ChatStore((state) => state.insertBubble);

  const sendMessage = () => {
    if (inputText.current) {
      const message = inputText.current.value.trim();
      if (message != "") {
        inputText.current.value = "";
        const bubble = new BubbleContainer({ type: "text", message }, -1, myId, myName, replyIdFlag);
        Socket.emit("message", bubble.toJSON(), (res) => {
          bubble.id = res;
          setReplyIdFlag(-1);
          insertBubble(bubble);
        });
      }
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      sendMessage();
    }
  };

  const onSubmitMessage = () => sendMessage();
  const onOpenStickerBar = () => setStickerBar(true);

  return (
    <div className="border-t border-main-400">
      <ReplyFlag />
      <ReactSelector />
      <StickerSelector />
      <div className="p-2 grow-0 flex gap-2">
        <button className="text-white/75 hover:text-white cursor-pointer p-2" onClick={onOpenStickerBar}>
          <StickersIcon />
        </button>
        <input type="text" className="bg-main-700 px-4 py-2 rounded-md outline-0 w-full" placeholder="Type here..." autoComplete="off" ref={inputText} onKeyDown={onKeyDown} />
        <button className="text-white/75 hover:text-white cursor-pointer p-2" onClick={onSubmitMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default InputBar;
