import Expense from "../models/expense";

import { IGroup } from "../types/group";

interface UserBalance {
  userId: string;
  userName: string;
  balance: number; // positive = owed money, negative = owes money
}

interface DebtSettlement {
  from: string;
  to: string;
  amount: number;
}

/**
 * Calculate net balances for all users in a group
 */
export const calculateGroupBalances = async (
  group: IGroup
): Promise<UserBalance[]> => {
  // Fetching all expenses of a group by id:
  const expenses = await Expense.find({ groupId: group._id }).populate(
    "userId",
    "name"
  );

  // Initialize balances for all users
  const userBalances: Map<string, UserBalance> = new Map();

  group.users.forEach((user: any) => {
    userBalances.set(user._id.toString(), {
      userId: user._id.toString(),
      userName: user.name,
      balance: 0,
    });
  });

  // Calculate total expenses and what each person should pay
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const perPersonShare = totalExpenses / group.users.length;

  // Calculate what each person actually paid
  expenses.forEach((expense) => {
    const userId = expense.userId.toString();
    const userBalance = userBalances.get(userId);

    if (userBalance) {
      userBalance.balance += expense.amount;
    }
  });

  // Subtract what each person should have paid
  userBalances.forEach(({ balance }) => {
    balance -= perPersonShare;
    // Round to 2 decimal places to avoid floating point issues
    balance = Math.round(balance * 100) / 100;
  });

  return Array.from(userBalances.values());
};

/**
 * Calculate minimal debt settlements needed
 */
export const calculateSettlements = (
  balances: UserBalance[]
): DebtSettlement[] => {
  // Separate creditors (positive balance) and debtors (negative balance)
  const creditors = balances
    .filter((b) => b.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  const debtors = balances
    .filter((b) => b.balance < 0)
    .sort((a, b) => a.balance - b.balance);

  const settlements: DebtSettlement[] = [];

  let i = 0,
    j = 0;

  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];

    const settleAmount = Math.min(creditor.balance, -debtor.balance);

    if (settleAmount > 0.01) {
      // Ignore tiny amounts due to rounding
      settlements.push({
        from: debtor.userId,
        to: creditor.userId,
        amount: Math.round(settleAmount * 100) / 100,
      });
    }

    creditor.balance -= settleAmount;
    debtor.balance += settleAmount;

    if (creditor.balance < 0.01) i++;
    if (debtor.balance > -0.01) j++;
  }

  return settlements;
};

/**
 * Get comprehensive group financial summary
 */
export const getGroupSummary = async (group: IGroup) => {
  const balances = await calculateGroupBalances(group);
  const settlements = calculateSettlements([...balances]); // Pass copy since calculateSettlements modifies the array

  const totalExpenses = await Expense.aggregate([
    { $match: { groupId: group._id } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return {
    balances,
    settlements,
    totalExpenses: totalExpenses[0]?.total || 0,
    isSettled: settlements.length === 0,
  };
};
