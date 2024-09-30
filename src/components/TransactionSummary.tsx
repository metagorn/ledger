import React from 'react';
import { Transaction } from '../types/transaction';

interface TransactionSummaryProps {
  transactions: Transaction[];
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-lg font-semibold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-lg font-semibold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Balance</p>
          <p className={`text-lg font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};