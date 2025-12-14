import React, { useState } from 'react';
import { Send, Lock, Search, MessageSquare, User } from 'lucide-react';

export default function MessagesView({ showNotification }) {
  const [conversations, setConversations] = useState([
    {
      id: '1',
      clientName: 'John Doe',
      lastMessage: 'Thank you for the session today!',
      timestamp: '2024-12-10T14:30:00',
      unread: 2,
      encrypted: true
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      lastMessage: 'Can we reschedule tomorrow\'s appointment?',
      timestamp: '2024-12-10T10:15:00',
      unread: 0,
      encrypted: true
    },
    {
      id: '3',
      clientName: 'Robert Williams',
      lastMessage: 'I have a question about the exercises',
      timestamp: '2024-12-09T16:45:00',
      unread: 1,
      encrypted: true
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState({
    '1': [
      { id: 'm1', sender: 'client', text: 'Hi Dr. Smith, thank you for today\'s session!', timestamp: '2024-12-10T14:15:00' },
      { id: 'm2', sender: 'staff', text: 'You\'re welcome, John! Keep up the great work with your exercises.', timestamp: '2024-12-10T14:20:00' },
      { id: 'm3', sender: 'client', text: 'Will do! See you next week.', timestamp: '2024-12-10T14:30:00' }
    ],
    '2': [
      { id: 'm4', sender: 'client', text: 'Hi, something came up. Can we reschedule tomorrow\'s appointment?', timestamp: '2024-12-10T10:15:00' },
      { id: 'm5', sender: 'staff', text: 'Of course! Let me check available times.', timestamp: '2024-12-10T10:20:00' }
    ],
    '3': [
      { id: 'm6', sender: 'client', text: 'I have a question about the exercises you showed me', timestamp: '2024-12-09T16:45:00' }
    ]
  });

  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg = {
      id: `m${Date.now()}`,
      sender: 'staff',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMsg]
    }));

    setNewMessage('');
    showNotification('Message sent securely!');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-AU', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Messages</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
          <Lock size={14} />
          End-to-end encrypted messaging
        </p>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Conversations List */}
        <div className="w-full sm:w-80 flex flex-col">
          {/* Search */}
          <div className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedConversation === conv.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                } border border-slate-200 dark:border-slate-700`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold">{conv.clientName}</h3>
                  {conv.unread > 0 && (
                    <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className={`text-sm truncate ${
                  selectedConversation === conv.id
                    ? 'text-white/70 dark:text-slate-900/70'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {conv.lastMessage}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <span className={`text-xs ${
                    selectedConversation === conv.id
                      ? 'text-white/50 dark:text-slate-900/50'
                      : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {formatTime(conv.timestamp)}
                  </span>
                  {conv.encrypted && (
                    <Lock size={12} className={
                      selectedConversation === conv.id
                        ? 'text-white/50 dark:text-slate-900/50'
                        : 'text-slate-400'
                    } />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="hidden sm:flex flex-1 flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {conversations.find(c => c.id === selectedConversation)?.clientName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Lock size={12} />
                  Messages are encrypted
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {(messages[selectedConversation] || []).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'staff'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'staff'
                          ? 'text-white/50 dark:text-slate-900/50'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
