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
  Divider,
  Paper,
} from '@mui/material';
import {
  Add,
  Search,
  Download,
  AttachMoney,
  Description,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';

export default function InvoicesView({ showNotification }) {
  const [invoices, setInvoices] = useState([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      clientName: 'John Doe',
      serviceDescription: 'Occupational Therapy Session',
      date: '2024-12-01',
      amount: 150.00,
      status: 'paid',
      paidDate: '2024-12-05'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      clientName: 'Jane Smith',
      serviceDescription: 'Physiotherapy Consultation',
      date: '2024-12-03',
      amount: 200.00,
      status: 'pending',
      dueDate: '2024-12-17'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      clientName: 'John Doe',
      serviceDescription: 'Assessment Report',
      date: '2024-12-08',
      amount: 300.00,
      status: 'overdue',
      dueDate: '2024-12-08'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'pending':
        return <Schedule sx={{ fontSize: 16 }} />;
      case 'overdue':
        return <Schedule sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = filteredInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <Box className="hide-scrollbar" sx={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Invoices
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage invoices and payments
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Total Invoiced
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                ${totalAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Paid
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                ${paidAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Pending
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                ${pendingAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          size="small"
        />
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="overdue">Overdue</MenuItem>
        </Select>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowCreateModal(true)}
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Create
          </Box>
        </Button>
      </Box>

      {/* Invoice List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id} sx={{ mb: 2, '&:hover': { boxShadow: 2 } }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {invoice.invoiceNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {invoice.clientName}
                  </Typography>
                </Box>
                <Chip
                  label={invoice.status.toUpperCase()}
                  color={getStatusColor(invoice.status)}
                  icon={getStatusIcon(invoice.status)}
                  size="small"
                />
              </Box>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {invoice.serviceDescription}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Date: {new Date(invoice.date).toLocaleDateString()}
                  </Typography>
                  {invoice.status === 'paid' && (
                    <Typography variant="caption" color="success.main" sx={{ display: 'block' }}>
                      Paid: {new Date(invoice.paidDate).toLocaleDateString()}
                    </Typography>
                  )}
                  {invoice.status !== 'paid' && invoice.dueDate && (
                    <Typography variant="caption" color="text.secondary">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ${invoice.amount.toFixed(2)}
                  </Typography>
                  <IconButton size="small" color="primary">
                    <Download fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Create Invoice Modal */}
      <Modal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        aria-labelledby="create-invoice-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Create Invoice
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Select size="small" defaultValue="" fullWidth>
              <MenuItem value="" disabled>Select Client</MenuItem>
              <MenuItem value="john">John Doe</MenuItem>
              <MenuItem value="jane">Jane Smith</MenuItem>
            </Select>

            <TextField
              placeholder="Service Description"
              size="small"
              fullWidth
            />

            <TextField
              type="date"
              placeholder="Service Date"
              size="small"
              fullWidth
            />

            <TextField
              type="number"
              placeholder="Amount ($)"
              step="0.01"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <AttachMoney sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />,
              }}
            />

            <TextField
              type="date"
              placeholder="Due Date"
              size="small"
              fullWidth
            />

            <TextField
              placeholder="Notes (optional)"
              multiline
              rows={3}
              size="small"
              fullWidth
            />
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
                showNotification('Invoice created successfully!');
                setShowCreateModal(false);
              }}
              fullWidth
            >
              Create Invoice
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
