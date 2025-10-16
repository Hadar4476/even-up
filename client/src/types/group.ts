import { IDocument, IUser, IExpense, IGroupInvitation } from "./";

export interface IGroupState {
  selectedGroup: IGroupWithSettlement | null;
  groups: Omit<IGroup, "expenses">[];
  groupInvitations: IGroupInvitation[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  error?: string | null;
}

export interface IGroup extends IDocument {
  title: string;
  description: string;
  img?: string;
  users?: Omit<IUser, "password phoneNumber">[] | null;
  expenses?: IExpense[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGroupFormData {
  title: string;
  description: string;
  img?: File | null;
}

export interface IGroupWithSettlement {
  group: IGroup;
  settlementResult?: ISettlementResult | null;
}

interface IBalance {
  userId: IUser["_id"];
  userName: IUser["name"];
  balance: number;
}

interface ISettlement {
  from: IUser["_id"];
  fromName: IUser["name"];
  to: IUser["_id"];
  toName: IUser["name"];
  amount: number;
}

export interface ISettlementResult {
  balances: IBalance[];
  settlements: ISettlement[];
  totalExpenses: number;
  perPersonShare: number;
}
