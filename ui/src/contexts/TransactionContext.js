import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const TransactionContext = createContext();

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all transactions
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new transaction
  const addTransaction = useCallback(async (transactionData) => {
    try {
      const newTransaction = await api.addTransaction(transactionData);
      setTransactions(prev => [...prev, newTransaction]);
      return newTransaction;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update an existing transaction
  const updateTransaction = useCallback(async (id, updates) => {
    try {
      console.log('TransactionContext: Updating transaction', id, 'with updates:', updates);
      const updatedTransaction = await api.updateTransaction(id, updates);
      console.log('TransactionContext: Received updated transaction:', updatedTransaction);
      setTransactions(prev => 
        prev.map(t => t.id === id ? updatedTransaction : t)
      );
      console.log('TransactionContext: Updated local state');
      return updatedTransaction;
    } catch (err) {
      console.error('TransactionContext: Error updating transaction:', err);
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete a transaction
  const deleteTransaction = useCallback(async (id) => {
    try {
      console.log('TransactionContext: Deleting transaction', id);
      await api.deleteTransaction(id);
      console.log('TransactionContext: Transaction deleted from API');
      setTransactions(prev => prev.filter(t => t.id !== id));
      console.log('TransactionContext: Removed from local state');
    } catch (err) {
      console.error('TransactionContext: Error deleting transaction:', err);
      setError(err.message);
      throw err;
    }
  }, []);

  // Get monthly summary
  const getMonthlySummary = useCallback(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
  }, [transactions]);

  // Cleanup duplicates
  const cleanupDuplicates = useCallback(async () => {
    try {
      await api.cleanupDuplicates();
      await fetchTransactions(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchTransactions]);

  // Initial data fetch
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (isMounted) {
        await fetchTransactions();
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [fetchTransactions]);

  const value = {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getMonthlySummary,
    cleanupDuplicates,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
