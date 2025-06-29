import React, { useState, useEffect } from 'react';
import { Wind, Settings } from 'lucide-react';

interface BreathingGuideProps {
  isPlaying: boolean;
}

type BreathingLevel = 'beginner' | 'intermediate' | 'advanced';

const breathingPatterns = {
  beginner: { inhale: 4, hold: 4, exhale: 4, name: 'Box Breathing (4-4-4)' },
  intermediate: { inhale: 4, hold: 7, exhale: 8, name: '4-7-8 Technique' },
  advanced: { inhale: 6, hold: 6, exhale: 12, name: 'Deep Relaxation (6-6-12)' }
};

const BreathingGuide: React.FC<BreathingGuideProps> = ({ isPlaying }) => {
  const [level, setLevel] = useState<BreathingLevel>('beginner');
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(breathingPatterns.beginner.inhale);
  const [cycle, setCycle] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const currentPattern = breathingPatterns[level];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          setPhase(currentPhase => {
            if (currentPhase === 'inhale') {
              setCount(currentPattern.hold);
              return 'hold';
            }
            if (currentPhase === 'hold') {
              setCount(currentPattern.exhale);
              return 'exhale';
            }
            // Complete cycle
            setCycle(c => c + 1);
            setCount(currentPattern.inhale);
            return 'inhale';
          });
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentPattern]);

  // Reset when level changes
  useEffect(() => {
    setPhase('inhale');
    setCount(currentPattern.inhale);
    setCycle(0);
  }, [level, currentPattern]);

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-cyan-300';
      case 'hold': return 'from-purple-400 to-blue-400';
      case 'exhale': return 'from-green-400 to-teal-300';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  const getCircleScale = () => {
    const baseScale = level === 'beginner' ? 1.2 : level === 'intermediate' ? 1.4 : 1.6;
    switch (phase) {
      case 'inhale': return `scale-${Math.floor(baseScale * 100)}`;
      case 'hold': return `scale-${Math.floor(baseScale * 100)}`;
      case 'exhale': return 'scale-75';
    }
  };

  const getDifficultyColor = (difficulty: BreathingLevel) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
    }
  };

  return (
    <div className="h-96 flex flex-col items-center justify-center space-y-6 relative">
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-colors"
      >
        <Settings className="w-5 h-5 text-white" />
      </button>

      {/* Level Selector */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-lg rounded-xl p-4 space-y-3 z-10">
          <h4 className="text-white font-medium text-sm">Difficulty Level</h4>
          {Object.entries(breathingPatterns).map(([key, pattern]) => (
            <button
              key={key}
              onClick={() => {
                setLevel(key as BreathingLevel);
                setShowSettings(false);
              }}
              className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                level === key 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(key as BreathingLevel)}`} />
                <span className="font-medium capitalize">{key}</span>
              </div>
              <div className="text-xs text-white/60">{pattern.name}</div>
            </button>
          ))}
        </div>
      )}

      {/* Current Level Display */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${getDifficultyColor(level)}`} />
          <span className="text-white/80 text-sm capitalize">{level} Level</span>
        </div>
        <p className="text-white/60 text-sm">{currentPattern.name}</p>
      </div>

      {/* Breathing Circle */}
      <div className="relative">
        <div 
          className={`w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 ${
            phase === 'inhale' ? 'scale-150' : 
            phase === 'hold' ? 'scale-150' : 
            'scale-75'
          } opacity-80 flex items-center justify-center`}
        >
          <Wind className="w-8 h-8 md:w-12 md:h-12 text-white" />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center space-y-3">
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {getPhaseText()}
        </h3>
        <div className="text-4xl md:text-6xl font-mono text-white/80">
          {count}
        </div>
        <p className="text-white/60 text-sm">
          Cycle {cycle + 1} • {currentPattern.inhale}-{currentPattern.hold}-{currentPattern.exhale} Pattern
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex space-x-2">
        {['inhale', 'hold', 'exhale'].map((p, index) => (
          <div
            key={p}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              phase === p ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Instructions for beginners */}
      {level === 'beginner' && cycle === 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-lg rounded-lg p-3 max-w-sm">
          <p className="text-white/80 text-xs text-center">
            Follow the circle: Inhale as it grows, hold when steady, exhale as it shrinks
          </p>
        </div>
      )}
    </div>
  );
};

export default BreathingGuide;