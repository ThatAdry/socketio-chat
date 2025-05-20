import { create } from "zustand";
import BubbleContainer from "../classes/BubbleContainer";

interface Props {
  history: BubbleContainer[];
  setHistory(data: BubbleContainer[]): void;
  getBubble(id: number): BubbleContainer | undefined;
  modify(id: number, callback: (item: BubbleContainer) => void): void;
  insert(chatItem: BubbleContainer): void;
  remove(id: number): void;
  clearData(): void;
  refresh(): void
}

const ChatStore = create<Props>((set, get) => ({
  history: [],
  setHistory: (history) => set({ history }),
  getBubble: (id) => get().history.find((item) => item.id == id),
  modify: (id: number, callback) =>
    set((state) => {
      const bubble = state.history.find((bubble) => bubble.id == id);
      if (bubble) {
        callback(bubble);
        return { history: [...state.history] };
      } else return {};
    }),
  insert: (bubble) =>
    set((state) => ({
      history: [...state.history, bubble],
    })),
  remove: (id) =>
    set((state) => {
      const bubble = state.history.find((bubble) => bubble.id == id);
      if (bubble) {
        bubble.setRemoved();
        return { history: state.history };
      } else return {};
    }),
    clearData: () => set({ history: []}),
    refresh: () => set(state => ({ history: [...state.history] }))
}));

export default ChatStore;
