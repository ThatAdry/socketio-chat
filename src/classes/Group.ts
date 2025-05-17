import User from "./User";
import generateID from "../backend/utils/randomID";

class Group {
  public id: string;
  public admin: User;
  public users: User[];
  public messageCount: number = 0;

  constructor(AdminUser: User, id?: string) {
    this.id = id ?? generateID(6);
    this.admin = AdminUser;
    this.users = [AdminUser];

    AdminUser.admin = true
  }

  getUser(id: string) {
    return this.users.find(user => user.id == id)
  }

  insertUser(user: User) {
    this.users.push(user);
  }

  removeUser(user: User) {
    const index = this.users.indexOf(user)
    this.users.splice(index,1)
  }

  toJSON() {
    const { id, admin, users } = this;
    return {
      id,
      admin: admin.toJSON(),
      users: users.map((user) => user.toJSON()),
    };
  }

  static fromJSON({ id, admin, users }: ReturnType<typeof Group.prototype.toJSON>) {
    const Instace = new Group(User.fromJSON(admin), id)
    Instace.users = users.map(user => User.fromJSON(user))
    return Instace
  }
}

export default Group;
