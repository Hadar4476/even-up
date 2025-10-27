import { IDocument, IUser, IExpense, IGroupInvitationsData } from "./";

export interface IGroupState {
  selectedGroup: IGroupWithSettlement | null;
  groupsData: IGroupData;
  groupInvitationsData: IGroupInvitationsData;
  searchQuery: string;
  isInitialized: boolean;
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

export type GroupWithoutExpenses = Omit<IGroup, "expenses">;

export interface IPagination {
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface IGroupData {
  groups: GroupWithoutExpenses[];
  pagination: IPagination;
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
