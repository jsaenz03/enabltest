import React, { useState } from 'react';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import DashboardView from './views/DashboardView';
import ClientsView from './views/ClientsView';
import StaffView from './views/StaffView';
import InvoicesView from './views/InvoicesView';
import IncidentsView from './views/IncidentsView';
import AppointmentsView from './views/AppointmentsView';
import MessagesView from './views/MessagesView';
import StorageView from './views/StorageView';
import SettingsView from './views/SettingsView';
import Navigation from './components/Navigation';
import { CustomThemeProvider, useAppTheme } from './theme/ThemeProvider';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notification, setNotification] = useState(null);
  useAppTheme(); // Keep the hook to ensure theme context is available

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          height: '100dvh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          bgcolor: 'background.paper',
          boxShadow: 24,
          transition: 'background-color 0.3s ease',
          px: 0,
        }}
      >
        {/* Notification Snackbar */}
        <Snackbar
          open={!!notification}
          autoHideDuration={3000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            mt: 2,
            zIndex: 9999,
          }}
        >
          <Alert
            onClose={() => setNotification(null)}
            severity="info"
            sx={{
              width: '100%',
              bgcolor: 'grey.800',
              color: 'white',
              '& .MuiAlert-icon': {
                color: 'white',
              },
            }}
          >
            {notification}
          </Alert>
        </Snackbar>

        {/* Dynamic Content Area */}
        <Box
          className="hide-scrollbar"
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
            pb: 10,
            position: 'relative',
          }}
        >
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'clients' && <ClientsView showNotification={showNotification} />}
          {activeTab === 'staff' && <StaffView showNotification={showNotification} />}
          {activeTab === 'settings' && <SettingsView setActiveTab={setActiveTab} />}
          {activeTab === 'invoices' && <InvoicesView showNotification={showNotification} />}
          {activeTab === 'incidents' && <IncidentsView showNotification={showNotification} />}
          {activeTab === 'appointments' && <AppointmentsView showNotification={showNotification} />}
          {activeTab === 'messages' && <MessagesView showNotification={showNotification} />}
          {activeTab === 'storage' && <StorageView showNotification={showNotification} />}
        </Box>

        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </Container>
    </Box>
  );
};

export default function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}
