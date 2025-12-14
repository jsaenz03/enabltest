import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', icon: DashboardIcon, label: 'Home' },
    { id: 'clients', icon: PeopleIcon, label: 'Clients' },
    { id: 'staff', icon: ManageAccountsIcon, label: 'Staff' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        pb: 2,
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <BottomNavigation
        value={activeTab}
        onChange={handleChange}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            minWidth: 60,
            pt: 1.5,
            pb: 1.5,
            fontSize: '0.75rem',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            borderRadius: 2,
            mx: 0.5,
            color: 'text.secondary',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'inherit',
              mt: 0.5,
              '&.Mui-selected': {
                fontSize: '0.8rem',
                fontWeight: 700,
              },
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.5rem',
              transition: 'transform 0.2s ease',
              color: 'inherit',
            },
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 3,
              transform: 'translateY(-2px)',
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.1)',
              },
            },
            '&:hover:not(.Mui-selected)': {
              color: 'text.primary',
              bgcolor: 'action.hover',
              transform: 'translateY(-1px)',
            },
            '&:not(.Mui-selected)': {
              '& .MuiSvgIcon-root': {
                opacity: 0.8,
              },
              '&:hover .MuiSvgIcon-root': {
                opacity: 1,
              },
            },
          },
        }}
        showLabels
      >
        {tabs.map((tab) => (
          <BottomNavigationAction
            key={tab.id}
            value={tab.id}
            icon={<tab.icon />}
            label={tab.label}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
