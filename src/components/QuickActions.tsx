import React from 'react';
import { Sparkles, Wind, Droplets, Zap, Camera, Lightbulb } from 'lucide-react';

interface QuickActionsProps {
  onStartRelaxation: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onStartRelaxation }) => {
  const handleBreathingExercise = () => {
    onStartRelaxation();
    // Small delay to ensure relaxation mode loads, then switch to breathing
    setTimeout(() => {
      const breathingButton = document.querySelector('[data-activity="breathing"]') as HTMLButtonElement;
      if (breathingButton) breathingButton.click();
    }, 100);
  };

  const handleHydrationReminder = () => {
    // Create a simple notification
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('💧 Hydration Reminder', {
            body: 'Time to drink some water! Stay hydrated for healthy eyes.',
            icon: '/eye.svg'
          });
        }
      });
    }
    
    // Also show a visual reminder
    const reminder = document.createElement('div');
    reminder.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-right';
    reminder.innerHTML = `
      <div class="flex items-center space-x-2">
        <span>💧</span>
        <span>Time to hydrate!</span>
      </div>
    `;
    document.body.appendChild(reminder);
    
    setTimeout(() => {
      reminder.remove();
    }, 3000);
  };

  const handleQuickStretch = () => {
    // Show stretch instructions
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Quick Stretch Routine</h3>
        <div class="space-y-3 text-gray-600 dark:text-gray-300">
          <div class="flex items-center space-x-2">
            <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
            <span>Roll your shoulders backward 5 times</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
            <span>Gently turn your head left and right</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
            <span>Stretch your arms above your head</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
            <span>Take 3 deep breaths</span>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
          Done!
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  };

  const handlePostureCheck = () => {
    // Simulate posture check
    const messages = [
      "✅ Great posture! Keep it up!",
      "⚠️ Sit up straighter - your back will thank you!",
      "📏 Move back from the screen - maintain arm's length distance",
      "👀 Screen should be at eye level or slightly below"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-top';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <span>🔍</span>
        <span>${randomMessage}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  };

  const handleSmartLighting = () => {
    // Simulate smart lighting adjustment
    const body = document.body;
    const currentBrightness = body.style.filter || 'brightness(1)';
    
    if (currentBrightness.includes('0.8')) {
      body.style.filter = 'brightness(1)';
      showLightingNotification('💡 Lighting restored to normal');
    } else {
      body.style.filter = 'brightness(0.8)';
      showLightingNotification('🌙 Lighting dimmed for eye comfort');
    }
  };

  const showLightingNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const actions = [
    {
      title: 'Start Relaxation',
      description: 'Calming animations & exercises',
      icon: Sparkles,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      onClick: onStartRelaxation,
    },
    {
      title: 'Breathing Exercise',
      description: 'Multiple difficulty levels',
      icon: Wind,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      onClick: handleBreathingExercise,
    },
    {
      title: 'Hydration Reminder',
      description: 'Stay hydrated for healthy eyes',
      icon: Droplets,
      color: 'bg-gradient-to-br from-cyan-500 to-blue-500',
      onClick: handleHydrationReminder,
    },
    {
      title: 'Quick Stretch',
      description: 'Neck & shoulder exercises',
      icon: Zap,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      onClick: handleQuickStretch,
    },
    {
      title: 'Posture Check',
      description: 'Simulated posture analysis',
      icon: Camera,
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      onClick: handlePostureCheck,
    },
    {
      title: 'Smart Lighting',
      description: 'Adjust screen brightness',
      icon: Lightbulb,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      onClick: handleSmartLighting,
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className={`absolute inset-0 ${action.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="relative">
              <div className={`inline-flex p-2 rounded-lg ${action.color} mb-3`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-1">
                {action.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;