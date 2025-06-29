import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles } from 'lucide-react';

interface VisionTherapyProps {
  isBreakActive: boolean;
  onEndBreak: () => void;
}

type TherapyType = 'spiral' | 'waves' | 'breathing' | 'colors' | 'focus';

const VisionTherapy: React.FC<VisionTherapyProps> = ({ isBreakActive, onEndBreak }) => {
  const [activeTherapy, setActiveTherapy] = useState<TherapyType>('spiral');
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(isBreakActive ? 300 : 0);

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

  const therapies = [
    { id: 'spiral', label: 'Hypnotic Spiral', emoji: '🌀', description: 'Deep relaxation spiral' },
    { id: 'waves', label: 'Ocean Waves', emoji: '🌊', description: 'Calming wave animation' },
    { id: 'breathing', label: 'Breathing Circle', emoji: '⭕', description: 'Guided breathing exercise' },
    { id: 'colors', label: 'Color Therapy', emoji: '🎨', description: 'Therapeutic color healing' },
    { id: 'focus', label: 'Focus Dot', emoji: '🎯', description: 'Eye tracking exercise' },
  ];

  const renderTherapy = () => {
    if (!isPlaying) return null;

    switch (activeTherapy) {
      case 'spiral':
        return <HypnoticSpiral />;
      case 'waves':
        return <OceanWaves />;
      case 'breathing':
        return <BreathingCircle />;
      case 'colors':
        return <ColorTherapy />;
      case 'focus':
        return <FocusDot />;
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
            <Sparkles className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {isBreakActive ? 'Break Time - Vision Therapy' : 'Vision Therapy'}
              </h1>
              <p className="text-blue-200">
                Relax your eyes with therapeutic animations
              </p>
            </div>
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

        {/* Therapy Selector */}
        <div className="mt-6 flex flex-wrap gap-3">
          {therapies.map((therapy) => (
            <button
              key={therapy.id}
              onClick={() => setActiveTherapy(therapy.id as TherapyType)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeTherapy === therapy.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span>{therapy.emoji}</span>
              <span className="text-sm font-medium">{therapy.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-6">
        <div className="h-96 flex items-center justify-center">
          {renderTherapy()}
        </div>
        
        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-white/80 max-w-2xl mx-auto">
            {therapies.find(t => t.id === activeTherapy)?.description}. 
            Focus on the center and let your eyes relax naturally. 
            Breathe deeply and allow the stress to melt away.
          </p>
        </div>
      </div>
    </div>
  );
};

// Hypnotic Spiral Component
const HypnoticSpiral: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => prev + 2);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-96 h-96 mx-auto">
      <div className="absolute inset-0 bg-white rounded-full shadow-2xl overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 400 400"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {[...Array(12)].map((_, armIndex) => (
            <g key={armIndex} transform={`rotate(${armIndex * 30} 200 200)`}>
              <path
                d={`M 200 200 ${[...Array(100)].map((_, i) => {
                  const angle = i * 0.1;
                  const radius = i * 1.8;
                  const x = 200 + radius * Math.cos(angle);
                  const y = 200 + radius * Math.sin(angle);
                  return `L ${x} ${y}`;
                }).join(' ')}`}
                stroke="black"
                strokeWidth={Math.max(0.5, 4 - armIndex * 0.3)}
                fill="none"
                opacity={0.8}
              />
            </g>
          ))}
          <circle cx="200" cy="200" r="8" fill="black" />
          <circle cx="200" cy="200" r="4" fill="white" />
        </svg>
      </div>
    </div>
  );
};

// Ocean Waves Component
const OceanWaves: React.FC = () => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-400 to-blue-600 rounded-2xl overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/30 to-transparent rounded-full"
          style={{
            height: `${20 + i * 15}%`,
            animation: `wave ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-10px) scaleY(1.1); }
        }
      `}</style>
    </div>
  );
};

// Breathing Circle Component
const BreathingCircle: React.FC = () => {
  const [isExpanding, setIsExpanding] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsExpanding(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-96 h-96 mx-auto flex items-center justify-center">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full border-2 transition-all duration-4000 ease-in-out ${
            isExpanding ? 'scale-150 opacity-10' : 'scale-50 opacity-40'
          }`}
          style={{
            width: `${150 + i * 30}px`,
            height: `${150 + i * 30}px`,
            borderColor: `hsl(${200 + i * 15}, 70%, 60%)`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}
      
      <div
        className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 flex items-center justify-center transition-all duration-4000 ease-in-out shadow-2xl ${
          isExpanding ? 'scale-150' : 'scale-75'
        }`}
      >
        <span className="text-white text-lg font-bold">
          {isExpanding ? 'IN' : 'OUT'}
        </span>
      </div>
    </div>
  );
};

// Color Therapy Component
const ColorTherapy: React.FC = () => {
  const [colorIndex, setColorIndex] = useState(0);
  
  const colors = [
    { name: 'Soothing Green', hue: 120 },
    { name: 'Calming Blue', hue: 240 },
    { name: 'Soft Turquoise', hue: 180 },
    { name: 'Gentle Lavender', hue: 280 },
    { name: 'Cool Mint', hue: 150 },
    { name: 'Deep Indigo', hue: 260 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setColorIndex(prev => (prev + 1) % colors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentColor = colors[colorIndex];

  return (
    <div className="relative w-96 h-96 mx-auto">
      <div 
        className="w-full h-full rounded-full transition-all duration-4000 ease-in-out"
        style={{
          background: `radial-gradient(circle, 
            hsl(${currentColor.hue}, 60%, 75%), 
            hsl(${currentColor.hue}, 70%, 60%), 
            hsl(${currentColor.hue}, 80%, 45%))`,
          boxShadow: `0 0 100px hsla(${currentColor.hue}, 70%, 60%, 0.8)`
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${70 - i * 15}%`,
              height: `${70 - i * 15}%`,
              top: `${15 + i * 7.5}%`,
              left: `${15 + i * 7.5}%`,
              background: `hsla(${currentColor.hue}, 80%, ${85 + i * 5}%, ${0.4 - i * 0.1})`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Focus Dot Component
const FocusDot: React.FC = () => {
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const timer = setInterval(() => {
      setDotPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-96 bg-black/20 rounded-2xl overflow-hidden">
      <div
        className="absolute w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full transition-all duration-3000 shadow-lg animate-pulse"
        style={{
          left: `${dotPosition.x}%`,
          top: `${dotPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default VisionTherapy;