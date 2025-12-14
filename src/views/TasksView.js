import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Paper,
} from '@mui/material';
import {
  Add,
  Close,
  CheckCircle,
  AccessTime,
  Delete,
} from '@mui/icons-material';

export default function TasksView({ tasks, toggleTask, deleteTask, addTask, showNotification }) {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskRoom, setNewTaskRoom] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const getPriorityColor = (p) => {
    switch (p) {
      case 'STAT':
        return 'error';
      case 'Urgent':
        return 'warning';
      case 'Routine':
        return 'primary';
      default:
        return 'default';
    }
  };

  const handleAddTask = () => {
    if (!newTaskText || !newTaskRoom) return;
    const newTask = {
      id: Date.now().toString(),
      patientRoom: newTaskRoom,
      description: newTaskText,
      priority: 'Routine',
      completed: false,
      dueTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    addTask(newTask);
    setNewTaskText('');
    setNewTaskRoom('');
    setIsAdding(false);
    showNotification('Task added');
  };

  return (
    <Box className="hide-scrollbar" sx={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Shift Tasks
        </Typography>
        <IconButton
          onClick={() => setIsAdding(!isAdding)}
          color="primary"
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          {isAdding ? <Close /> : <Add />}
        </IconButton>
      </Box>

      {isAdding && (
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-4 border border-slate-200 dark:border-slate-700 animate-slideDown">
          <div className="flex gap-2 mb-2">
            <input
              value={newTaskRoom}
              onChange={(e) => setNewTaskRoom(e.target.value)}
              placeholder="Room #"
              className="w-1/3 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
            />
            <input
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Task description..."
              className="w-2/3 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
            />
          </div>
          <button
            onClick={handleAddTask}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-sm"
          >
            Add Task
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 pb-20">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              task.completed
                ? 'bg-slate-50 border-slate-100 opacity-60 dark:bg-slate-800/50 dark:border-slate-700'
                : 'bg-white border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-slate-300 hover:border-blue-500'
                }`}
              >
                {task.completed && <CheckCircle size={14} />}
              </button>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className={`font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                    Room {task.patientRoom}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold tracking-wide ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${task.completed ? 'text-slate-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  {task.description}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                  <Clock size={12} />
                  <span>Due {task.dueTime}</span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-400 hover:text-red-500 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <CheckCircle size={48} className="mx-auto mb-2 opacity-20" />
            <p>All clear! No tasks remaining.</p>
          </div>
        )}
      </div>
    </div>
  );
}
