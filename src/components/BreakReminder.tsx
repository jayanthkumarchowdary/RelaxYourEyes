import React, { useEffect, useState } from 'react';
import { Clock, Eye, X, Coffee, SunSnow as Snooze } from 'lucide-react';

interface BreakReminderProps {
  onStartBreak: () => void;
  onDismiss: () => void;
}

const BreakReminder: React.FC<BreakReminderProps> = ({ onStartBreak, onDismiss }) => {
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds to respond

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onDismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onDismiss]);

  const handleSnooze = () => {
    // Snooze for 5 minutes
    onDismiss();
    // You could implement actual snooze logic here
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Time for a Break!
            </h3>
          </div>
          <button
            onClick={onDismiss}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Clock className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                20-20-20 Rule Reminder
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Look at something 20 feet away for 20 seconds
              </p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300">
            You've been looking at the screen for 20 minutes. Taking regular breaks helps prevent eye strain and maintains healthy vision.
          </p>

          {/* Auto-dismiss timer */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>Auto-dismiss in {timeLeft}s</span>
            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div
                className="bg-blue-500 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={onStartBreak}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            <Coffee className="w-4 h-4" />
            <span>Start 5-min Break</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSnooze}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Snooze className="w-4 h-4" />
              <span>Snooze 5m</span>
            </button>
            
            <button
              onClick={onDismiss}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakReminder;