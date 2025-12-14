import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Grid,
  Chip,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as PlusIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as ClockIcon,
  Work as BriefcaseIcon,
} from '@mui/icons-material';

export default function StaffView({ showNotification }) {
  const [staff, setStaff] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Smith',
      role: 'Occupational Therapist',
      email: 'sarah.smith@enabl.com',
      phone: '0412 345 678',
      employmentType: 'Full-time',
      startDate: '2024-01-15',
      isActive: true
    },
    {
      id: '2',
      name: 'John Johnson',
      role: 'Physiotherapist',
      email: 'john.johnson@enabl.com',
      phone: '0423 456 789',
      employmentType: 'Part-time',
      startDate: '2024-03-01',
      isActive: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Staff
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage staff members and timesheets
        </Typography>
      </Box>

      {/* Search and Add */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          size="small"
        />
        <Button
          variant="contained"
          onClick={() => setShowAddModal(true)}
          startIcon={<PlusIcon />}
          sx={{ minWidth: 'fit-content' }}
        >
          Add Staff
        </Button>
      </Box>

      {/* Staff List */}
      <Box className="hide-scrollbar" sx={{ flex: 1, overflow: 'auto' }}>
        {filteredStaff.map((member) => (
          <Card key={member.id} sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              </Box>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BriefcaseIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {member.employmentType}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ClockIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Started {new Date(member.startDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {member.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.phone}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Chip
                  label={member.isActive ? 'Active' : 'Inactive'}
                  size="small"
                  color={member.isActive ? 'success' : 'error'}
                  sx={{ fontSize: '0.75rem' }}
                />
                <Button
                  size="small"
                  variant="text"
                  sx={{ textTransform: 'none' }}
                >
                  View Timesheet
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Staff Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        aria-labelledby="add-staff-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography id="add-staff-modal" variant="h6" component="h2" gutterBottom>
            Add New Staff Member
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField placeholder="Full Name" size="small" />
            <FormControl size="small">
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue="Therapist">
                <MenuItem value="Therapist">Therapist</MenuItem>
                <MenuItem value="Occupational Therapist">Occupational Therapist</MenuItem>
                <MenuItem value="Physiotherapist">Physiotherapist</MenuItem>
                <MenuItem value="Speech Pathologist">Speech Pathologist</MenuItem>
                <MenuItem value="Support Worker">Support Worker</MenuItem>
                <MenuItem value="Nurse">Nurse</MenuItem>
                <MenuItem value="Administrator">Administrator</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField type="email" placeholder="Email" size="small" />
            <TextField type="tel" placeholder="Phone" size="small" />
            <FormControl size="small">
              <InputLabel>Employment Type</InputLabel>
              <Select label="Employment Type" defaultValue="Full-time">
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Casual">Casual</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </Select>
            </FormControl>
            <TextField type="date" placeholder="Start Date" size="small" />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setShowAddModal(false)}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                showNotification('Staff member added successfully!');
                setShowAddModal(false);
              }}
              sx={{ flex: 1 }}
            >
              Add Staff
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
