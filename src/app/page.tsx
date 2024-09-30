'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { TransactionSummary } from '../components/TransactionSummary';
import { Transaction } from '../types/transaction';

export default function Dashboard() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchTransactions();
    }
  }, [session]);

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    if (response.ok) {
      const data = await response.json();
      setTransactions(data);
    }
  };

  const handleAddTransaction = async (newTransaction: Omit<Transaction, 'id' | 'userId'>) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      fetchTransactions();
    }
  };

  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-8">Financial Dashboard</h1>
      <TransactionSummary transactions={transactions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Add New Transaction</h2>
          <TransactionForm onSubmit={handleAddTransaction} />
        </div>
        <div>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}