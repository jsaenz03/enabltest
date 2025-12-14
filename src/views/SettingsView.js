import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
} from '@mui/material';
import {
  DarkMode,
  LightMode,
  Receipt,
  CalendarToday,
  Chat,
  FolderOpen,
  Warning,
  AccountCircle,
  Notifications,
  Extension,
} from '@mui/icons-material';
import { useAppTheme } from '../theme/ThemeProvider';

export default function SettingsView({ setActiveTab }) {
  const { darkMode, toggleDarkMode } = useAppTheme();

  const corporateFeatures = [
    { id: 'invoices', icon: Receipt, label: 'Accounting & Invoicing', description: 'Manage invoices and payments' },
    { id: 'appointments', icon: CalendarToday, label: 'Appointments', description: 'Schedule and manage appointments' },
    { id: 'messages', icon: Chat, label: 'Secure Messaging', description: 'Encrypted client communications' },
    { id: 'storage', icon: FolderOpen, label: 'Cloud Storage', description: 'Document management system' },
    { id: 'incidents', icon: Warning, label: 'Incidents & Reports', description: 'Report and track incidents' },
  ];

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your preferences and access corporate features
        </Typography>
      </Box>

      {/* Appearance */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Appearance</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Theme
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Choose your preferred colour scheme
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightMode sx={{ color: 'text.secondary' }} />
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="primary"
            />
            <DarkMode sx={{ color: 'text.secondary' }} />
          </Box>
        </Box>
      </Paper>

      {/* Corporate Features */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Corporate
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Access business management features
        </Typography>
        <List sx={{ p: 0 }}>
          {corporateFeatures.map((feature, index) => (
            <React.Fragment key={feature.id}>
              <ListItem
                button
                onClick={() => setActiveTab(feature.id)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: 'action.hover',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <feature.icon sx={{ fontSize: 20 }} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {feature.label}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {feature.description}
                    </Typography>
                  }
                />
              </ListItem>
              {index < corporateFeatures.length - 1 && <Divider variant="middle" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Profile */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Profile</Typography>
        <List sx={{ p: 0 }}>
          <ListItem
            button
            sx={{
              borderRadius: 1,
              mb: 1,
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'action.selected',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AccountCircle sx={{ color: 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Account Settings
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  Manage your account details
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            sx={{
              borderRadius: 1,
              mb: 1,
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'action.selected',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Notifications sx={{ color: 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Notifications
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  Configure email and SMS alerts
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            sx={{
              borderRadius: 1,
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'action.selected',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Extension sx={{ color: 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Integrations
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  Connect third-party services
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
