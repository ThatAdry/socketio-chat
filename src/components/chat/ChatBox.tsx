import { useEffect } from "react";
import BubbleChat from "./BubbleChat";
import BubbleContainer from "../../classes/BubbleContainer";
import StickyScroll from "../common/StickyScroll";
import Socket from "../../socket-client";
import ChatStore from "../../store/ChatStore";
import ProfileStore from "../../store/ProfileStore";
import GroupStore from "../../store/GroupStore";

function ChatBox() {
  const myId = ProfileStore((state) => state.id);
  const adminId = GroupStore((state) => state.admin.id);
  const chatHistory = ChatStore((state) => state.history);
  const insertBubble = ChatStore((state) => state.insert);
  const modifyBubble = ChatStore((state) => state.modify);

  useEffect(() => {
    Socket.on("message", (content) => {
      insertBubble(BubbleContainer.fromJSON(content));
    });

    Socket.on("reactMessage", (value, id, userId) => {
      modifyBubble(id, (bubble) => {
        bubble.react(value, userId);
      });
    });

    Socket.on("unReactMessage", (value, id, userId) => {
      modifyBubble(id, (bubble) => {
        bubble.unReact(value, userId);
      });
    });

    Socket.on("deleteMessage", (id, from) => {
      modifyBubble(id, (bubble) => {
        if (bubble.authorId == from || adminId == from) bubble.setRemoved();
      });
    });

    return () => {
      Socket.off("message");
      Socket.off("reactMessage");
      Socket.off("unReactMessage");
    };
  });

  return (
    <StickyScroll className="bg-main-700 scrollbar scrollbar-w-2 scrollbar-track-main-700 scrollbar-thumb-main-400 hover:scrollbar-thumb-main-300 h-full overflow-x-hidden overflow-y-scroll">
      <div className="bg-main-700 pl-2 pr-0.5 py-1 flex flex-col">
        {chatHistory.map((bubble, i) => (
          <BubbleChat container={bubble} aling={myId == bubble.authorId ? "right" : "left"} key={i} />
        ))}
      </div>
    </StickyScroll>
  );
}

export default ChatBox;
