import React from 'react';
import { Grid } from '@mui/material';
import { AttachMoney as AttachMoneyIcon, RemoveCircle as RemoveCircleIcon, AccountBalance as AccountBalanceIcon } from '@mui/icons-material';
import StatCard from './StatCard';

const FinancialSummary = ({ totalIncome, totalExpenses, netBalance }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Grid container spacing={1} sx={{ mb: 1 }}>
      <Grid item xs={12} md={4}>
        <StatCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={<AttachMoneyIcon />}
          color="#38a169"
          subtitle={`From ${totalIncome > 0 ? 'various sources' : 'no sources yet'}`}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={<RemoveCircleIcon />}
          color="#e53e3e"
          subtitle={`Across ${totalExpenses > 0 ? 'multiple categories' : 'no categories yet'}`}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard
          title="Net Balance"
          value={formatCurrency(netBalance)}
          icon={<AccountBalanceIcon />}
          color={netBalance >= 0 ? '#38a169' : '#e53e3e'}
          subtitle={netBalance >= 0 ? 'Positive balance' : 'Negative balance'}
        />
      </Grid>
    </Grid>
  );
};

export default FinancialSummary;
