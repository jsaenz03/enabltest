import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
} from '@mui/material';
import {
  People,
  ManageAccounts,
  Receipt,
  Warning,
  CalendarToday,
  Chat,
  TrendingUp,
} from '@mui/icons-material';

export default function DashboardView() {
  const stats = [
    {
      label: 'Clients',
      value: '24',
      icon: People,
      color: 'primary.main'
    },
    {
      label: 'Staff',
      value: '8',
      icon: ManageAccounts,
      color: 'success.main'
    },
    {
      label: 'Invoices',
      value: '5',
      icon: Receipt,
      color: 'warning.main'
    },
    {
      label: 'Incidents',
      value: '2',
      icon: Warning,
      color: 'error.main'
    }
  ];

  const upcomingAppointments = [
    { id: 1, client: 'John Doe', time: '10:00 AM', service: 'Occupational Therapy' },
    { id: 2, client: 'Jane Smith', time: '2:30 PM', service: 'Physiotherapy' },
    { id: 3, client: 'Robert Williams', time: '4:00 PM', service: 'Assessment' }
  ];

  const recentActivity = [
    { id: 1, text: 'New client record added: Sarah Johnson', time: '2 hours ago' },
    { id: 2, text: 'Invoice INV-2024-045 marked as paid', time: '3 hours ago' },
    { id: 3, text: 'Incident report reviewed and closed', time: '5 hours ago' },
    { id: 4, text: 'Appointment scheduled for next week', time: '1 day ago' }
  ];

  return (
    <Box className="hide-scrollbar" sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's your overview
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={3} key={index} sx={{ minWidth: 0, flex: 1 }}>
            <Card sx={{ height: '100%', width: '100%' }}>
              <CardContent sx={{ p: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: stat.color, width: 32, height: 32 }}>
                    <stat.icon sx={{ fontSize: 18 }} />
                  </Avatar>
                </Box>
                <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Appointments */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday />
            Today's Appointments
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {upcomingAppointments.length} scheduled
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {upcomingAppointments.map((apt, index) => (
            <React.Fragment key={apt.id}>
              <ListItem
                sx={{
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'action.selected',
                  }
                }}
              >
                <ListItemAvatar sx={{ minWidth: 48 }}>
                  <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main', display: 'block' }}>
                      {apt.time.split(' ')[0]}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {apt.time.split(' ')[1]}
                    </Typography>
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {apt.client}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {apt.service}
                    </Typography>
                  }
                />
              </ListItem>
              {index < upcomingAppointments.length - 1 && <Divider sx={{ my: 0.5 }} />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Recent Activity */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chat />
            Recent Activity
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {recentActivity.map((activity) => (
            <ListItem key={activity.id} sx={{ px: 0, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, width: '100%' }}>
                <Avatar sx={{ width: 8, height: 8, bgcolor: 'primary.main', mt: 0.75 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                    {activity.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Quick Actions */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ minWidth: 0, flex: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                p: 2,
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                textTransform: 'none',
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                }
              }}
            >
              <People sx={{ mb: 1, fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                Add Client
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3} sx={{ minWidth: 0, flex: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                p: 2,
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                textTransform: 'none',
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                }
              }}
            >
              <CalendarToday sx={{ mb: 1, fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                Schedule
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3} sx={{ minWidth: 0, flex: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                p: 2,
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                textTransform: 'none',
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                }
              }}
            >
              <Receipt sx={{ mb: 1, fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                Invoice
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3} sx={{ minWidth: 0, flex: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                p: 2,
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                textTransform: 'none',
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                }
              }}
            >
              <Warning sx={{ mb: 1, fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                Report
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
