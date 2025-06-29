import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface BlinkingExerciseProps {
  isPlaying: boolean;
}

const BlinkingExercise: React.FC<BlinkingExerciseProps> = ({ isPlaying }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const [exerciseActive, setExerciseActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!isPlaying || !exerciseActive) return;

    const blinkTimer = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 500);
      setBlinkCount(prev => prev + 1);
    }, 3000); // Blink every 3 seconds

    const exerciseTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setExerciseActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(blinkTimer);
      clearInterval(exerciseTimer);
    };
  }, [isPlaying, exerciseActive]);

  const startExercise = () => {
    setExerciseActive(true);
    setBlinkCount(0);
    setTimeLeft(60);
  };

  const resetExercise = () => {
    setExerciseActive(false);
    setBlinkCount(0);
    setTimeLeft(60);
  };

  return (
    <div className="h-96 bg-black/20 backdrop-blur-lg rounded-2xl p-6">
      {/* Exercise Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Eye className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">Blinking Exercise</h3>
        </div>
        
        <div className="flex items-center space-x-4 text-white">
          <div className="font-mono text-lg">
            Blinks: {blinkCount}
          </div>
          <div className="font-mono text-lg">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Exercise Area */}
      <div className="flex flex-col items-center justify-center space-y-8 h-64">
        {exerciseActive && isPlaying ? (
          <>
            {/* Eye Animation */}
            <div className="relative">
              {isBlinking ? (
                <EyeOff className="w-32 h-32 text-blue-400 transition-all duration-500" />
              ) : (
                <Eye className="w-32 h-32 text-blue-400 transition-all duration-500" />
              )}
            </div>

            {/* Instructions */}
            <div className="text-center space-y-2">
              <h4 className="text-2xl font-bold text-white">
                {isBlinking ? 'Blink Now!' : 'Follow the Rhythm'}
              </h4>
              <p className="text-white/80">
                Blink along with the animation to exercise your eye muscles
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
              />
            </div>
          </>
        ) : (
          <div className="text-center space-y-6">
            {timeLeft === 0 ? (
              <>
                <Eye className="w-16 h-16 text-green-400 mx-auto" />
                <h4 className="text-2xl font-bold text-white">Exercise Complete!</h4>
                <p className="text-white/80">
                  You completed {blinkCount} guided blinks
                </p>
                <button
                  onClick={resetExercise}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Start Again
                </button>
              </>
            ) : (
              <>
                <Eye className="w-16 h-16 text-blue-400 mx-auto" />
                <h4 className="text-2xl font-bold text-white">Blinking Exercise</h4>
                <p className="text-white/80 max-w-md">
                  This exercise helps lubricate your eyes and reduce strain. Follow the blinking rhythm for optimal eye health.
                </p>
                <button
                  onClick={startExercise}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Start Exercise
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlinkingExercise;