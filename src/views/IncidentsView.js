import React, { useState } from 'react';
import { Plus, Search, AlertTriangle, Eye, FileText, Clock } from 'lucide-react';

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

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'moderate':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case 'reviewed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'under_review':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'pending':
        return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Incidents</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Report and manage incident reports</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">High Severity</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {incidents.filter(i => i.severity === 'high').length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Moderate Severity</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {incidents.filter(i => i.severity === 'moderate').length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {incidents.filter(i => i.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
          />
        </div>
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
        >
          <option value="all">All Severity</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Report</span>
        </button>
      </div>

      {/* Incident List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-red-600 dark:text-red-400 mt-0.5" size={18} />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{incident.incidentNumber}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{incident.clientName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityStyles(incident.severity)}`}>
                  {incident.severity.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyles(incident.status)}`}>
                  {incident.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{incident.description}</p>

            <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Actions Taken:</p>
              <p className="text-sm text-slate-900 dark:text-white">{incident.actionsTaken}</p>
            </div>

            <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
              <div className="space-y-1">
                <p className="flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(incident.date).toLocaleDateString()} at {incident.time}
                </p>
                <p>Reported by: {incident.reporter}</p>
              </div>
              <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                <Eye size={14} />
                View Full Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Incident Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Report Incident</h2>
            <div className="space-y-3">
              <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white">
                <option>Select Client</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Robert Williams</option>
              </select>
              <textarea
                placeholder="Incident Description"
                rows="4"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  placeholder="Date"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
                <input
                  type="time"
                  placeholder="Time"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>
              <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white">
                <option>Select Severity</option>
                <option>High</option>
                <option>Moderate</option>
                <option>Low</option>
              </select>
              <textarea
                placeholder="Actions Taken"
                rows="3"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  <AlertTriangle size={14} className="inline mr-1" />
                  High severity incidents will be escalated immediately
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showNotification('Incident report submitted successfully!');
                  setShowCreateModal(false);
                }}
                className="flex-1 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
