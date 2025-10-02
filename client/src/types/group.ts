import { IDocument, IUser, IExpense } from "./";

export interface IGroup extends IDocument {
  title: string;
  description: string;
  img?: string;
  users?: Omit<IUser, "password phoneNumber">[];
  expenses?: IExpense[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IGroupFormData {
  title: string;
  description: string;
  img?: string;
}

export interface IGroupWithSettlement {
  group: IGroup;
  settlement: SettlementResult;
}

interface Balance {
  userId: IUser["_id"];
  userName: IUser["name"];
  balance: number;
}

interface Settlement {
  from: IUser["_id"];
  fromName: IUser["name"];
  to: IUser["_id"];
  toName: IUser["name"];
  amount: number;
}

export interface SettlementResult {
  balances: Balance[];
  settlements: Settlement[];
  totalExpenses: number;
  perPersonShare: number;
}
