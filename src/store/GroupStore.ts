import { create } from "zustand";
import Group from "../classes/Group";
import User from "../classes/User";

type GroupJson = ReturnType<typeof Group.prototype.toJSON>;
type UserJson = ReturnType<typeof User.prototype.toJSON>;

interface Props {
  getUser(id: string): UserJson | undefined;
  addUser(data: UserJson): void;
  setAdmin(id: string): void;
  removeUser(id: string): UserJson | undefined;

  setData(data: GroupJson): void;
  clearData(): void;
}

const GroupStore = create<GroupJson & Props>((set, get) => ({
  id: "",
  admin: new User(),
  users: [],

  getUser: (id) => get().users.find((user) => user.id == id),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  setAdmin: (id) => {
    const users = get().users;
    const user = get().getUser(id);
    if (user) {
      user.admin = true;
      set({ admin: user, users: [...users] });
    }
  },
  removeUser: (id) => {
    const users = get().users;
    const index = users.findIndex((user) => user.id == id);
    if (index != -1) {
      const user = users.splice(index, 1)[0];
      set({ users: [...users] });
      return user;
    } else return undefined;
  },
  setData: (data) => set({ ...data }),
  clearData: () => set({ id: "", admin: new User(), users: [] }),
}));

export default GroupStore;
