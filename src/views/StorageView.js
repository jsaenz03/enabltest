import React, { useState } from 'react';
import { Upload, Search, Download, Trash2, File, FileText, Image, Video, Eye } from 'lucide-react';

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
        return <Image size={20} className="text-blue-600 dark:text-blue-400" />;
      case 'video':
        return <Video size={20} className="text-purple-600 dark:text-purple-400" />;
      case 'document':
        return <FileText size={20} className="text-red-600 dark:text-red-400" />;
      default:
        return <File size={20} className="text-slate-600 dark:text-slate-400" />;
    }
  };

  const totalSize = files.reduce((sum, file) => {
    const size = parseFloat(file.size);
    const unit = file.size.includes('MB') ? 1024 : 1;
    return sum + (size * unit);
  }, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Cloud Storage</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Secure document and file management</p>
      </div>

      {/* Storage Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Files</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{files.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Storage Used</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {(totalSize / 1024).toFixed(1)} MB
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Storage Limit</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">10 GB</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="assessments">Assessments</option>
          <option value="therapy-plans">Therapy Plans</option>
          <option value="progress-photos">Progress Photos</option>
          <option value="videos">Videos</option>
          <option value="reports">Reports</option>
          <option value="other">Other</option>
        </select>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <Upload size={18} />
          <span className="hidden sm:inline">Upload</span>
        </button>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getFileIcon(file.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white truncate mb-1">
                  {file.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <p>Client: {file.clientName}</p>
                  <p>Size: {file.size}</p>
                  <p>Uploaded: {new Date(file.uploadDate).toLocaleDateString()}</p>
                  <p>By: {file.uploadedBy}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded">
                    {file.category.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Preview"
                >
                  <Eye size={16} className="text-slate-600 dark:text-slate-400" />
                </button>
                <button
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Download"
                  onClick={() => showNotification('Downloading file...')}
                >
                  <Download size={16} className="text-slate-600 dark:text-slate-400" />
                </button>
                <button
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Upload File</h2>
            <div className="space-y-3">
              <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white">
                <option>Select Client</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Robert Williams</option>
              </select>
              
              <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white">
                <option>Select Category</option>
                <option>Assessments</option>
                <option>Therapy Plans</option>
                <option>Progress Photos</option>
                <option>Videos</option>
                <option>Reports</option>
                <option>Other</option>
              </select>

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto text-slate-400 mb-3" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Max file size: 10MB
                </p>
                <input type="file" className="hidden" />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  🔒 All files are encrypted and stored securely in compliance with NDIS requirements
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showNotification('File uploaded successfully!');
                  setShowUploadModal(false);
                }}
                className="flex-1 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
