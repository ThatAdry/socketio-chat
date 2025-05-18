export type ContentTypeMap = {
  text: { message: string };
  sticker: { id: number };
  alert: {
    level: "normal" | "warning" | "danger";
    description: string;
  };
  deleted: { text: string };
};

export type ContentType = {
  [K in keyof ContentTypeMap]: { type: K } & ContentTypeMap[K];
}[keyof ContentTypeMap];

export default class BubbleContainer {
  public id: number = -1;
  public content: ContentType;
  public replyId: number = -2;
  public authorId: string;
  public authorName: string;
  public reactions: { [key: string]: string[] } = {};
  public date: number = Date.now();

  constructor(content: ContentType, id?: number, authorId?: string, authorName?: string, replyId?: number) {
    this.content = content;
    this.id = id ?? -1;
    this.authorId = authorId ?? "none";
    this.authorName = authorName ?? "Anonimous";
    this.replyId = replyId ?? -1;
  }

  react(char: string, userId: string) {
    const reaction = this.reactions[char];
    if (reaction != undefined && reaction.includes(userId) == false) reaction.push(userId);
    else if (reaction == undefined) this.reactions[char] = [userId];
  }

  unReact(char: string, userId: string): boolean {
    const reaction = this.reactions[char];
    if (reaction == undefined) return false;
    const index = reaction.indexOf(userId);
    if (index != -1) reaction.splice(index, 1);
    return true;
  }

  hasReaction(userId: string, value: string) {
    const list = this.reactions[value];
    if (list) return list.includes(userId);
    return false;
  }

  setRemoved() {
    this.content = { type: "deleted", text: "Deleted Message" };
  }

  toJSON() {
    const { id, authorId, authorName, content, replyId, reactions, date } = this;
    return { id, authorId, authorName, content, replyId, reactions, date };
  }

  static fromJSON({ id, authorId, authorName, content, replyId, reactions, date }: ReturnType<typeof BubbleContainer.prototype.toJSON>) {
    const instace = new BubbleContainer(content, id, authorId, authorName, replyId);
    instace.reactions = reactions;
    instace.date = date;
    return instace;
  }
}
