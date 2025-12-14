import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
} from '@mui/material';
import {
  Send,
  Lock,
  Search,
  Chat,
  Person,
} from '@mui/icons-material';

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

  const selectedClientName = conversations.find(c => c.id === selectedConversation)?.clientName;

  return (
    <Box className="hide-scrollbar" sx={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Messages
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Lock sx={{ fontSize: 16 }} />
          End-to-end encrypted messaging
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', gap: 2, overflow: 'hidden' }}>
        {/* Conversations List */}
        <Box sx={{ width: { xs: '100%', sm: 320 }, display: 'flex', flexDirection: 'column' }}>
          {/* Search */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
              size="small"
            />
          </Box>

          {/* Conversation List */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <List sx={{ p: 0 }}>
              {filteredConversations.map((conv) => (
                <Paper
                  key={conv.id}
                  elevation={0}
                  sx={{
                    mb: 1,
                    cursor: 'pointer',
                    border: selectedConversation === conv.id ? 2 : 1,
                    borderColor: selectedConversation === conv.id ? 'primary.main' : 'divider',
                    bgcolor: selectedConversation === conv.id ? 'primary.main' : 'background.paper',
                    color: selectedConversation === conv.id ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      bgcolor: selectedConversation === conv.id ? 'primary.dark' : 'action.hover',
                    }
                  }}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {conv.clientName}
                      </Typography>
                      {conv.unread > 0 && (
                        <Chip
                          label={conv.unread}
                          size="small"
                          sx={{
                            bgcolor: 'error.main',
                            color: 'error.contrastText',
                            minWidth: 24,
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: selectedConversation === conv.id ? 'inherit' : 'text.secondary',
                        opacity: selectedConversation === conv.id ? 0.9 : 1,
                      }}
                    >
                      {conv.lastMessage}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: selectedConversation === conv.id ? 'inherit' : 'text.secondary',
                          opacity: selectedConversation === conv.id ? 0.7 : 1,
                        }}
                      >
                        {formatTime(conv.timestamp)}
                      </Typography>
                      {conv.encrypted && (
                        <Lock sx={{ fontSize: 12, opacity: 0.6 }} />
                      )}
                    </Box>
                  </Box>
                </Paper>
              ))}
            </List>
          </Box>
        </Box>

        {/* Messages Area */}
        <Paper
          sx={{
            flex: 1,
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {selectedClientName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Lock sx={{ fontSize: 12 }} />
                  Messages are encrypted
                </Typography>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {(messages[selectedConversation] || []).map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.sender === 'staff' ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        maxWidth: '70%',
                        bgcolor: msg.sender === 'staff' ? 'primary.main' : 'grey.100',
                        color: msg.sender === 'staff' ? 'primary.contrastText' : 'text.primary',
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        borderBottomLeftRadius: msg.sender === 'staff' ? 2 : 0.5,
                        borderBottomRightRadius: msg.sender === 'staff' ? 0.5 : 2,
                      }}
                    >
                      <Typography variant="body2">
                        {msg.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          opacity: 0.7,
                        }}
                      >
                        {formatTime(msg.timestamp)}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    size="small"
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send />
                  </IconButton>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chat sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
