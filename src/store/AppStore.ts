import { create } from "zustand";

interface Props {
  replyId: number;
  reactId: number;
  popupId: string;
  stickerBar: boolean;
  setPopupId(value: string): void;
  setReplyId(value: number): void;
  setReactId(value: number): void;
  setStickerBar(value: boolean): void;
}

const AppStore = create<Props>((set) => ({
  popupId: "",
  replyId: -1,
  reactId: -1,
  stickerBar: false,
  setPopupId: (popupId) => set({ popupId }),
  setReplyId: (replyId) => set({ replyId }),
  setReactId: (reactId) => set({ reactId }),
  setStickerBar: (stickerBar) => set({ stickerBar }),
}));

export default AppStore;
