import { create } from "zustand";
import User from "../classes/User";

type UserJson = ReturnType<typeof User.prototype.toJSON>

interface Props {
  logged: boolean;

  login(UserData: UserJson): void;
  logout(): void;
  setAdmin(value: boolean): void
}

const ProfileStore = create<UserJson & Props>((set) => ({
  id: "",
  name: "",
  admin: false,
  logged: false,
  login: (data) => set({ logged: true, ...data }),
  logout: () => set({ logged: false, id: "", admin: false }),
  setAdmin: (value) => set({admin: value})
}));

export default ProfileStore;
