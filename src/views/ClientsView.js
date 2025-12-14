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
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

export default function ClientsView({ showNotification }) {
  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      ndisNumber: 'NDIS123456',
      fundingType: 'NDIS',
      phone: '0412 345 678',
      email: 'john.doe@example.com',
      assignedProfessional: 'Dr. Smith'
    },
    {
      id: '2',
      name: 'Jane Smith',
      dateOfBirth: '1985-05-15',
      ndisNumber: 'NDIS789012',
      fundingType: 'Private',
      phone: '0423 456 789',
      email: 'jane.smith@example.com',
      assignedProfessional: 'Dr. Johnson'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ndisNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Clients
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage client records and information
        </Typography>
      </Box>

      {/* Search and Add */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search clients..."
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
          Add Client
        </Button>
      </Box>

      {/* Client List */}
      <Box className="hide-scrollbar" sx={{ flex: 1, overflow: 'auto' }}>
        {filteredClients.map((client) => (
          <Card key={client.id} sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {client.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    NDIS: {client.ndisNumber}
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

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(client.dateOfBirth).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Chip
                    label={client.fundingType}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {client.phone}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {client.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary">
                  Assigned to: <Box component="span" fontWeight="medium">{client.assignedProfessional}</Box>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Client Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        aria-labelledby="add-client-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography id="add-client-modal" variant="h6" component="h2" gutterBottom>
            Add New Client
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField placeholder="Full Name" size="small" />
            <TextField type="date" placeholder="Date of Birth" size="small" />
            <TextField placeholder="NDIS Number" size="small" />
            <FormControl size="small">
              <InputLabel>Funding Type</InputLabel>
              <Select label="Funding Type" defaultValue="NDIS">
                <MenuItem value="NDIS">NDIS</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="DVA">DVA</MenuItem>
                <MenuItem value="Medicare">Medicare</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField type="tel" placeholder="Phone" size="small" />
            <TextField type="email" placeholder="Email" size="small" />
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
                showNotification('Client added successfully!');
                setShowAddModal(false);
              }}
              sx={{ flex: 1 }}
            >
              Add Client
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
