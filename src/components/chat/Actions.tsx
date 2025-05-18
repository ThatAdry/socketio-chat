import BubbleContainer from "../../classes/BubbleContainer";
import Socket from "../../socket-client";
import AppStore from "../../store/AppStore";
import ChatStore from "../../store/ChatStore";
import ProfileStore from "../../store/ProfileStore";
import ReactionIcon from "../svg/24/ReactionIcon";
import ReplyIcon from "../svg/24/ReplyIcon";
import TrashIcon from "../svg/24/TrashIcon";

export default function Actions({ container }: { container: BubbleContainer }) {
  const userId = ProfileStore((state) => state.id);
  const adminView = ProfileStore((state) => state.admin);
  const setReplyId = AppStore((state) => state.setReplyId);
  const setReactId = AppStore((state) => state.setReactId);
  const updateChat = ChatStore((state) => state.refresh);

  const onReply = () => setReplyId(container.id);
  const onReact = () => setReactId(container.id);
  const onDelete = () =>
    Socket.emit("deleteMessage", container.id, () => {
      container.setRemoved();
      updateChat();
    });

  return (
    <div className="flex items-center opacity-0 group-hover:opacity-100">
      {userId == container.authorId || adminView ? (
        <button className="p-1 cursor-pointer text-white/50 hover:text-white/80" onClick={onDelete}>
          <TrashIcon />
        </button>
      ) : null}
      <button className="p-1 cursor-pointer text-white/50 hover:text-white/80" onClick={onReact}>
        <ReactionIcon />
      </button>
      <button className="p-1 cursor-pointer text-white/50 hover:text-white/80" onClick={onReply}>
        <ReplyIcon />
      </button>
    </div>
  );
}
