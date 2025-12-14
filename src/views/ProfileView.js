import React from 'react';
import { User, Settings, Shield, LogOut, Moon, Sun, ChevronRight } from 'lucide-react';

export default function ProfileView({ darkMode, setDarkMode }) {
  return (
    <div className="h-full flex flex-col animate-fadeIn pb-20">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Nurse Profile</h2>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
          <User size={32} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Sarah Jenkins, RN</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">ICU • ID: RN-4921</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">On Shift</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold">Patients</div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800 text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">98%</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold">On Time</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl border border-purple-100 dark:border-purple-800 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">4</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold">Shifts</div>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden mb-6">
        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <Settings size={18} className="text-slate-600 dark:text-slate-300" />
            </div>
            <span className="text-slate-700 dark:text-slate-200 font-medium">App Settings</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition border-b border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              {darkMode ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} className="text-slate-600 dark:text-slate-300" />
              )}
            </div>
            <span className="text-slate-700 dark:text-slate-200 font-medium">Dark Mode</span>
          </div>
          <div className={`w-10 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-5' : 'left-1'}`}></div>
          </div>
        </button>

        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <Shield size={18} className="text-slate-600 dark:text-slate-300" />
            </div>
            <span className="text-slate-700 dark:text-slate-200 font-medium">Security & ID</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </button>
      </div>

      <button className="mt-auto w-full p-4 rounded-xl border border-red-100 bg-red-50 text-red-600 font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition">
        <LogOut size={18} /> Sign Out
      </button>
    </div>
  );
}
