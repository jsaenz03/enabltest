import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  IconButton,
  Modal,
  Paper,
  Alert,
} from '@mui/material';
import {
  Add,
  Search,
  Warning,
  Visibility,
  Description,
  AccessTime,
} from '@mui/icons-material';

export default function IncidentsView({ showNotification }) {
  const [incidents, setIncidents] = useState([
    {
      id: '1',
      incidentNumber: 'INC-2024-001',
      clientName: 'John Doe',
      description: 'Client slipped on wet floor during therapy session',
      date: '2024-12-01',
      time: '14:30',
      severity: 'moderate',
      status: 'reviewed',
      reporter: 'Dr. Sarah Smith',
      actionsTaken: 'First aid provided, family notified, incident documented'
    },
    {
      id: '2',
      incidentNumber: 'INC-2024-002',
      clientName: 'Jane Smith',
      description: 'Equipment malfunction during physiotherapy',
      date: '2024-12-05',
      time: '10:15',
      severity: 'low',
      status: 'under_review',
      reporter: 'John Johnson',
      actionsTaken: 'Session paused, equipment removed from service'
    },
    {
      id: '3',
      incidentNumber: 'INC-2024-003',
      clientName: 'Robert Williams',
      description: 'Client experienced dizziness and shortness of breath',
      date: '2024-12-08',
      time: '11:00',
      severity: 'high',
      status: 'pending',
      reporter: 'Dr. Sarah Smith',
      actionsTaken: 'Emergency services called, family contacted'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high':
        return 'error';
      case 'moderate':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'reviewed':
        return 'success';
      case 'under_review':
        return 'warning';
      case 'pending':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box className="hide-scrollbar" sx={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Incidents
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Report and manage incident reports
        </Typography>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderLeft: 4, borderColor: 'error.main' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                High Severity
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {incidents.filter(i => i.severity === 'high').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderLeft: 4, borderColor: 'warning.main' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Moderate Severity
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {incidents.filter(i => i.severity === 'moderate').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Pending Review
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                {incidents.filter(i => i.status === 'pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search incidents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          size="small"
        />
        <Select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Severity</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="moderate">Moderate</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowCreateModal(true)}
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Report
          </Box>
        </Button>
      </Box>

      {/* Incident List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {filteredIncidents.map((incident) => (
          <Card key={incident.id} sx={{ mb: 2, '&:hover': { boxShadow: 2 } }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Warning sx={{ color: 'error.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {incident.incidentNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {incident.clientName}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={incident.severity.toUpperCase()}
                    color={getSeverityColor(incident.severity)}
                    size="small"
                  />
                  <Chip
                    label={incident.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(incident.status)}
                    size="small"
                  />
                </Box>
              </Box>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {incident.description}
              </Typography>

              <Paper sx={{ p: 2, bgcolor: 'action.hover', mb: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Actions Taken:
                </Typography>
                <Typography variant="body2">
                  {incident.actionsTaken}
                </Typography>
              </Paper>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(incident.date).toLocaleDateString()} at {incident.time}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Reported by: {incident.reporter}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  variant="outlined"
                >
                  View Full Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Create Incident Modal */}
      <Modal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        aria-labelledby="create-incident-modal"
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
            Report Incident
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Select size="small" defaultValue="" fullWidth>
              <MenuItem value="" disabled>Select Client</MenuItem>
              <MenuItem value="john">John Doe</MenuItem>
              <MenuItem value="jane">Jane Smith</MenuItem>
              <MenuItem value="robert">Robert Williams</MenuItem>
            </Select>

            <TextField
              placeholder="Incident Description"
              multiline
              rows={4}
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

            <Select size="small" defaultValue="" fullWidth>
              <MenuItem value="" disabled>Select Severity</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="moderate">Moderate</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>

            <TextField
              placeholder="Actions Taken"
              multiline
              rows={3}
              size="small"
              fullWidth
            />

            <Alert severity="warning" sx={{ mt: 1 }}>
              <Typography variant="caption">
                High severity incidents will be escalated immediately
              </Typography>
            </Alert>
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
                showNotification('Incident report submitted successfully!');
                setShowCreateModal(false);
              }}
              fullWidth
            >
              Submit Report
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
