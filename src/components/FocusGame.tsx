import React, { useState, useEffect } from 'react';
import { Target, Trophy } from 'lucide-react';

interface FocusGameProps {
  isPlaying: boolean;
}

const FocusGame: React.FC<FocusGameProps> = ({ isPlaying }) => {
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (!isPlaying || !gameActive) return;

    const moveTimer = setInterval(() => {
      setDotPosition({
        x: Math.random() * 80 + 10, // Keep within bounds
        y: Math.random() * 80 + 10,
      });
    }, 2000);

    const gameTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(moveTimer);
      clearInterval(gameTimer);
    };
  }, [isPlaying, gameActive]);

  const handleDotClick = () => {
    setScore(prev => prev + 1);
    setDotPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    });
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(60);
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setTimeLeft(60);
  };

  return (
    <div className="h-96 bg-black/20 backdrop-blur-lg rounded-2xl p-6 relative overflow-hidden">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">Focus Dot Game</h3>
        </div>
        
        <div className="flex items-center space-x-4 text-white">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span className="font-mono text-lg">{score}</span>
          </div>
          <div className="font-mono text-lg">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-64 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl overflow-hidden">
        {gameActive && isPlaying ? (
          <>
            {/* Moving Dot */}
            <button
              onClick={handleDotClick}
              className="absolute w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg transition-all duration-500 hover:scale-110 animate-pulse"
              style={{
                left: `${dotPosition.x}%`,
                top: `${dotPosition.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
            
            {/* Click Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Add click ripple effects here */}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              {timeLeft === 0 ? (
                <>
                  <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
                  <h4 className="text-2xl font-bold text-white">Game Over!</h4>
                  <p className="text-white/80">Final Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Play Again
                  </button>
                </>
              ) : (
                <>
                  <Target className="w-16 h-16 text-blue-400 mx-auto" />
                  <h4 className="text-2xl font-bold text-white">Focus Training</h4>
                  <p className="text-white/80">Click the moving dot to improve focus</p>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Start Game
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-white/60 text-sm">
          Follow the moving dot with your eyes and click to score points. This exercise helps improve focus and eye tracking.
        </p>
      </div>
    </div>
  );
};

export default FocusGame;