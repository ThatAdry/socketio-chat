import { create } from "zustand";

interface Props {
  replyId: number;
  reactId: number;
  showStickerBar: boolean;
  popupId: string;
  setReplyId(value: number): void;
  setReactId(value: number): void;
  setStickerBar(value: boolean): void;
  setPopupId(value: string): void;
}

const AppStore = create<Props>((set) => ({
  replyId: -1,
  reactId: -1,
  showStickerBar: false,
  popupId: "",
  setReplyId: (replyId) => set({ replyId }),
  setReactId: (reactId) => set({ reactId }),
  setStickerBar: (showStickerBar) => set({ showStickerBar }),
  setPopupId: (popupId) => set({ popupId })
}));

export default AppStore;
