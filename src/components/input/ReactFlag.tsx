import Socket from "../../socket-client";
import AppStore from "../../store/AppStore";
import ChatStore from "../../store/ChatStore";
import ProfileStore from "../../store/ProfileStore";
import XMarkIcon from "../svg/24/XMarkIcon";

export default function ReactFlag() {
  const myId = ProfileStore((state) => state.id)
  const reactIdFlag = AppStore((state) => state.reactId);
  const setReactIdFlag = AppStore((state) => state.setReactId);
  const getBubble = ChatStore((state) => state.getBubble);
  const updateBubble = ChatStore((state) => state.modifyBubble);

  if (reactIdFlag == -1) return null;

  const bubble = getBubble(reactIdFlag)

  const reactions = ["😂", "😭", "😐", "🤨", "😡", "💀"].filter(emoji => bubble?.hasReaction(myId, emoji) == false);

  const reactMessage = (value: string) => {
    setReactIdFlag(-1)
    Socket.emit("reactMessage", value, reactIdFlag, () => {
      updateBubble(reactIdFlag, (bubble) => bubble.react(value, myId))
    })
  }

  return (
    <div className="bg-main-800 text-white/75 flex items-center">
      <button className="cursor-pointer hover:text-white px-4 py-2" onClick={() => setReactIdFlag(-1)}>
        <XMarkIcon />
      </button>
      <label>React</label>
      <div className="flex gap-1 px-2">
        {reactions.map((emoji, i) => (
          <button className="cursor-pointer hover:scale-120" onClick={() => reactMessage(emoji)} key={i}>{emoji}</button>
        ))}
      </div>
    </div>
  );
}