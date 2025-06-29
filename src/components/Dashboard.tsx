import React from 'react';
import { Eye, Clock, Droplets, Activity, Zap, Target, Sparkles, Heart, TrendingUp, Shield } from 'lucide-react';

interface DashboardProps {
  screenTime: number;
  blinkRate: number;
  eyeStrain: number;
  timeUntilBreak: number;
  onStartTherapy: () => void;
  onStartExercises: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  screenTime,
  blinkRate,
  eyeStrain,
  timeUntilBreak,
  onStartTherapy,
  onStartExercises
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getEyeStrainLevel = (strain: number) => {
    if (strain < 30) return { level: 'Excellent', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
    if (strain < 50) return { level: 'Good', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
    if (strain < 70) return { level: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    return { level: 'High', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
  };

  const getBlinkRateStatus = (rate: number) => {
    if (rate >= 15 && rate <= 20) return { status: 'Optimal', color: 'text-green-500' };
    if (rate >= 12 && rate < 15) return { status: 'Low', color: 'text-yellow-500' };
    if (rate > 20) return { status: 'High', color: 'text-blue-500' };
    return { status: 'Very Low', color: 'text-red-500' };
  };

  const strainInfo = getEyeStrainLevel(eyeStrain);
  const blinkInfo = getBlinkRateStatus(blinkRate);

  const quickActions = [
    {
      title: 'Vision Therapy',
      description: 'Calming animations & guided exercises',
      icon: Sparkles,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      onClick: onStartTherapy,
    },
    {
      title: 'Eye Exercises',
      description: 'Strengthen & relax your eye muscles',
      icon: Target,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      onClick: onStartExercises,
    },
    {
      title: 'Breathing Exercise',
      description: 'Reduce stress & improve focus',
      icon: Heart,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      onClick: () => {
        // Trigger breathing exercise
        const event = new CustomEvent('startBreathing');
        window.dispatchEvent(event);
      },
    },
    {
      title: 'Quick Stretch',
      description: 'Neck & shoulder relief',
      icon: Zap,
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      onClick: () => {
        // Show stretch modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Quick Stretch Routine</h3>
            <div class="space-y-3 text-gray-600 dark:text-gray-300">
              <div class="flex items-center space-x-2">
                <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                <span>Roll shoulders backward 5 times</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                <span>Gently turn head left and right</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                <span>Stretch arms above your head</span>
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
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to Your Eye Care Dashboard 👁️
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your intelligent eye care assistant is monitoring your vision health and ready to help you maintain optimal eye wellness.
        </p>
      </div>

      {/* Health Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Screen Time */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
              <Clock className="w-6 h-6" />
            </div>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 text-gray-800 dark:text-white">
              {formatTime(screenTime)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              Screen Time Today
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Recommended: Max 8 hours
            </p>
          </div>
        </div>

        {/* Blink Rate */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
              <Eye className="w-6 h-6" />
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${blinkInfo.color} bg-current/10`}>
              {blinkInfo.status}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 text-gray-800 dark:text-white">
              {blinkRate}/min
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              Blink Rate
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Normal: 15-20 per minute
            </p>
          </div>
        </div>

        {/* Eye Strain */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${strainInfo.bg} ${strainInfo.border} border ${strainInfo.color}`}>
              <Activity className="w-6 h-6" />
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${strainInfo.color} bg-current/10`}>
              {strainInfo.level}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 text-gray-800 dark:text-white">
              {eyeStrain}%
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              Eye Strain Level
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Target: Below 30%
            </p>
          </div>
        </div>

        {/* Next Break */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-xs px-2 py-1 rounded-full text-green-500 bg-green-500/10">
              Active
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 text-gray-800 dark:text-white">
              {formatTime(timeUntilBreak)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              Next Break
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              20-20-20 rule active
            </p>
          </div>
        </div>
      </div>

      {/* Eye Health Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Status */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Eye Health Status
          </h3>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${strainInfo.bg} ${strainInfo.border} border`}>
              <div className="flex items-center space-x-3">
                <Activity className={`w-5 h-5 ${strainInfo.color}`} />
                <div>
                  <p className={`font-medium ${strainInfo.color}`}>
                    Eye Strain: {strainInfo.level}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {eyeStrain < 30 
                      ? "Your eyes are feeling great! Keep up the healthy habits."
                      : eyeStrain < 50
                      ? "Your eyes are doing well. Consider taking regular breaks."
                      : eyeStrain < 70 
                      ? "Moderate strain detected. Take a break and do some exercises."
                      : "High strain detected. Immediate rest recommended!"
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Hydration
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Due in 15m
                </p>
              </div>
              
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <Zap className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  Stretch
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Due in 8m
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Today's Progress
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-300">Breaks Taken</span>
                <span className="font-medium text-gray-800 dark:text-white">7/12</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '58%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-300">Exercises Completed</span>
                <span className="font-medium text-gray-800 dark:text-white">4/6</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '67%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-300">Hydration Goal</span>
                <span className="font-medium text-gray-800 dark:text-white">6/8 glasses</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
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
    </div>
  );
};

export default Dashboard;