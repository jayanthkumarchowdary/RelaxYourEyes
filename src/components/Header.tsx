import React from 'react';
import { Eye, Home, Sparkles, Settings, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onViewChange: (view: 'dashboard' | 'relax' | 'settings') => void;
  isBreakActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeView, onViewChange, isBreakActive }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EyeZen
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Intelligent Eye Care Assistant
            </p>
          </div>
        </div>

        <nav className="flex items-center space-x-2">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              activeView === 'dashboard'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            disabled={isBreakActive}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <button
            onClick={() => onViewChange('relax')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              activeView === 'relax'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Relax</span>
          </button>

          <button
            onClick={() => onViewChange('settings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              activeView === 'settings'
                ? 'bg-gray-500 text-white shadow-lg shadow-gray-500/25'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            disabled={isBreakActive}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;