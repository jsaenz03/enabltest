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
  IconButton,
  Modal,
  Chip,
  Paper,
} from '@mui/material';
import {
  CloudUpload,
  Search,
  Download,
  Delete,
  InsertDriveFile,
  Description,
  Image,
  VideoFile,
  Visibility,
  Lock,
} from '@mui/icons-material';

export default function StorageView({ showNotification }) {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'John_Doe_Assessment_Report.pdf',
      clientName: 'John Doe',
      type: 'document',
      size: '2.4 MB',
      uploadedBy: 'Dr. Sarah Smith',
      uploadDate: '2024-12-01',
      category: 'assessments'
    },
    {
      id: '2',
      name: 'Therapy_Plan_Jane_Smith.pdf',
      clientName: 'Jane Smith',
      type: 'document',
      size: '1.8 MB',
      uploadedBy: 'John Johnson',
      uploadDate: '2024-12-05',
      category: 'therapy-plans'
    },
    {
      id: '3',
      name: 'Progress_Photo_Dec.jpg',
      clientName: 'John Doe',
      type: 'image',
      size: '856 KB',
      uploadedBy: 'Dr. Sarah Smith',
      uploadDate: '2024-12-08',
      category: 'progress-photos'
    },
    {
      id: '4',
      name: 'Exercise_Demo_Video.mp4',
      clientName: 'Jane Smith',
      type: 'video',
      size: '12.3 MB',
      uploadedBy: 'John Johnson',
      uploadDate: '2024-12-09',
      category: 'videos'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type) => {
    switch(type) {
      case 'image':
        return <Image sx={{ fontSize: 20, color: 'primary.main' }} />;
      case 'video':
        return <VideoFile sx={{ fontSize: 20, color: 'secondary.main' }} />;
      case 'document':
        return <Description sx={{ fontSize: 20, color: 'error.main' }} />;
      default:
        return <InsertDriveFile sx={{ fontSize: 20, color: 'text.secondary' }} />;
    }
  };

  const totalSize = files.reduce((sum, file) => {
    const size = parseFloat(file.size);
    const unit = file.size.includes('MB') ? 1024 : 1;
    return sum + (size * unit);
  }, 0);

  return (
    <Box className="hide-scrollbar" sx={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cloud Storage
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Secure document and file management
        </Typography>
      </Box>

      {/* Storage Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Total Files
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                {files.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Storage Used
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                {(totalSize / 1024).toFixed(1)} MB
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Storage Limit
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                10 GB
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          size="small"
        />
        <Select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="assessments">Assessments</MenuItem>
          <MenuItem value="therapy-plans">Therapy Plans</MenuItem>
          <MenuItem value="progress-photos">Progress Photos</MenuItem>
          <MenuItem value="videos">Videos</MenuItem>
          <MenuItem value="reports">Reports</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={() => setShowUploadModal(true)}
          sx={{ minWidth: { xs: 'auto', sm: 120 } }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Upload
          </Box>
        </Button>
      </Box>

      {/* Files List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {filteredFiles.map((file) => (
          <Card key={file.id} sx={{ mb: 2, '&:hover': { boxShadow: 2 } }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ flexShrink: 0, mt: 0.5 }}>
                  {getFileIcon(file.type)}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Client: {file.clientName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Size: {file.size}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        By: {file.uploadedBy}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Chip
                    label={file.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton size="small" title="Preview">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    title="Download"
                    onClick={() => showNotification('Downloading file...')}
                  >
                    <Download fontSize="small" />
                  </IconButton>
                  <IconButton size="small" title="Delete" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Upload Modal */}
      <Modal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        aria-labelledby="upload-file-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
        }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Upload File
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Select size="small" defaultValue="" fullWidth>
              <MenuItem value="" disabled>Select Client</MenuItem>
              <MenuItem value="john">John Doe</MenuItem>
              <MenuItem value="jane">Jane Smith</MenuItem>
              <MenuItem value="robert">Robert Williams</MenuItem>
            </Select>

            <Select size="small" defaultValue="" fullWidth>
              <MenuItem value="" disabled>Select Category</MenuItem>
              <MenuItem value="assessments">Assessments</MenuItem>
              <MenuItem value="therapy-plans">Therapy Plans</MenuItem>
              <MenuItem value="progress-photos">Progress Photos</MenuItem>
              <MenuItem value="videos">Videos</MenuItem>
              <MenuItem value="reports">Reports</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>

            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed',
                borderColor: 'divider',
                bgcolor: 'action.hover',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.selected',
                }
              }}
            >
              <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Click to upload or drag and drop
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Max file size: 10MB
              </Typography>
              <input type="file" style={{ display: 'none' }} />
            </Paper>

            <Paper sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Lock sx={{ fontSize: 14 }} />
                All files are encrypted and stored securely in compliance with NDIS requirements
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setShowUploadModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                showNotification('File uploaded successfully!');
                setShowUploadModal(false);
              }}
              fullWidth
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
