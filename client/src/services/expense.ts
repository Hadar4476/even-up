import { api } from "./ApiService";

import {
  IExpense,
  IExpenseFormData,
  IExpenseWithSettlement,
  ISettlementResult,
} from "@/types";

const route = "/expense";

export const addExpense = async (
  expenseData: IExpenseFormData
): Promise<IExpenseWithSettlement> => {
  return api.post<IExpenseWithSettlement>(`${route}`, expenseData);
};

export const updateExpense = async ({
  expenseId,
  ...expenseData
}: {
  expenseId: IExpense["_id"];
} & IExpenseFormData): Promise<IExpenseWithSettlement> => {
  return api.put<IExpenseWithSettlement>(`${route}/${expenseId}`, expenseData);
};

export const deleteExpense = async (
  expenseId: IExpense["_id"]
): Promise<ISettlementResult> => {
  return api.delete<ISettlementResult>(`${route}/${expenseId}`);
};
