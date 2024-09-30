import React from 'react';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/mongodb'; 
import Transaction from '../../models/Transaction'; 

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    await connectToDatabase();
  } catch (error) {
    return res.status(500).json({ message: 'Database connection failed', error: error.message });
  }

  const userId = session.user.email; 


  if (req.method === 'POST') {
    const { amount, type, date, note } = req.body;
    
  
    if (!amount || !type || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      
      const newTransaction = new Transaction({ amount, type, date, note, userId });
      await newTransaction.save();
      return res.status(201).json(newTransaction); 
    } catch (error) {
      return res.status(500).json({ message: 'Failed to save transaction', error: error.message });
    }

  } else if (req.method === 'GET') {
    try {
      
      const transactions = await Transaction.find({ userId });
      return res.status(200).json(transactions); 
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
    }
  } else {
    
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}