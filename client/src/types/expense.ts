import { IDocument, IGroup, IUser } from "./";

export interface IExpense extends IDocument {
  description: string;
  amount: number;
  userId: IUser["_id"];
  groupId: IGroup["_id"];
  createdAt: Date;
  updatedAt: Date;
}
