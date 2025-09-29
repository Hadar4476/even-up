import { IUser } from "../types/user";
import { IExpense } from "../types/expense";

interface Balance {
  userId: string;
  userName: string;
  balance: number; // positive means they should receive, negative means they owe
}

interface Settlement {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  amount: number;
}

export interface SettlementResult {
  balances: Balance[];
  settlements: Settlement[];
  totalExpenses: number;
  perPersonShare: number;
}

/**
 * Calculate who owes whom in a group expense scenario
 * @param users - Array of populated user documents
 * @param expenses - Array of populated expense documents
 * @returns Settlement details showing who owes whom
 */
export function calculateSettlements(
  users: IUser[],
  expenses: IExpense[]
): SettlementResult {
  const numUsers = users.length;

  if (numUsers === 0) {
    return {
      balances: [],
      settlements: [],
      totalExpenses: 0,
      perPersonShare: 0,
    };
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Calculate what each person should pay
  const perPersonShare = totalExpenses / numUsers;

  // Calculate how much each person actually paid
  const userPayments = new Map<string, number>();
  const userNames = new Map<string, string>();

  // Initialize all users with 0 payments
  users.forEach((user: IUser) => {
    const userId = `${user._id}`;
    userPayments.set(userId, 0);
    userNames.set(userId, user.name);
  });

  // Sum up actual payments
  expenses.forEach((expense) => {
    const userId = expense.userId.toString();
    const currentPayment = userPayments.get(userId) || 0;
    userPayments.set(userId, currentPayment + expense.amount);
  });

  // Calculate balances (positive = should receive, negative = owes)
  const balances: Balance[] = Array.from(userPayments.entries()).map(
    ([userId, paid]) => ({
      userId,
      userName: userNames.get(userId) || "Unknown",
      balance: paid - perPersonShare,
    })
  );

  // Separate creditors (should receive money) and debtors (owe money)
  const creditors = balances
    .filter((b) => b.balance > 0.01) // Use small threshold to handle floating point
    .sort((a, b) => b.balance - a.balance);

  const debtors = balances
    .filter((b) => b.balance < -0.01)
    .sort((a, b) => a.balance - b.balance);

  // Calculate settlements using greedy algorithm
  const settlements: Settlement[] = [];
  const creditorBalances = creditors.map((c) => ({ ...c }));
  const debtorBalances = debtors.map((d) => ({ ...d }));

  let i = 0;
  let j = 0;

  while (i < creditorBalances.length && j < debtorBalances.length) {
    const creditor = creditorBalances[i];
    const debtor = debtorBalances[j];

    const amountToSettle = Math.min(creditor.balance, Math.abs(debtor.balance));

    if (amountToSettle > 0.01) {
      settlements.push({
        from: debtor.userId,
        fromName: debtor.userName,
        to: creditor.userId,
        toName: creditor.userName,
        amount: Math.round(amountToSettle * 100) / 100, // Round to 2 decimals
      });

      creditor.balance -= amountToSettle;
      debtor.balance += amountToSettle;
    }

    if (Math.abs(creditor.balance) < 0.01) i++;
    if (Math.abs(debtor.balance) < 0.01) j++;
  }

  return {
    balances: balances.map((b) => ({
      ...b,
      balance: Math.round(b.balance * 100) / 100,
    })),
    settlements,
    totalExpenses: Math.round(totalExpenses * 100) / 100,
    perPersonShare: Math.round(perPersonShare * 100) / 100,
  };
}
