import React from 'react';
import { Transaction } from '../types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.type === 'income' ? 'Income' : 'Expense'}</p>
                <p className="text-sm text-gray-500">{transaction.date.toLocaleDateString()}</p>
              </div>
              <div>
                <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            </div>
            {transaction.note && (
              <p className="mt-1 text-sm text-gray-500">{transaction.note}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};