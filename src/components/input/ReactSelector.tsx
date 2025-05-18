import Socket from "../../socket-client";
import AppStore from "../../store/AppStore";
import ChatStore from "../../store/ChatStore";
import ProfileStore from "../../store/ProfileStore";
import XMarkIcon from "../svg/24/XMarkIcon";

const reactionList = ["😂", "😭", "😐", "🤨", "😡", "💀"];

export default function ReactSelector() {
  const myId = ProfileStore((state) => state.id);
  const reactId = AppStore((state) => state.reactId);
  const setReactId = AppStore((state) => state.setReactId);
  const getBubble = ChatStore((state) => state.getBubble);
  const modifyBubble = ChatStore((state) => state.modify);

  if (reactId == -1) return null;

  const bubble = getBubble(reactId);
  const list = reactionList.filter((emoji) => bubble?.hasReaction(myId, emoji) == false);

  const reactMessage = (value: string) => {
    setReactId(-1);
    Socket.emit("reactMessage", value, reactId, () => {
      modifyBubble(reactId, (bubble) => bubble.react(value, myId));
    });
  };

  return (
    <div className="bg-main-800 text-white/75 flex items-center">
      <button className="cursor-pointer hover:text-white px-4 py-2" onClick={() => setReactId(-1)}>
        <XMarkIcon />
      </button>
      <label>React</label>
      <div className="flex gap-1 px-2">
        {list.map((emoji, i) => (
          <button className="cursor-pointer hover:scale-120" onClick={() => reactMessage(emoji)} key={i}>
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
