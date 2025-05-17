import generateID from "../backend/utils/randomID";

class User {
  id: string;
  name: string;
  admin: boolean;
  socketId: string;

  constructor(name?: string, id?: string, admin?: boolean, socketId?: string) {
    this.id = id ?? generateID(4);
    this.name = name ?? "";
    this.admin = admin ?? false;
    this.socketId = socketId ?? "";
  }

  toJSON() {
    const { id, name, admin } = this;
    return { id, name, admin };
  }

  static fromJSON({ name, id, admin }: ReturnType<typeof User.prototype.toJSON>) {
    return new User(name, id, admin);
  }
}

export default User;
