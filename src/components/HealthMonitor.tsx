import React from 'react';
import { Activity, Eye, Clock, TrendingUp, AlertTriangle, CheckCircle, Heart, Shield } from 'lucide-react';

interface HealthMonitorProps {
  screenTime: number;
  blinkRate: number;
  eyeStrain: number;
  isActive: boolean;
}

const HealthMonitor: React.FC<HealthMonitorProps> = ({
  screenTime,
  blinkRate,
  eyeStrain,
  isActive
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getHealthScore = () => {
    let score = 100;
    
    // Deduct points for high screen time
    if (screenTime > 480) score -= 30; // 8+ hours
    else if (screenTime > 360) score -= 20; // 6+ hours
    else if (screenTime > 240) score -= 10; // 4+ hours
    
    // Deduct points for poor blink rate
    if (blinkRate < 10) score -= 25;
    else if (blinkRate < 15) score -= 15;
    else if (blinkRate > 25) score -= 10;
    
    // Deduct points for eye strain
    score -= Math.floor(eyeStrain * 0.5);
    
    return Math.max(0, Math.min(100, score));
  };

  const healthScore = getHealthScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
    if (score >= 60) return { color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
    if (score >= 40) return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    return { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
  };

  const scoreInfo = getScoreColor(healthScore);

  const recommendations = [
    {
      condition: screenTime > 360,
      icon: Clock,
      title: 'Reduce Screen Time',
      description: 'You\'ve been using screens for over 6 hours today. Consider taking longer breaks.',
      priority: 'high'
    },
    {
      condition: blinkRate < 15,
      icon: Eye,
      title: 'Increase Blinking',
      description: 'Your blink rate is below normal. Practice conscious blinking exercises.',
      priority: 'medium'
    },
    {
      condition: eyeStrain > 50,
      icon: AlertTriangle,
      title: 'High Eye Strain',
      description: 'Your eyes are showing signs of strain. Take a break and do some exercises.',
      priority: 'high'
    },
    {
      condition: !isActive,
      icon: Activity,
      title: 'Inactive Session',
      description: 'You\'re not currently active. Make sure to take regular breaks.',
      priority: 'low'
    }
  ];

  const activeRecommendations = recommendations.filter(r => r.condition);

  const weeklyData = [
    { day: 'Mon', screenTime: 420, eyeStrain: 45, score: 72 },
    { day: 'Tue', screenTime: 380, eyeStrain: 38, score: 78 },
    { day: 'Wed', screenTime: 450, eyeStrain: 52, score: 68 },
    { day: 'Thu', screenTime: 320, eyeStrain: 35, score: 82 },
    { day: 'Fri', screenTime: 480, eyeStrain: 58, score: 65 },
    { day: 'Sat', screenTime: 240, eyeStrain: 25, score: 88 },
    { day: 'Today', screenTime, eyeStrain, score: healthScore }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Eye Health Monitor 📊
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Track your eye health metrics, get personalized recommendations, and monitor your progress over time.
        </p>
      </div>

      {/* Health Score */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className={`p-4 rounded-2xl ${scoreInfo.bg} ${scoreInfo.border} border`}>
            <Heart className={`w-8 h-8 ${scoreInfo.color}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Eye Health Score
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Based on your daily metrics
            </p>
          </div>
        </div>

        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - healthScore / 100)}`}
              className={scoreInfo.color}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl font-bold ${scoreInfo.color}`}>
                {healthScore}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                out of 100
              </div>
            </div>
          </div>
        </div>

        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${scoreInfo.bg} ${scoreInfo.border} border`}>
          {healthScore >= 80 ? (
            <CheckCircle className={`w-5 h-5 ${scoreInfo.color}`} />
          ) : (
            <AlertTriangle className={`w-5 h-5 ${scoreInfo.color}`} />
          )}
          <span className={`font-medium ${scoreInfo.color}`}>
            {healthScore >= 80 ? 'Excellent Health' :
             healthScore >= 60 ? 'Good Health' :
             healthScore >= 40 ? 'Fair Health' : 'Needs Attention'}
          </span>
        </div>
      </div>

      {/* Current Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Screen Time
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {formatTime(screenTime)}
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${screenTime > 480 ? 'bg-red-500' : screenTime > 360 ? 'bg-yellow-500' : 'bg-green-500'}`} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {screenTime > 480 ? 'High usage' : screenTime > 360 ? 'Moderate usage' : 'Healthy usage'}
            </span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Blink Rate
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {blinkRate}/min
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${blinkRate < 15 ? 'bg-red-500' : blinkRate > 20 ? 'bg-yellow-500' : 'bg-green-500'}`} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {blinkRate < 15 ? 'Below normal' : blinkRate > 20 ? 'Above normal' : 'Normal range'}
            </span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Eye Strain
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {eyeStrain}%
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${eyeStrain > 70 ? 'bg-red-500' : eyeStrain > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {eyeStrain > 70 ? 'High strain' : eyeStrain > 50 ? 'Moderate strain' : 'Low strain'}
            </span>
          </div>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Weekly Health Trend
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {day.day}
              </div>
              <div className="space-y-2">
                <div 
                  className={`h-16 rounded-lg ${getScoreColor(day.score).bg} border ${getScoreColor(day.score).border} flex items-end justify-center pb-1`}
                >
                  <div 
                    className={`w-full rounded-sm ${getScoreColor(day.score).color.replace('text-', 'bg-')}`}
                    style={{ height: `${day.score}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-800 dark:text-white">
                  {day.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {activeRecommendations.length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Health Recommendations
            </h3>
          </div>

          <div className="space-y-4">
            {activeRecommendations.map((rec, index) => {
              const Icon = rec.icon;
              const priorityColors = {
                high: 'border-red-500/20 bg-red-500/10 text-red-600',
                medium: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-600',
                low: 'border-blue-500/20 bg-blue-500/10 text-blue-600'
              };

              return (
                <div key={index} className={`p-4 rounded-xl border ${priorityColors[rec.priority as keyof typeof priorityColors]}`}>
                  <div className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">{rec.title}</h4>
                      <p className="text-sm opacity-80">{rec.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMonitor;