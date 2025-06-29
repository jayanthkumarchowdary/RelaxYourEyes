import React, { useState, useEffect } from 'react';
import { Eye, Menu, X, Clock, Activity, Target, Sparkles, Heart, Shield } from 'lucide-react';
import Dashboard from './components/Dashboard';
import VisionTherapy from './components/VisionTherapy';
import EyeExercises from './components/EyeExercises';
import BreakReminder from './components/BreakReminder';
import Settings from './components/Settings';
import HealthMonitor from './components/HealthMonitor';
import { useEyeTracking } from './hooks/useEyeTracking';
import { useBreakTimer } from './hooks/useBreakTimer';

type ViewType = 'dashboard' | 'therapy' | 'exercises' | 'health' | 'settings';

function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [showBreakReminder, setShowBreakReminder] = useState(false);
  
  const { screenTime, blinkRate, eyeStrain, isActive } = useEyeTracking();
  const { timeUntilBreak, shouldTakeBreak, resetBreakTimer, snoozeBreak } = useBreakTimer();

  // Handle break reminders
  useEffect(() => {
    if (shouldTakeBreak && !isBreakActive) {
      setShowBreakReminder(true);
    }
  }, [shouldTakeBreak, isBreakActive]);

  const handleStartBreak = () => {
    setIsBreakActive(true);
    setShowBreakReminder(false);
    setActiveView('therapy');
  };

  const handleEndBreak = () => {
    setIsBreakActive(false);
    resetBreakTimer();
    setActiveView('dashboard');
  };

  const handleDismissBreak = () => {
    setShowBreakReminder(false);
    snoozeBreak(5);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, color: 'text-blue-500' },
    { id: 'therapy', label: 'Vision Therapy', icon: Sparkles, color: 'text-purple-500' },
    { id: 'exercises', label: 'Eye Exercises', icon: Target, color: 'text-green-500' },
    { id: 'health', label: 'Health Monitor', icon: Heart, color: 'text-red-500' },
    { id: 'settings', label: 'Settings', icon: Shield, color: 'text-gray-500' },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard
            screenTime={screenTime}
            blinkRate={blinkRate}
            eyeStrain={eyeStrain}
            timeUntilBreak={timeUntilBreak}
            onStartTherapy={() => setActiveView('therapy')}
            onStartExercises={() => setActiveView('exercises')}
          />
        );
      case 'therapy':
        return (
          <VisionTherapy
            isBreakActive={isBreakActive}
            onEndBreak={handleEndBreak}
          />
        );
      case 'exercises':
        return <EyeExercises />;
      case 'health':
        return (
          <HealthMonitor
            screenTime={screenTime}
            blinkRate={blinkRate}
            eyeStrain={eyeStrain}
            isActive={isActive}
          />
        );
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RelaxYourEyes
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Complete Eye Care
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as ViewType)}
                    disabled={isBreakActive && item.id !== 'therapy'}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeView === item.id
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-16 h-full w-64 bg-white dark:bg-gray-900 shadow-xl">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id as ViewType);
                      setSidebarOpen(false);
                    }}
                    disabled={isBreakActive && item.id !== 'therapy'}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeView === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative">
        {renderContent()}
      </main>

      {/* Break Reminder Modal */}
      {showBreakReminder && (
        <BreakReminder
          onStartBreak={handleStartBreak}
          onDismiss={handleDismissBreak}
        />
      )}

      {/* Status Indicator */}
      {isBreakActive && (
        <div className="fixed top-20 right-4 bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Break Active</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;