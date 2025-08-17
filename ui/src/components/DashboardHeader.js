import React from 'react';
import { Box, Container, Paper, Typography, Avatar, IconButton, Badge } from '@mui/material';
import { Dashboard as DashboardIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

const DashboardHeader = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'linear-gradient(90deg, #1a365d 0%, #2d5a87 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <DashboardIcon sx={{ fontSize: 32, color: 'white', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.025em' }}>
              Admin Dashboard
            </Typography>
          </Box>

          {/* Profile Section */}
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton sx={{ color: 'white' }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: '#3182ce', width: 40, height: 40 }}>JP</Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                  Jane Pearson
                </Typography>
                <Typography variant="caption" sx={{ color: '#63b3ed' }}>
                  Administrator
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default DashboardHeader;
