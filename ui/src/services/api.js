const API_BASE_URL = 'http://localhost:3001';

const request = async (endpoint, options = {}, isDelete = false) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // For DELETE requests with 204 status, return success without parsing JSON
    if (isDelete && response.status === 204) {
      return { success: true };
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

const api = {
  // Get all transactions
  getTransactions: () => request('/transactions'),
  
  // Get a single transaction
  getTransaction: (id) => request(`/transactions/${id}`),
  
  // Create a new transaction
  addTransaction: (transactionData) => request('/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  }),
  
  // Update an existing transaction
  updateTransaction: (id, transactionData) => {
    console.log('API: Updating transaction', id, 'with data:', transactionData);
    return request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData),
    });
  },
  
  // Delete a transaction
  deleteTransaction: (id) => {
    console.log('API: Deleting transaction', id);
    return request(`/transactions/${id}`, {
      method: 'DELETE',
    }, true); // Pass a flag to indicate this is a DELETE request
  },
  
  // Get monthly summary
  getMonthlySummary: () => request('/transactions/monthly-summary'),
  
  // Cleanup duplicates
  cleanupDuplicates: () => request('/transactions/cleanup/duplicates', {
    method: 'POST',
  }),
};

export default api;
