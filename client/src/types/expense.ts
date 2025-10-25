import { IDocument, IGroup, IUser, ISettlementResult } from "./";

export interface IExpense extends IDocument {
  description: string;
  amount: number;
  user: IUser["_id"];
  group: IGroup["_id"];
  createdAt: Date;
  updatedAt: Date;
}

export interface IExpenseFormData {
  group: IGroup["_id"];
  description: string;
  amount: number;
}

export interface IExpenseWithSettlement {
  expense: IExpense;
  settlementResult: ISettlementResult;
}
