import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Switch,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import {
  Person,
  Settings,
  Security,
  Logout,
  DarkMode,
  LightMode,
  ChevronRight,
} from '@mui/icons-material';

export default function ProfileView({ darkMode, setDarkMode }) {
  return (
    <Box className="hide-scrollbar" sx={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column', pb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nurse Profile
      </Typography>

      {/* Profile Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
            <Person sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Sarah Jenkins, RN
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ICU • ID: RN-4921
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
              <Chip
                label="On Shift"
                size="small"
                color="success"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              12
            </Typography>
            <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              Patients
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              98%
            </Typography>
            <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              On Time
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              4
            </Typography>
            <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              Shifts
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Settings List */}
      <Card sx={{ mb: 3, flex: 1 }}>
        <List sx={{ p: 0 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'action.hover' }}>
                  <Settings />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="App Settings" />
              <ChevronRight sx={{ color: 'text.secondary' }} />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding>
            <ListItemButton onClick={() => setDarkMode(!darkMode)}>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'action.hover' }}>
                  {darkMode ? <LightMode sx={{ color: 'warning.main' }} /> : <DarkMode />}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Dark Mode" />
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                edge="end"
              />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'action.hover' }}>
                  <Security />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Security & ID" />
              <ChevronRight sx={{ color: 'text.secondary' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Card>

      <Button
        variant="outlined"
        color="error"
        startIcon={<Logout />}
        sx={{ mt: 'auto' }}
        fullWidth
      >
        Sign Out
      </Button>
    </Box>
  );
}
