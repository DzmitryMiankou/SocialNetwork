type TargetAndSource = {
  firstName: string;
  lastName: string;
};

export interface MessageType {
  createdAt: string;
  sourceId: number;
  message: string;
  targetId: number;
  pathImg?: null | string;
  target: TargetAndSource;
  sources: TargetAndSource;
}

type BigMessageData = Omit<MessageType, "target" | "sources">;
type SmallMessageData = Pick<
  BigMessageData,
  "targetId" | "sourceId" | "createdAt"
>;
type SourcesAndTarget = Pick<MessageType, "target" | "sources">;
type Target = Pick<SourcesAndTarget, "target">["target"];
interface NewTar extends Target {
  id: number;
  email: string;
}
export interface MessagesType extends BigMessageData {
  id: NewTar["id"];
  updatedAt: null | string;
  target: NewTar;
}

export type DialoguesType = SmallMessageData & SourcesAndTarget;
