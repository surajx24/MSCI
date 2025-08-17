import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTransactionContext } from '../contexts/TransactionContext';

const TransactionManagement = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactionContext();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  // Get the most recent transaction
  const mostRecentTransaction = transactions.length > 0 
    ? [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
    : null;

  const handleOpen = () => {
    setOpen(true);
    setEditingTransaction(null);
    setFormData({
      description: '',
      amount: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTransaction(null);
    setFormData({
      description: '',
      amount: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      description: transaction.description,
      amount: transaction.amount.toString(),
      category: transaction.category,
      type: transaction.type,
      date: transaction.date
    });
    setOpen(true);
  };

  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (transactionToDelete) {
      try {
        console.log('Deleting transaction:', transactionToDelete.id);
        await deleteTransaction(transactionToDelete.id);
        console.log('Transaction deleted successfully');
        setDeleteDialogOpen(false);
        setTransactionToDelete(null);
      } catch (error) {
        console.error('Failed to delete transaction:', error);
        alert(`Failed to delete transaction: ${error.message}`);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate amount is a positive number
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Amount must be a positive number');
      return;
    }
    
    try {
      if (editingTransaction) {
        console.log('Updating transaction:', editingTransaction.id, 'with data:', formData);
        const updateData = {
          ...formData,
          amount: amount // Ensure amount is a number
        };
        await updateTransaction(editingTransaction.id, updateData);
        console.log('Transaction updated successfully');
      } else {
        console.log('Adding new transaction:', formData);
        const addData = {
          ...formData,
          amount: amount // Ensure amount is a number
        };
        await addTransaction(addData);
        console.log('Transaction added successfully');
      }
      handleClose();
    } catch (error) {
      console.error('Failed to save transaction:', error);
      alert(`Failed to save transaction: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
      border: '1px solid #e2e8f0',
      height: '100%'
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Transaction Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Add Transaction
          </Button>
        </Box>

        {mostRecentTransaction ? (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Most Recent Transaction
            </Typography>
            <Box sx={{ 
              p: 2, 
              border: '1px solid #e2e8f0', 
              borderRadius: 2, 
              bgcolor: 'white',
              position: 'relative'
            }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {mostRecentTransaction.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {mostRecentTransaction.category} • {formatDate(mostRecentTransaction.date)}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: mostRecentTransaction.type === 'income' ? 'success.main' : 'error.main',
                      fontWeight: 700
                    }}
                  >
                    {mostRecentTransaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(mostRecentTransaction.amount)}
                  </Typography>
                </Box>
                <Chip
                  label={mostRecentTransaction.type}
                  size="small"
                  color={mostRecentTransaction.type === 'income' ? 'success' : 'error'}
                  variant="outlined"
                />
              </Box>
              
              <Box display="flex" gap={1} mt={2}>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(mostRecentTransaction)}
                  sx={{ color: 'primary.main' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(mostRecentTransaction)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No transactions yet. Add your first transaction to get started.
            </Typography>
          </Box>
        )}

        {/* Add/Edit Transaction Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" id="transaction-form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="dense"
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.amount}
                onChange={handleChange}
                required
                inputProps={{ min: 0, step: 0.01 }}
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="dense"
                name="category"
                label="Category"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.category}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              
              <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Type"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="expense">Expense</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                margin="dense"
                name="date"
                label="Date"
                type="date"
                fullWidth
                variant="outlined"
                value={formData.date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              type="submit"
              form="transaction-form"
              variant="contained" 
              disabled={!formData.description || !formData.amount || !formData.category}
            >
              {editingTransaction ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: 'error.main' }}>
            Delete Transaction
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to delete this transaction?
            </Typography>
            {transactionToDelete && (
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e2e8f0', 
                borderRadius: 2, 
                bgcolor: '#f8f9fa' 
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {transactionToDelete.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {transactionToDelete.category} • {formatDate(transactionToDelete.date)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: transactionToDelete.type === 'income' ? 'success.main' : 'error.main',
                    fontWeight: 600
                  }}
                >
                  {transactionToDelete.type === 'income' ? '+' : '-'}
                  {formatCurrency(transactionToDelete.amount)}
                </Typography>
              </Box>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button 
              onClick={handleDeleteConfirm}
              variant="contained" 
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TransactionManagement;
