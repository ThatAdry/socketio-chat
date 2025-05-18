import BubbleContainer from "../../classes/BubbleContainer";
import Socket from "../../socket-client";
import ChatStore from "../../store/ChatStore";
import ProfileStore from "../../store/ProfileStore";

export default function ReactionList({ container }: { container: BubbleContainer }) {
  const myId = ProfileStore((state) => state.id);
  const updateChat = ChatStore((state) => state.refresh);

  const reactionList = Object.entries(container.reactions);
  const reactionCount = reactionList.reduce((count, array) => count + array[1].length, 0);

  if (reactionCount < 1) return null;

  const onUnReact = (value: string) => {
    if (container.hasReaction(myId, value)) {
      Socket.emit("unReactMessage", value, container.id, () => {
        container.unReact(value, myId);
        updateChat();
      });
    } else {
      Socket.emit("reactMessage", value, container.id, () => {
        container.react(value, myId);
        updateChat();
      });
    }
  };

  return (
    <div className="cursor-default bg-main-600 border border-main-400 rounded mt-1 shadow-md w-fit flex">
      <div className="rounded pl-1 pr-0.5 py-0.5 text-sm opacity-50">{reactionCount}</div>
      {reactionList.map(([emoji, users], i) =>
        users.length < 1 ? null : (
          <button className="cursor-pointer hover:scale-125 drop-shadow-none" key={i} onClick={() => onUnReact(emoji)}>
            {emoji}
          </button>
        )
      )}
    </div>
  );
}
