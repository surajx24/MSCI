import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AdminDashboard } from './components';
import { TransactionProvider } from './contexts/TransactionContext';
import './styles/main.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a365d', // MSCI's signature dark blue
      light: '#2d5a87',
      dark: '#0f1f2e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3182ce', // MSCI's secondary blue
      light: '#63b3ed',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7fafc', // MSCI's light gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c', // MSCI's dark text color
      secondary: '#4a5568', // MSCI's secondary text color
    },
    success: {
      main: '#38a169', // MSCI's green for positive values
      light: '#68d391',
      dark: '#2f855a',
    },
    error: {
      main: '#e53e3e', // MSCI's red for negative values
      light: '#fc8181',
      dark: '#c53030',
    },
    warning: {
      main: '#d69e2e', // MSCI's amber/warning color
    },
    info: {
      main: '#3182ce', // MSCI's info blue
    },
    divider: '#e2e8f0', // MSCI's subtle divider color
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
          textTransform: 'none',
          padding: '8px 16px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e8f0',
          padding: '12px 16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f7fafc',
          color: '#1a202c',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f7fafc',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    ...Array(20).fill('none'),
  ],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TransactionProvider>
        <AdminDashboard />
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App;
