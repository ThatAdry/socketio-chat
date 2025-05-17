import { create } from "zustand";
import BubbleContainer from "../classes/BubbleContainer";

interface Props {
  history: BubbleContainer[];
  setHistory(data: BubbleContainer[]): void;
  getBubble(id: number): BubbleContainer | undefined;
  modifyBubble(id: number, callback: (item: BubbleContainer) => void): void;
  insertBubble(chatItem: BubbleContainer): void;
  removeBubble(id: number): void;
  update(): void
}

const ChatStore = create<Props>((set, get) => ({
  history: [],
  setHistory: (history) => set({ history }),
  getBubble: (id) => get().history.find((item) => item.id == id),

  modifyBubble: (id: number, callback) =>
    set((state) => {
      const bubble = state.history.find((bubble) => bubble.id == id);
      if (bubble) {
        callback(bubble);
        return { history: [...state.history] };
      } else return {};
    }),

  insertBubble: (bubble) =>
    set((state) => ({
      history: [...state.history, bubble],
    })),

  removeBubble: (id) =>
    set((state) => {
      const bubble = state.history.find((bubble) => bubble.id == id);
      if (bubble) {
        bubble.setRemoved();
        return { history: state.history };
      } else return {};
    }),
    update: () => set(state => ({ history: [...state.history] }))
}));

export default ChatStore;
