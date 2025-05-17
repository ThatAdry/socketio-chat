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
  const admin = GroupStore((state) => state.admin.id);
  const history = ChatStore((state) => state.history);
  const get = ChatStore((state) => state.getBubble);
  const save = ChatStore((state) => state.insertBubble);
  const updateBubble = ChatStore((state) => state.modifyBubble);
  const updateChat = ChatStore((state) => state.update);

  useEffect(() => {
    Socket.on("message", (content) => {
      save(BubbleContainer.fromJSON(content));
    });

    Socket.on("reactMessage", (value, id, userId) => {
      updateBubble(id, (bubble) => {
        bubble.react(value, userId);
      });
    });

    Socket.on("unReactMessage", (value, id, userId) => {
      updateBubble(id, (bubble) => {
        bubble.unReact(value, userId);
      });
    });

    Socket.on("deleteMessage", (id, from) => {
      const bubble = get(id);
      if (bubble && (bubble.authorId == from || admin == from)) {
        bubble.setRemoved();
        updateChat();
      }
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
        {history.map((bubble, i) => (
          <BubbleChat container={bubble} aling={myId == bubble.authorId ? "right" : "left"} key={i} />
        ))}
      </div>
    </StickyScroll>
  );
}

export default ChatBox;
