import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ 
    height: '120px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
    border: '1px solid #e2e8f0',
    '&:hover': {
      transform: 'translateY(-2px)',
      transition: 'all 0.2s ease-in-out',
    }
  }}>
    <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 500, mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ 
            fontWeight: 700, 
            color: color,
            letterSpacing: '-0.025em',
            mb: 1
          }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.2 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Avatar
          sx={{
            bgcolor: color,
            width: 48,
            height: 48,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;
