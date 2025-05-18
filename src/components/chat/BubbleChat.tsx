import BubbleContainer from "../../classes/BubbleContainer";
import Time from "./Time";
import ReactionList from "./ReactionList";
import Actions from "./Actions";
import Reply from "./Reply";
import Stickers from "../../consts/stickers";

interface Props {
  container: BubbleContainer;
  aling: "left" | "right" | "center";
}

const itemsAling = { left: "items-start", center: "items-center", right: "items-end" };
const margin = { left: "mr-auto", center: "mx-auto", right: "ml-auto" };
const alertStyles = {
  normal: ["bg-emerald-300", "text-emerald-950"],
  warning: ["bg-yellow-300", "text-yellow-950"],
  danger: ["bg-red-400", "text-red-950"],
};

function BubbleChat({ container, aling }: Props) {
  const { content } = container;

  if (content.type == "text") {
    // TEXT
    return (
      <div className={`w-full py-1 group flex flex-col ${itemsAling[aling]}`} id={"bubble-" + container.id}>
        <div className={`flex ${aling == "left" ? "" : "flex-row-reverse"} w-full`}>
          <div className="bg-main-500 rounded w-fit max-w-8/11 px-2 py-1 shadow-md text-sm animate-bubble">
            <div className="flex gap-2 justify-between items-center">
              <label className="text-green-300 font-semibold text-shadow-md">{container.authorName}</label>
              <Time data={container.date} />
            </div>
            <Reply id={container.replyId} />
            <p className="wrap-anywhere">{content.message}</p>
          </div>
          <Actions container={container} />
        </div>
        <ReactionList container={container} />
      </div>
    );
  } else if (content.type == "sticker") {
    // STICKER
    const reply = container.replyId != -1;
    const background = reply ? "bg-main-500" : "";
    const border = reply ? "p-2 pt-0 gap-2" : "border border-main-400 mt-1";

    return (
      <div className={`w-full py-1 group flex flex-col ${itemsAling[aling]}`} id={"bubble-" + container.id}>
        <div className={`flex ${aling == "left" ? "" : "flex-row-reverse"}`}>
          <div className={`${background} rounded text-sm animate-bubble`}>
            <div className={`${margin[aling]} px-2 py-1 bg-main-500 rounded flex gap-2 items-center justify-between`}>
              <label className="text-green-300 font-semibold text-shadow-md">{container.authorName}</label>
              <Time data={container.date} />
            </div>
            <div className={`${margin[aling]} ${border} flex flex-col rounded-lg overflow-hidden w-fit`}>
              <Reply id={container.replyId} />
              <img className="aspect-square rounded" width={125} src={Stickers[content.id]} alt="Sticker" />
            </div>
          </div>
          <Actions container={container} />
        </div>
        <ReactionList container={container} />
      </div>
    );
  } else if (content.type == "alert") {
    // ALERT
    const [bgColor, textColor] = alertStyles[content.level];

    return (
      <div className={`w-full py-1 group flex flex-col items-center`} id={"bubble-" + container.id}>
        <div className={`flex justify-center w-full`}>
          <div className={`${bgColor} ${textColor} rounded w-fit max-w-8/11 px-2 py-1 shadow-md text-sm animate-bubble`}>
            <div className="flex gap-2 justify-between items-center">
              <p className="font-semibold">{content.description}</p>
              <Time data={container.date} />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (content.type == "deleted") {
    // DELETED
    return (
      <div className={`w-full my-1 group flex flex-col ${itemsAling[aling]}`} id={"bubble-" + container.id}>
        <div className={`flex ${aling == "left" ? "" : "flex-row-reverse"} w-full`}>
          <div className="bg-main-600 border border-main-400 rounded w-fit max-w-8/11 px-2 py-1 shadow-md text-sm">
            <div className="flex gap-2 justify-between items-center">
              <label className="text-white/50">Mensaje eliminado de {container.authorName}</label>
              <Time data={container.date} />
            </div>
          </div>
        </div>
        <ReactionList container={container} />
      </div>
    );
  }

  return null;
}

export default BubbleChat;
