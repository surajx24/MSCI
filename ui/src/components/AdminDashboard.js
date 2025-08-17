import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import FinancialSummary from './FinancialSummary';
import ChartsSection from './ChartsSection';
import TransactionManagement from './TransactionManagement';
import TransactionsList from './TransactionsList';
import { useTransactionContext } from '../contexts/TransactionContext';

const AdminDashboard = () => {
  const { transactions } = useTransactionContext();
  
  // Calculate totals from real transaction data
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
  const netBalance = totalIncome - totalExpenses;

  return (
    <Box sx={{ 
      flexGrow: 1, 
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ 
        py: 4, 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Main Layout - 70-30 Split */}
        <Grid container spacing={2}>
          {/* Left Side - 70% */}
          <Grid item xs={12} lg={8}>
            {/* Financial Summary Cards - Top Row */}
            <Box sx={{ mb: 2 }}>
              <FinancialSummary 
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                netBalance={netBalance}
              />
            </Box>

            {/* Charts Section - Middle Row */}
            <Box sx={{ mb: 2 }}>
              <ChartsSection />
            </Box>

            {/* Transaction Management - Bottom Row */}
            <Box>
              <TransactionManagement />
            </Box>
          </Grid>

          {/* Right Side - 30% */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ height: '600px' }}>
              <TransactionsList />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
