import React, { useState, useEffect } from 'react';
import { Waves, Star, Cloud, Droplets, Flower } from 'lucide-react';

interface AnimationSelectorProps {
  isPlaying: boolean;
}

type AnimationType = 'waves' | 'galaxy' | 'rain' | 'ripples' | 'mandala';

const AnimationSelector: React.FC<AnimationSelectorProps> = ({ isPlaying }) => {
  const [activeAnimation, setActiveAnimation] = useState<AnimationType>('waves');
  const [animationKey, setAnimationKey] = useState(0);

  const animations = [
    { id: 'waves', label: 'Ocean Waves', icon: Waves, color: 'from-blue-400 to-cyan-300' },
    { id: 'galaxy', label: 'Galaxy', icon: Star, color: 'from-purple-400 to-pink-300' },
    { id: 'rain', label: 'Gentle Rain', icon: Cloud, color: 'from-gray-400 to-blue-300' },
    { id: 'ripples', label: 'Water Ripples', icon: Droplets, color: 'from-teal-400 to-blue-300' },
    { id: 'mandala', label: 'Mandala', icon: Flower, color: 'from-orange-400 to-red-300' },
  ];

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeAnimation]);

  const renderAnimation = () => {
    if (!isPlaying) return null;

    switch (activeAnimation) {
      case 'waves':
        return (
          <div key={animationKey} className="absolute inset-0 overflow-hidden">
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
          </div>
        );

      case 'galaxy':
        return (
          <div key={animationKey} className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-80"
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-pink-900/50 animate-pulse" />
          </div>
        );

      case 'rain':
        return (
          <div key={animationKey} className="absolute inset-0 overflow-hidden">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-blue-300/60 rounded-full"
                style={{
                  width: '2px',
                  height: `${Math.random() * 20 + 10}px`,
                  left: `${Math.random() * 100}%`,
                  animation: `rain ${Math.random() * 2 + 1}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        );

      case 'ripples':
        return (
          <div key={animationKey} className="absolute inset-0 flex items-center justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute border-2 border-teal-300/40 rounded-full"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  animation: `ripple ${4 + i * 0.5}s ease-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        );

      case 'mandala':
        return (
          <div key={animationKey} className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-orange-300/40 rounded-full"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    animation: `mandala ${6 + i * 0.2}s linear infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-96 relative bg-black/20 backdrop-blur-lg rounded-2xl overflow-hidden">
      {/* Animation Container */}
      <div className="absolute inset-0">
        {renderAnimation()}
      </div>

      {/* Animation Selector */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2 bg-black/30 backdrop-blur-lg rounded-full p-2">
          {animations.map((animation) => {
            const Icon = animation.icon;
            return (
              <button
                key={animation.id}
                onClick={() => setActiveAnimation(animation.id as AnimationType)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  activeAnimation === animation.id
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
                title={animation.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-10px) scaleY(1.1); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes rain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes mandala {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AnimationSelector;