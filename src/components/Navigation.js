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
      }}
    >
      <BottomNavigation
        value={activeTab}
        onChange={handleChange}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            minWidth: 60,
            pt: 1,
            pb: 1,
            fontSize: '0.75rem',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            borderRadius: 2,
            mx: 0.5,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 4,
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.1)',
              },
            },
            '&:hover:not(.Mui-selected)': {
              color: 'text.secondary',
              bgcolor: 'action.hover',
            },
          },
        }}
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
