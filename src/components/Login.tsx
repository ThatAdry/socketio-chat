import { FormEvent, useEffect, useId, useState } from "react";
import Socket from "../socket-client";
import PlayIcon from "./svg/24/PlayIcon";
import XMarkIcon from "./svg/24/XMarkIcon";

function Login() {
  const InputId = useId();
  const [chatId, setChatId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Socket.on("connect_error", (err) => {
      setError(err.message);
    });

    const id = location.pathname.slice(1, location.pathname.length);
    if (id != "") setChatId(id);
    return () => {
      Socket.off("connect_error")
    }
  }, [chatId]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem(InputId) as HTMLInputElement;
    const chatId = location.pathname.slice(1, location.pathname.length);

    Socket.auth = { username: input.value.trim(), chatId };
    Socket.connect();
  };

  const removeId = () => {
    history.pushState({}, "", "/");
    setChatId("");
  };

  return (
    <div className="bg-gradient-to-t from-main-950 to-main-900 w-full h-full flex items-center justify-center text-white">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-center">CHAT</h1>
        <div className="space-y-1">
          <RoomCode id={chatId} onClick={removeId} />
          <Error text={error} />
        </div>
        <form action="" onSubmit={onSubmit} className="flex gap-2">
          <input className="bg-main-700 px-4 py-2 rounded-full outline-0 w-full" type="text" id={InputId} placeholder="Username..." maxLength={20} />
          <button type="submit" className="cursor-pointer bg-main-700 p-2 rounded-full hover:bg-main-600">
            <PlayIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

const RoomCode = ({ id, onClick }: { id: string; onClick: () => void }) => {
  if (id != "")
    return (
      <p className="text-main-100 flex gap-1 justify-start">
        Room code <span className="bg-main-700 rounded border border-main-400 px-1 font-semibold text-amber-50">{id}</span>
        <button className="cursor-pointer bg-main-700 border border-main-400 rounded p-1 hover:text-white" onClick={onClick}>
          <XMarkIcon width={16} height={16} />
        </button>
      </p>
    );
};

const Error = ({ text }: { text: string }) => {
  if (text != "")
    return (
      <p className="text-main-100">
        Error: <span className="bg-main-700 rounded border border-main-400 px-1 font-semibold text-red-50">{text}</span>
      </p>
    );
};

export default Login;
