import AppStore from "../../store/AppStore";
import ChatStore from "../../store/ChatStore";
import XMarkIcon from "../svg/24/XMarkIcon";

export default function ReplyFlag() {
  const replyIdFlag = AppStore((state) => state.replyId);
  const setReplyIdFlag = AppStore((state) => state.setReplyId);

  const getBubble = ChatStore((state) => state.getBubble);

  if (replyIdFlag == -1) return null;

  const bubble = getBubble(replyIdFlag);

  return (
    <div className="bg-main-800 text-white/75 flex items-center">
      <button className="cursor-pointer hover:text-white px-4 py-2" onClick={() => setReplyIdFlag(-1)}>
        <XMarkIcon />
      </button>
      <label>
        Reply to <span>{bubble?.authorName}</span>
      </label>
    </div>
  );
}