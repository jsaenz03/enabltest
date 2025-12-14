import React, { useState } from 'react';
import { Plus, Search, Download, DollarSign, FileText, CheckCircle, Clock } from 'lucide-react';

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

  const getStatusStyles = (status) => {
    switch(status) {
      case 'paid':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'overdue':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = filteredInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Invoices</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Manage invoices and payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Invoiced</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Paid</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">${paidAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">${pendingAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Create</span>
        </button>
      </div>

      {/* Invoice List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{invoice.invoiceNumber}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{invoice.clientName}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyles(invoice.status)}`}>
                {invoice.status.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{invoice.serviceDescription}</p>

            <div className="flex justify-between items-end">
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
                {invoice.status === 'paid' && <p className="text-green-600 dark:text-green-400">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</p>}
                {invoice.status !== 'paid' && invoice.dueDate && <p>Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">${invoice.amount.toFixed(2)}</p>
                <button className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Create Invoice</h2>
            <div className="space-y-3">
              <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white">
                <option>Select Client</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
              <input
                type="text"
                placeholder="Service Description"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <input
                type="date"
                placeholder="Service Date"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <input
                type="number"
                placeholder="Amount ($)"
                step="0.01"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <input
                type="date"
                placeholder="Due Date"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
              <textarea
                placeholder="Notes (optional)"
                rows="3"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
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
                  showNotification('Invoice created successfully!');
                  setShowCreateModal(false);
                }}
                className="flex-1 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
