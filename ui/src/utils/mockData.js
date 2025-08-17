// Mock transaction data
export const transactionData = [
  {
    id: 1,
    description: 'Website Design Project',
    amount: 2500.00,
    type: 'income',
    date: '2024-01-15',
    category: 'Services',
  },
  {
    id: 2,
    description: 'Office Supplies',
    amount: 125.50,
    type: 'expense',
    date: '2024-01-14',
    category: 'Office',
  },
  {
    id: 3,
    description: 'Client Consultation',
    amount: 500.00,
    type: 'income',
    date: '2024-01-13',
    category: 'Services',
  },
  {
    id: 4,
    description: 'Software Subscription',
    amount: 89.99,
    type: 'expense',
    date: '2024-01-12',
    category: 'Technology',
  },
  {
    id: 5,
    description: 'Marketing Campaign',
    amount: 750.00,
    type: 'expense',
    date: '2024-01-11',
    category: 'Marketing',
  },
  {
    id: 6,
    description: 'Product Sales',
    amount: 1200.00,
    type: 'income',
    date: '2024-01-10',
    category: 'Sales',
  },
  {
    id: 7,
    description: 'Travel Expenses',
    amount: 320.00,
    type: 'expense',
    date: '2024-01-09',
    category: 'Travel',
  },
  {
    id: 8,
    description: 'Consulting Fee',
    amount: 800.00,
    type: 'income',
    date: '2024-01-08',
    category: 'Services',
  },
];

// Mock data for charts
export const purchaseData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export const donutData = [
  { name: 'Completed', value: 63, color: '#38a169' }, // MSCI green
  { name: 'Remaining', value: 37, color: '#e2e8f0' }, // MSCI light gray
];

export const pieData = [
  { name: 'Desktop', value: 47.4, color: '#1a365d' }, // MSCI primary blue
  { name: 'Mobile', value: 33.1, color: '#3182ce' }, // MSCI secondary blue
  { name: 'Tablet', value: 10.5, color: '#d69e2e' }, // MSCI warning color
  { name: 'Other', value: 9, color: '#4a5568' }, // MSCI text secondary
];

// Utility function to calculate financial totals
export const calculateFinancialTotals = (transactions) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netBalance = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    netBalance
  };
};
