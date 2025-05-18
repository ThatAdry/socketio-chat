import AppStore from "../../store/AppStore";
import ChatStore from "../../store/ChatStore";
import XMarkIcon from "../svg/24/XMarkIcon";

export default function ReplyFlag() {
  const replyId = AppStore((state) => state.replyId);
  const setReplyId = AppStore((state) => state.setReplyId);

  const getBubble = ChatStore((state) => state.getBubble);

  if (replyId == -1) return null;

  const bubble = getBubble(replyId);

  return (
    <div className="bg-main-800 text-white/75 flex items-center">
      <button className="cursor-pointer hover:text-white px-4 py-2" onClick={() => setReplyId(-1)}>
        <XMarkIcon />
      </button>
      <label>
        Reply to <span>{bubble?.authorName}</span>
      </label>
    </div>
  );
}