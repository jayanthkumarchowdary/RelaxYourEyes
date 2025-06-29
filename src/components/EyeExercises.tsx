import React, { useState } from 'react';
import { Target, Eye, RotateCcw, Play, Pause, CheckCircle } from 'lucide-react';

const EyeExercises: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const exercises = [
    {
      id: 'blinking',
      title: 'Conscious Blinking',
      description: 'Slow, deliberate blinking to lubricate eyes',
      duration: '2 minutes',
      difficulty: 'Easy',
      benefits: ['Reduces dry eyes', 'Improves tear distribution', 'Relaxes eye muscles'],
      instructions: [
        'Sit comfortably and close your eyes gently',
        'Hold for 2 seconds, feeling the moisture spread',
        'Open slowly and repeat 20 times',
        'Focus on the relaxation between blinks'
      ],
      component: <BlinkingExercise />
    },
    {
      id: 'figure-eight',
      title: 'Figure-8 Tracking',
      description: 'Smooth eye movement in infinity pattern',
      duration: '3 minutes',
      difficulty: 'Medium',
      benefits: ['Improves eye coordination', 'Strengthens eye muscles', 'Enhances focus'],
      instructions: [
        'Imagine a large figure-8 in front of you',
        'Trace the pattern slowly with your eyes',
        'Keep your head still, only move your eyes',
        'Reverse direction every 30 seconds'
      ],
      component: <FigureEightExercise />
    },
    {
      id: 'focus-shift',
      title: 'Near-Far Focus',
      description: 'Alternating focus between near and distant objects',
      duration: '5 minutes',
      difficulty: 'Easy',
      benefits: ['Reduces eye strain', 'Improves accommodation', 'Prevents myopia progression'],
      instructions: [
        'Hold your thumb 6 inches from your face',
        'Focus on your thumb for 3 seconds',
        'Shift focus to an object 20 feet away',
        'Hold for 3 seconds, then repeat'
      ],
      component: <FocusShiftExercise />
    },
    {
      id: 'palming',
      title: 'Palming Relaxation',
      description: 'Complete darkness therapy for deep eye rest',
      duration: '5 minutes',
      difficulty: 'Easy',
      benefits: ['Deep relaxation', 'Reduces eye fatigue', 'Calms nervous system'],
      instructions: [
        'Rub your palms together to generate warmth',
        'Cup your palms over closed eyes',
        'Ensure complete darkness with no pressure',
        'Breathe deeply and visualize blackness'
      ],
      component: <PalmingExercise />
    },
    {
      id: 'eye-rolls',
      title: 'Eye Rolling',
      description: 'Circular movements to stretch eye muscles',
      duration: '2 minutes',
      difficulty: 'Easy',
      benefits: ['Stretches eye muscles', 'Improves blood circulation', 'Reduces tension'],
      instructions: [
        'Look up and slowly roll your eyes clockwise',
        'Complete 5 full circles',
        'Reverse direction for 5 counter-clockwise circles',
        'Blink several times between sets'
      ],
      component: <EyeRollExercise />
    },
    {
      id: 'convergence',
      title: 'Convergence Training',
      description: 'Strengthen muscles that turn eyes inward',
      duration: '3 minutes',
      difficulty: 'Hard',
      benefits: ['Improves binocular vision', 'Reduces double vision', 'Enhances depth perception'],
      instructions: [
        'Hold a pen at arm\'s length',
        'Slowly bring it toward your nose',
        'Keep both eyes focused on the tip',
        'Stop when you see double, then move back'
      ],
      component: <ConvergenceExercise />
    }
  ];

  const handleCompleteExercise = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Hard': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  if (activeExercise) {
    const exercise = exercises.find(e => e.id === activeExercise);
    if (!exercise) return null;

    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Exercise Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                setActiveExercise(null);
                setIsPlaying(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Back to Exercises</span>
            </button>

            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {exercise.duration}
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isPlaying ? 'Pause' : 'Start'}</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {exercise.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {exercise.description}
            </p>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exercise Animation */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="h-96 flex items-center justify-center">
                {React.cloneElement(exercise.component, { isPlaying })}
              </div>
            </div>
          </div>

          {/* Instructions & Benefits */}
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Instructions
              </h3>
              <ol className="space-y-3">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Benefits */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Benefits
              </h3>
              <ul className="space-y-2">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete Button */}
            <button
              onClick={() => handleCompleteExercise(exercise.id)}
              disabled={completedExercises.includes(exercise.id)}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                completedExercises.includes(exercise.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
              }`}
            >
              {completedExercises.includes(exercise.id) ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Completed!</span>
                </div>
              ) : (
                'Mark as Complete'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Eye Exercises 👁️‍🗨️
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Strengthen your eye muscles, improve focus, and reduce strain with these scientifically-backed exercises.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Today's Progress
          </h3>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {completedExercises.length} of {exercises.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => setActiveExercise(exercise.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              {completedExercises.includes(exercise.id) && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
            </div>

            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {exercise.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {exercise.description}
            </p>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {exercise.duration}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {exercise.benefits.length} benefits
                </span>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  Start Exercise →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exercise Components
const BlinkingExercise: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = false }) => {
  const [isBlinking, setIsBlinking] = React.useState(false);

  React.useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 500);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="text-center">
      <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center transition-all duration-500 ${
        isBlinking ? 'scale-75 opacity-30' : 'scale-100 opacity-100'
      }`}>
        <Eye className={`w-16 h-16 text-white transition-all duration-300 ${isBlinking ? 'scale-0' : 'scale-100'}`} />
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {isBlinking ? 'Blink slowly and gently' : 'Keep eyes open and relaxed'}
      </p>
    </div>
  );
};

