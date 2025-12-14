import React, { useState } from 'react';
import { Plus, Search, Calendar as CalendarIcon, List, Video, MapPin, Bell, Clock } from 'lucide-react';

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

  const filteredAppointments = appointments.filter(apt =>
    apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyles = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  const groupedAppointments = filteredAppointments.reduce((groups, apt) => {
    const date = apt.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(apt);
    return groups;
  }, {});

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Appointments</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Manage appointments and schedules</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            view === 'list'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
          }`}
        >
          <List size={18} />
          List
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            view === 'calendar'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
          }`}
        >
          <CalendarIcon size={18} />
          Calendar
        </button>
      </div>

      {/* Search and Add */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
          />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Schedule</span>
        </button>
      </div>

      {/* Appointments List */}
      {view === 'list' && (
        <div className="flex-1 overflow-y-auto space-y-4">
          {Object.keys(groupedAppointments).sort().map((date) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                {new Date(date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              <div className="space-y-2">
                {groupedAppointments[date].map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{apt.clientName}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{apt.service}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyles(apt.status)}`}>
                        {apt.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Clock size={14} />
                        <span>{apt.time} ({apt.duration} min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        {apt.type === 'online' ? <Video size={14} /> : <MapPin size={14} />}
                        <span>{apt.location}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        with {apt.staffName}
                      </p>
                      <div className="flex items-center gap-2">
                        {apt.reminders.includes('email') && (
                          <span className="text-xs text-slate-500 dark:text-slate-400">📧</span>
                        )}
                        {apt.reminders.includes('sms') && (
                          <span className="text-xs text-slate-500 dark:text-slate-400">💬</span>
                        )}
                        {apt.type === 'online' && (
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            Join Call
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View (Simplified) */}
      {view === 'calendar' && (
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <div className="text-center py-12">
              <CalendarIcon size={48} className="mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Calendar view coming soon</p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Use list view to manage appointments</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Appointment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Schedule Appointment</h2>
            <div className="space-y-3">
              <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white">
                <option>Select Client</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Robert Williams</option>
              </select>
              <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white">
                <option>Select Staff</option>
                <option>Dr. Sarah Smith</option>
                <option>John Johnson</option>
              </select>
              <input
                type="text"
                placeholder="Service Type"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
                <input
                  type="time"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>
              <input
                type="number"
                placeholder="Duration (minutes)"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white">
                <option>In Person</option>
                <option>Online</option>
              </select>
              <input
                type="text"
                placeholder="Location / Room"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Reminders</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Email Reminder</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-slate-700 dark:text-slate-300">SMS Reminder</span>
                  </label>
                </div>
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
                  showNotification('Appointment scheduled successfully!');
                  setShowCreateModal(false);
                }}
                className="flex-1 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
