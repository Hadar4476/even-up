import { IDocument, IGroup, IUser, ISettlementResult } from "./";

export interface IExpense extends IDocument {
  description: string;
  amount: number;
  userId: IUser["_id"];
  groupId: IGroup["_id"];
  createdAt: Date;
  updatedAt: Date;
}

export interface IExpenseFormData {
  groupId: IGroup["_id"];
  description: string;
  amount: number;
}

export interface IExpenseWithSettlement {
  expense: IExpense;
  settlementResult: ISettlementResult;
}
