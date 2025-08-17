import React, { useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactionContext } from '../contexts/TransactionContext';

const ChartsSection = () => {
  const { transactions, loading } = useTransactionContext();

  // Generate expense categories data
  const expenseCategories = useMemo(() => {
    if (!transactions.length) return [];
    
    const expenseData = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};
    
    expenseData.forEach(transaction => {
      const category = transaction.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(transaction.amount);
    });
    
    // Rich, diverse colors for expense categories (avoiding red and green)
    const colors = [
      '#7c3aed', // Violet
      '#c026d3', // Fuchsia
      '#db2777', // Pink
      '#e11d48', // Rose
      '#ea580c', // Orange
      '#d97706', // Amber
      '#ca8a04', // Yellow
      '#0891b2', // Cyan
      '#0284c7', // Blue
      '#0d9488', // Teal
      '#7c2d12', // Brown
      '#92400e'  // Dark Amber
    ];
    
    return Object.entries(categoryTotals).map(([category, amount], index) => ({
      name: category,
      value: parseFloat(amount.toFixed(2)),
      color: colors[index % colors.length],
    }));
  }, [transactions]);

  // Generate income categories data
  const incomeCategories = useMemo(() => {
    if (!transactions.length) return [];
    
    const incomeData = transactions.filter(t => t.type === 'income');
    const categoryTotals = {};
    
    incomeData.forEach(transaction => {
      const category = transaction.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(transaction.amount);
    });
    
    // Rich, diverse colors for income categories (avoiding red and green)
    const colors = [
      '#0891b2', // Cyan
      '#0284c7', // Blue
      '#1d4ed8', // Indigo
      '#7c3aed', // Violet
      '#9333ea', // Purple
      '#c026d3', // Fuchsia
      '#db2777', // Pink
      '#e11d48', // Rose
      '#ea580c', // Orange
      '#d97706', // Amber
      '#ca8a04', // Yellow
      '#7c2d12'  // Brown
    ];
    
    return Object.entries(categoryTotals).map(([category, amount], index) => ({
      name: category,
      value: parseFloat(amount.toFixed(2)),
      color: colors[index % colors.length],
    }));
  }, [transactions]);

  if (loading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Expense Categories Pie Chart */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
          border: '1px solid #e2e8f0',
          height: '100%',
        }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
              Expense Categories
            </Typography>
            {expenseCategories.length === 0 ? (
              <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">No expense data available</Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={25}
                        paddingAngle={3}
                        dataKey="value"
                        labelLine={false}
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0];
                            const total = expenseCategories.reduce((sum, item) => sum + item.value, 0);
                            const percentage = ((data.value / total) * 100).toFixed(1);
                            return (
                              <Box
                                sx={{
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  padding: '12px 16px',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}
                              >
                                <Typography variant="body2" sx={{ fontWeight: 600, color: data.color }}>
                                  {data.name}
                                </Typography>
                                <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                                  ${data.value.toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {percentage}% of total expenses
                                </Typography>
                              </Box>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1} mt={1}>
                  {expenseCategories.map((item, index) => {
                    const total = expenseCategories.reduce((sum, cat) => sum + cat.value, 0);
                    const percentage = ((item.value / total) * 100).toFixed(1);
                    return (
                      <Box key={index} display="flex" alignItems="center" gap={0.5}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: item.color,
                          }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {item.name}: ${item.value.toLocaleString()} ({percentage}%)
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Income Categories Pie Chart */}
      <Grid item xs={12} md={6}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
          border: '1px solid #e2e8f0',
          height: '100%',
        }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
              Income Categories
            </Typography>
            {incomeCategories.length === 0 ? (
              <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">No income data available</Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incomeCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={25}
                        paddingAngle={3}
                        dataKey="value"
                        labelLine={false}
                      >
                        {incomeCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0];
                            const total = incomeCategories.reduce((sum, item) => sum + item.value, 0);
                            const percentage = ((data.value / total) * 100).toFixed(1);
                            return (
                              <Box
                                sx={{
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  padding: '12px 16px',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}
                              >
                                <Typography variant="body2" sx={{ fontWeight: 600, color: data.color }}>
                                  {data.name}
                                </Typography>
                                <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                                  ${data.value.toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {percentage}% of total income
                                </Typography>
                              </Box>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1} mt={1}>
                  {incomeCategories.map((item, index) => {
                    const total = incomeCategories.reduce((sum, cat) => sum + cat.value, 0);
                    const percentage = ((item.value / total) * 100).toFixed(1);
                    return (
                      <Box key={index} display="flex" alignItems="center" gap={0.5}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: item.color,
                          }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>
                          {item.name}: ${item.value.toLocaleString()} ({percentage}%)
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
