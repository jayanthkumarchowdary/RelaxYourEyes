import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import AnimationSelector from './AnimationSelector';
import BreathingGuide from './BreathingGuide';
import FocusGame from './FocusGame';
import BlinkingExercise from './BlinkingExercise';

interface RelaxationModeProps {
  isBreakActive: boolean;
  onEndBreak: () => void;
}

type RelaxationActivity = 'animations' | 'breathing' | 'focus-game' | 'blinking';

const RelaxationMode: React.FC<RelaxationModeProps> = ({ isBreakActive, onEndBreak }) => {
  const [activeActivity, setActiveActivity] = useState<RelaxationActivity>('animations');
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(isBreakActive ? 300 : 0); // 5 minutes for break

  useEffect(() => {
    if (isBreakActive && timeRemaining > 0 && isPlaying) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            onEndBreak();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBreakActive, timeRemaining, onEndBreak, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activities = [
    { id: 'animations', label: 'Calming Animations', emoji: '🌊' },
    { id: 'breathing', label: 'Breathing Guide', emoji: '🫁' },
    { id: 'focus-game', label: 'Focus Game', emoji: '🎯' },
    { id: 'blinking', label: 'Blinking Exercise', emoji: '👁️' },
  ];

  const renderActivity = () => {
    switch (activeActivity) {
      case 'animations':
        return <AnimationSelector isPlaying={isPlaying} />;
      case 'breathing':
        return <BreathingGuide isPlaying={isPlaying} />;
      case 'focus-game':
        return <FocusGame isPlaying={isPlaying} />;
      case 'blinking':
        return <BlinkingExercise isPlaying={isPlaying} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">
              {isBreakActive ? 'Break Time' : 'Relaxation Mode'}
            </h1>
            {isBreakActive && (
              <div className="bg-white/20 backdrop-blur-lg rounded-full px-4 py-2">
                <span className="text-white font-mono text-lg">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>

            <button 
              className="p-3 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-colors"
              title="Volume"
            >
              <Volume2 className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={onEndBreak}
              className="p-3 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-colors"
              title="Exit"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Activity Selector */}
        <div className="mt-6 flex flex-wrap gap-3">
          {activities.map((activity) => (
            <button
              key={activity.id}
              data-activity={activity.id}
              onClick={() => setActiveActivity(activity.id as RelaxationActivity)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeActivity === activity.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span>{activity.emoji}</span>
              <span className="text-sm font-medium">{activity.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-6">
        {renderActivity()}
      </div>
    </div>
  );
};

export default RelaxationMode;