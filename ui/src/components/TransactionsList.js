import React, { useState, useMemo } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
import { FilterList as FilterIcon, Clear as ClearIcon, Download as DownloadIcon } from '@mui/icons-material';
import { useTransactionContext } from '../contexts/TransactionContext';

const TransactionsList = () => {
  const { transactions, loading } = useTransactionContext();
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  // Get unique categories for filter dropdown
  const uniqueCategories = useMemo(() => {
    const categories = [...new Set(transactions.map(t => t.category))];
    return categories.sort();
  }, [transactions]);

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter by search text (description)
    if (searchText) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchText.toLowerCase()) ||
        t.category.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    // Filter by date range
    if (dateFromFilter) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date + 'T00:00:00');
        const fromDate = new Date(dateFromFilter + 'T00:00:00');
        return transactionDate >= fromDate;
      });
    }

    if (dateToFilter) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date + 'T00:00:00');
        const toDate = new Date(dateToFilter + 'T23:59:59');
        return transactionDate <= toDate;
      });
    }

    // Sort by date (most recent first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, searchText, categoryFilter, typeFilter, dateFromFilter, dateToFilter]);

  // Clear all filters
  const clearFilters = () => {
    setSearchText('');
    setCategoryFilter('');
    setDateFromFilter('');
    setDateToFilter('');
    setTypeFilter('');
  };

  // Check if any filters are active
  const hasActiveFilters = searchText || categoryFilter || dateFromFilter || dateToFilter || typeFilter;

  // Export CSV function
  const exportToCSV = () => {
    if (filteredAndSortedTransactions.length === 0) return;

    // Create CSV content
    const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedTransactions.map(transaction => [
        transaction.date,
        `"${transaction.description.replace(/"/g, '""')}"`, // Escape quotes in description
        transaction.category,
        transaction.amount,
        transaction.type
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    // Generate filename with current date and filter info
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    let filename = `transactions_${dateStr}`;
    
    if (hasActiveFilters) {
      filename += '_filtered';
    }
    filename += '.csv';
    
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 2,
      border: '1px solid #e2e8f0',
      height: '100%',
      minHeight: '850px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header with Filter Toggle */}
      <Box sx={{
        p: 2,
        borderBottom: '1px solid #e2e8f0',
        bgcolor: '#f7fafc',
        flexShrink: 0
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            All Transactions ({filteredAndSortedTransactions.length})
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            {hasActiveFilters && (
              <Chip
                label={`${filteredAndSortedTransactions.length} of ${transactions.length}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            <IconButton
              size="small"
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                color: showFilters ? 'primary.main' : 'text.secondary',
                bgcolor: showFilters ? 'primary.light' : 'transparent'
              }}
            >
              <FilterIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Filter Controls */}
      <Collapse in={showFilters}>
        <Box sx={{
          p: 2,
          borderBottom: '1px solid #e2e8f0',
          bgcolor: '#fafbfc'
        }}>
          <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
            {/* Search Text Filter */}
            <TextField
              size="small"
              label="Search transactions"
              placeholder="Description or category..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ minWidth: 200 }}
            />

            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Type Filter */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>

            {/* Date From Filter */}
            <TextField
              size="small"
              label="From Date"
              type="date"
              value={dateFromFilter}
              onChange={(e) => setDateFromFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 130 }}
            />

            {/* Date To Filter */}
            <TextField
              size="small"
              label="To Date"
              type="date"
              value={dateToFilter}
              onChange={(e) => setDateToFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 130 }}
            />

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <IconButton
                size="small"
                onClick={clearFilters}
                sx={{ color: 'error.main' }}
                title="Clear all filters"
              >
                <ClearIcon />
              </IconButton>
            )}
          </Box>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
              {searchText && (
                <Chip
                  label={`Search: "${searchText}"`}
                  size="small"
                  variant="outlined"
                  onDelete={() => setSearchText('')}
                />
              )}
              {categoryFilter && (
                <Chip
                  label={`Category: ${categoryFilter}`}
                  size="small"
                  variant="outlined"
                  onDelete={() => setCategoryFilter('')}
                />
              )}
              {typeFilter && (
                <Chip
                  label={`Type: ${typeFilter}`}
                  size="small"
                  variant="outlined"
                  onDelete={() => setTypeFilter('')}
                  color={typeFilter === 'income' ? 'success' : 'error'}
                />
              )}
              {dateFromFilter && (
                <Chip
                  label={`From: ${new Date(dateFromFilter).toLocaleDateString()}`}
                  size="small"
                  variant="outlined"
                  onDelete={() => setDateFromFilter('')}
                />
              )}
              {dateToFilter && (
                <Chip
                  label={`To: ${new Date(dateToFilter).toLocaleDateString()}`}
                  size="small"
                  variant="outlined"
                  onDelete={() => setDateToFilter('')}
                />
              )}
            </Box>
          )}

          {/* Quick Date Presets */}
          <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
            <Chip
              label="All Available Data"
              size="small"
              variant="outlined"
              onClick={() => {
                if (transactions.length > 0) {
                  // Find the earliest and latest dates in the data
                  const dates = transactions.map(t => new Date(t.date));
                  const earliestDate = new Date(Math.min(...dates));
                  const latestDate = new Date(Math.max(...dates));

                  const fromDate = earliestDate.toISOString().split('T')[0];
                  const toDate = latestDate.toISOString().split('T')[0];

                  setDateFromFilter(fromDate);
                  setDateToFilter(toDate);
                }
              }}
              sx={{ cursor: 'pointer', bgcolor: 'primary.light', color: 'primary.contrastText' }}
            />
            <Chip
              label="Last 7 days"
              size="small"
              variant="outlined"
              onClick={() => {
                const today = new Date();
                const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                const fromDate = sevenDaysAgo.toISOString().split('T')[0];
                const toDate = today.toISOString().split('T')[0];
                setDateFromFilter(fromDate);
                setDateToFilter(toDate);
              }}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="This month"
              size="small"
              variant="outlined"
              onClick={() => {
                const today = new Date();
                const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                const fromDate = firstDay.toISOString().split('T')[0];
                const toDate = today.toISOString().split('T')[0];
                setDateFromFilter(fromDate);
                setDateToFilter(toDate);
              }}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Last month"
              size="small"
              variant="outlined"
              onClick={() => {
                const today = new Date();
                const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                const fromDate = firstDayLastMonth.toISOString().split('T')[0];
                const toDate = lastDayLastMonth.toISOString().split('T')[0];
                setDateFromFilter(fromDate);
                setDateToFilter(toDate);
              }}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="This year"
              size="small"
              variant="outlined"
              onClick={() => {
                const today = new Date();
                const firstDayYear = new Date(today.getFullYear(), 0, 1);
                const fromDate = firstDayYear.toISOString().split('T')[0];
                const toDate = today.toISOString().split('T')[0];
                setDateFromFilter(fromDate);
                setDateToFilter(toDate);
              }}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </Box>
      </Collapse>

      {/* Scrollable Content */}
      <Box sx={{
        flex: 1,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: '#f1f1f1',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: '#c1c1c1',
          borderRadius: '3px',
          '&:hover': {
            bgcolor: '#a8a8a8',
          },
        },
      }}>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary', bgcolor: '#f7fafc' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary', bgcolor: '#f7fafc' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary', bgcolor: '#f7fafc' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.primary', bgcolor: '#f7fafc' }}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Box display="flex" justifyContent="center" p={2}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : filteredAndSortedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Box p={2}>
                      <Typography color="text.secondary" mb={1}>
                        {hasActiveFilters ? 'No transactions match your filters' : 'No transactions found'}
                      </Typography>
                      {hasActiveFilters && (
                        <Typography variant="caption" color="text.secondary">
                          Try adjusting your filter criteria
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id} sx={{ '&:hover': { bgcolor: '#f7fafc' } }}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                        {transaction.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {transaction.category}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: transaction.type === 'income' ? 'success.main' : 'error.main',
                      }}
                    >
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: transaction.type === 'income' ? 'success.light' : 'error.light',
                        color: transaction.type === 'income' ? 'success.dark' : 'error.dark',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        border: `1px solid ${transaction.type === 'income' ? 'success.main' : 'error.main'}`,
                      }}
                    >
                      {transaction.type}
                    </Box>
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Export Button */}
      {filteredAndSortedTransactions.length > 0 && (
        <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', bgcolor: '#fafbfc' }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={exportToCSV}
            sx={{ textTransform: 'none' }}
          >
            Export CSV
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TransactionsList;
