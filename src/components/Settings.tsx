import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Eye, Palette, Clock, Shield, Volume2 } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    breakInterval: 20,
    breakDuration: 5,
    hydrationReminder: 60,
    stretchReminder: 60,
    soundEnabled: true,
    darkMode: false,
    notifications: true,
    autoStart: true,
    theme: 'ocean'
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'eye-care', label: 'Eye Care', icon: Eye },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const themes = [
    { id: 'ocean', name: 'Ocean Breeze', colors: ['#3B82F6', '#06B6D4'] },
    { id: 'forest', name: 'Forest Calm', colors: ['#10B981', '#059669'] },
    { id: 'sunset', name: 'Sunset Glow', colors: ['#F59E0B', '#EF4444'] },
    { id: 'lavender', name: 'Lavender Dreams', colors: ['#8B5CF6', '#A855F7'] },
  ];

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Settings ⚙️</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Customize your RelaxYourEyes experience
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Break Settings
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Break Reminder Interval (minutes)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="10"
                      max="60"
                      value={settings.breakInterval}
                      onChange={(e) => updateSetting('breakInterval', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-16">
                      {settings.breakInterval} min
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    How often you'll be reminded to take a break (20-20-20 rule recommends 20 minutes)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Break Duration (minutes)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={settings.breakDuration}
                      onChange={(e) => updateSetting('breakDuration', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-16">
                      {settings.breakDuration} min
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Hydration Reminder (minutes)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="30"
                      max="120"
                      value={settings.hydrationReminder}
                      onChange={(e) => updateSetting('hydrationReminder', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-16">
                      {settings.hydrationReminder} min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                General Preferences
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Auto-start exercises
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Automatically start exercises when break time begins
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.autoStart}
                      onChange={(e) => updateSetting('autoStart', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Sound effects
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Play sounds for notifications and exercises
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.soundEnabled}
                      onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Notification Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Break reminders
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Get notified when it's time for a break
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Exercise reminders
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Reminders to do eye exercises
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 text-green-500" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Sound notifications
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Play sounds with notifications
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.soundEnabled}
                    onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Theme Selection
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => updateSetting('theme', theme.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      settings.theme === theme.id
                        ? 'border-blue-500 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div 
                      className="h-16 rounded-lg mb-3"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`
                      }}
                    />
                    <p className="font-medium text-gray-800 dark:text-white">
                      {theme.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Display Options
              </h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    Dark mode
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use dark theme to reduce eye strain
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={settings.darkMode}
                    onChange={(e) => updateSetting('darkMode', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eye-care' && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Eye Care Guidelines
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                  20-20-20 Rule
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Every 20 minutes, look at something 20 feet away for at least 20 seconds.
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
                  Proper Lighting
                </h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Ensure your screen is not brighter than your surroundings. Use ambient lighting.
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">
                  Screen Distance
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  Keep your screen 20-26 inches away from your eyes, with the top at or below eye level.
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-2">
                  Blink Frequently
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  Blink more often to keep your eyes moist. Computer use reduces blink rate by up to 60%.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Privacy & Data
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-800 dark:text-green-300">
                    Local Data Storage
                  </h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">
                  All your data is stored locally on your device. We don't collect or transmit any personal information.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Data Management
                </h4>
                
                <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="font-medium text-gray-800 dark:text-white">
                    Export Data
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Download your usage statistics and settings
                  </div>
                </button>

                <button className="w-full p-3 text-left bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  <div className="font-medium text-red-800 dark:text-red-300">
                    Clear All Data
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-400">
                    Reset all settings and delete usage history
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;