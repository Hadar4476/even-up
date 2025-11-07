import { useState } from "react";

import commonUtils from "@/utils/common";

import { IExpense } from "@/types";

import { Stack, Typography } from "@mui/material";
import ExpenseItem from "./ExpenseItem";
import ExpenseEditor from "./ExpenseEditor";
import { Receipt } from "@mui/icons-material";

interface ExpensesListProps {
  expenses: IExpense[];
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  const [isInitiallyOpen, setIsInitiallyOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const handleSelectExpense = (expense: IExpense) => {
    setIsInitiallyOpen(true);
    setSelectedExpense(expense);
  };

  const handleClose = async () => {
    setIsInitiallyOpen(false);

    await commonUtils.sleep(0.5);
    setSelectedExpense(null);
  };

  const expenseElements = expenses.map((expense) => (
    <ExpenseItem
      key={expense._id}
      disabled={selectedExpense !== null}
      expense={expense}
      emitClick={handleSelectExpense}
    />
  ));

  return (
    <>
      <Stack className="!flex-row items-center py-4 gap-1">
        <Receipt className="!text-3xl" />
        <Typography variant="b_20">Recent Expenses</Typography>
      </Stack>
      <Stack className="gap-4">{expenseElements}</Stack>
      {selectedExpense && (
        <ExpenseEditor
          showButton={false}
          isInitiallyOpen={isInitiallyOpen}
          expense={selectedExpense}
          emitClose={handleClose}
        />
      )}
    </>
  );
};

export default ExpensesList;
