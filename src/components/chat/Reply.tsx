import ChatStore from "../../store/ChatStore";
import Stickers from "../../consts/stickers";
import { ReactNode } from "react";

const ContainerReply = ({ id, children }: { id: number; children: ReactNode }) => (
  <a href={"#bubble-" + id} className="block bg-main-600 rounded px-2 py-1 my-1">
    {children}
  </a>
);

export default function Reply({ id }: { id: number }) {
  const getBubble = ChatStore((state) => state.getBubble);
  const reply = getBubble(id);

  if (reply == undefined) return null;

  const content = reply.content;

  if (content.type == "text") {
    return (
      <ContainerReply id={id}>
        <label className="text-green-300 font-semibold">{reply.authorName}</label>
        <p className="overflow-hidden text-ellipsis">{content.message}</p>
      </ContainerReply>
    );
  } else if (content.type == "sticker") {
    return (
      <ContainerReply id={id}>
        <label className="text-green-300 font-semibold">{reply.authorName}</label>
        <img className="mt-1 rounded" src={Stickers[content.id]} width={50} alt="" />
      </ContainerReply>
    );
  } else if (content.type == "deleted") {
    return (
      <ContainerReply id={id}>
        <label className="text-white/50">Message deleted</label>
      </ContainerReply>
    );
  } else return null;
}
