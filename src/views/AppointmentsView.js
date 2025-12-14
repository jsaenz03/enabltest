import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  IconButton,
  Modal,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  Add,
  Search,
  CalendarMonth,
  ViewList,
  VideoCall,
  LocationOn,
  Notifications,
  AccessTime,
  Mail,
  Sms,
} from '@mui/icons-material';

export default function AppointmentsView({ showNotification }) {
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      clientName: 'John Doe',
      staffName: 'Dr. Sarah Smith',
      service: 'Occupational Therapy',
      date: '2024-12-15',
      time: '10:00',
      duration: 60,
      type: 'in-person',
      location: 'Room 101',
      status: 'confirmed',
      reminders: ['email', 'sms']
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      staffName: 'John Johnson',
      service: 'Physiotherapy',
      date: '2024-12-15',
      time: '14:30',
      duration: 45,
      type: 'online',
      location: 'Video Call',
      status: 'pending',
      reminders: ['email']
    },
    {
      id: '3',
      clientName: 'Robert Williams',
      staffName: 'Dr. Sarah Smith',
      service: 'Assessment',
      date: '2024-12-16',
      time: '09:00',
      duration: 90,
      type: 'in-person',
      location: 'Room 102',
      status: 'confirmed',
      reminders: ['email', 'sms']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reminders, setReminders] = useState({ email: true, sms: true });

  const filteredAppointments = appointments.filter(apt =>
    apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const groupedAppointments = filteredAppointments.reduce((groups, apt) => {
    const date = apt.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(apt);
    return groups;
  }, {});

  return (
    <Box className="hide-scrollbar" sx={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage appointments and schedules
        </Typography>
      </Box>

      {/* View Toggle */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant={view === 'list' ? 'contained' : 'outlined'}
          onClick={() => setView('list')}
          startIcon={<ViewList />}
          sx={{ minWidth: 100 }}
        >
          List
        </Button>
        <Button
          variant={view === 'calendar' ? 'contained' : 'outlined'}
          onClick={() => setView('calendar')}
          startIcon={<CalendarMonth />}
          sx={{ minWidth: 100 }}
        >
          Calendar
        </Button>
      </Box>

      {/* Search and Add */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowCreateModal(true)}
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Schedule
          </Box>
        </Button>
      </Box>

      {/* Appointments List */}
      {view === 'list' && (
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {Object.keys(groupedAppointments).sort().map((date) => (
            <Box key={date} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {new Date(date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
              {groupedAppointments[date].map((apt) => (
                <Card key={apt.id} sx={{ mb: 2, '&:hover': { boxShadow: 2 } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {apt.clientName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {apt.service}
                        </Typography>
                      </Box>
                      <Chip
                        label={apt.status.toUpperCase()}
                        color={getStatusColor(apt.status)}
                        size="small"
                      />
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {apt.time} ({apt.duration} min)
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {apt.type === 'online' ?
                            <VideoCall sx={{ fontSize: 16, color: 'text.secondary' }} /> :
                            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                          }
                          <Typography variant="body2" color="text.secondary">
                            {apt.location}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        with {apt.staffName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {apt.reminders.includes('email') && (
                          <Mail sx={{ fontSize: 16, color: 'text.secondary' }} />
                        )}
                        {apt.reminders.includes('sms') && (
                          <Sms sx={{ fontSize: 16, color: 'text.secondary' }} />
                        )}
                        {apt.type === 'online' && (
                          <Button size="small" color="primary">
                            Join Call
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ))}
        </Box>
      )}

      {/* Calendar View (Simplified) */}
      {view === 'calendar' && (
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <CalendarMonth sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Calendar view coming soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use list view to manage appointments
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Create Appointment Modal */}
      <Modal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        aria-labelledby="create-appointment-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Schedule Appointment
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Select size="small" defaultValue="" fullWidth>
              <MenuItem value="" disabled>Select Client</MenuItem>
              <MenuItem value="john">John Doe</MenuItem>
              <MenuItem value="jane">Jane Smith</MenuItem>
              <MenuItem value="robert">Robert Williams</MenuItem>
            </Select>

            <Select size="small" defaultValue="" fullWidth>
              <MenuItem value="" disabled>Select Staff</MenuItem>
              <MenuItem value="sarah">Dr. Sarah Smith</MenuItem>
              <MenuItem value="john">John Johnson</MenuItem>
            </Select>

            <TextField
              placeholder="Service Type"
              size="small"
              fullWidth
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="time"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>

            <TextField
              type="number"
              placeholder="Duration (minutes)"
              size="small"
              fullWidth
            />

            <Select size="small" defaultValue="in-person" fullWidth>
              <MenuItem value="in-person">In Person</MenuItem>
              <MenuItem value="online">Online</MenuItem>
            </Select>

            <TextField
              placeholder="Location / Room"
              size="small"
              fullWidth
            />

            <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Reminders
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={reminders.email}
                      onChange={(e) => setReminders(prev => ({ ...prev, email: e.target.checked }))}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Mail sx={{ fontSize: 16 }} />
                      <Typography variant="body2">Email Reminder</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={reminders.sms}
                      onChange={(e) => setReminders(prev => ({ ...prev, sms: e.target.checked }))}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Sms sx={{ fontSize: 16 }} />
                      <Typography variant="body2">SMS Reminder</Typography>
                    </Box>
                  }
                />
              </Box>
            </Paper>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setShowCreateModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                showNotification('Appointment scheduled successfully!');
                setShowCreateModal(false);
              }}
              fullWidth
            >
              Schedule
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