const FigureEightExercise: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = false }) => {
  const [dotPosition, setDotPosition] = React.useState({ x: 50, y: 50 });
  const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setAngle(prev => (prev + 2) % 360);
      const radians = (angle * Math.PI) / 180;
      const x = 50 + 35 * Math.sin(radians);
      const y = 50 + 20 * Math.sin(2 * radians);
      setDotPosition({ x, y });
    }, 50);

    return () => clearInterval(timer);
  }, [isPlaying, angle]);

  return (
    <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <path
          d="M 80 128 Q 200 64, 320 128 Q 200 192, 80 128"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
        />
      </svg>
      <div
        className="absolute w-4 h-4 bg-blue-500 rounded-full transition-all duration-75"
        style={{
          left: `${dotPosition.x}%`,
          top: `${dotPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

const FocusShiftExercise: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = false }) => {
  const [focusNear, setFocusNear] = React.useState(true);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setFocusNear(prev => !prev);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="text-center space-y-8">
      <div className={`transition-all duration-1000 ${focusNear ? 'scale-150' : 'scale-75 opacity-50'}`}>
        <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-2" />
        <p className="text-sm font-medium">Near Target</p>
      </div>
      
      <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">
        {focusNear ? 'Focus NEAR' : 'Focus FAR'}
      </div>
      
      <div className={`transition-all duration-1000 ${!focusNear ? 'scale-150' : 'scale-75 opacity-50'}`}>
        <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2" />
        <p className="text-sm font-medium">Far Target</p>
      </div>
    </div>
  );
};

const PalmingExercise: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = false }) => {
  return (
    <div className="text-center space-y-6">
      <div className="w-32 h-32 bg-black rounded-full mx-auto flex items-center justify-center">
        <div className="text-white text-sm">Complete Darkness</div>
      </div>
      <div className="space-y-2">
        <p className="font-medium text-gray-800 dark:text-white">
          Cup your palms over your eyes
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Breathe deeply and visualize complete blackness
        </p>
      </div>
    </div>
  );
};

const EyeRollExercise: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = false }) => {
  const [rotation, setRotation] = React.useState(0);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setRotation(prev => prev + 10);
    }, 200);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="text-center">
      <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 flex items-center justify-center relative">
        <div 
          className="w-4 h-4 bg-blue-500 rounded-full absolute transition-all duration-200"
          style={{
            transform: `rotate(${rotation}deg) translateY(-48px)`,
            transformOrigin: '50% 48px'
          }}
        />
        <Eye className="w-16 h-16 text-gray-400" />
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Follow the dot with your eyes
      </p>
    </div>
  );
};

const ConvergenceExercise: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = false }) => {
  const [distance, setDistance] = React.useState(100);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setDistance(prev => {
        if (prev <= 20) return 100;
        return prev - 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="text-center">
      <div className="relative h-32 flex items-center justify-center">
        <div 
          className="w-2 h-8 bg-gray-800 dark:bg-gray-200 transition-all duration-100"
          style={{ transform: `translateZ(${distance}px) scale(${1 + (100 - distance) / 100})` }}
        />
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Keep both eyes focused on the pen tip
      </p>
    </div>
  );
};

export default EyeExercises;