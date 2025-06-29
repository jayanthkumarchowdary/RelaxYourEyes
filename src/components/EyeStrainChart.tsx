import React from 'react';
import { Activity } from 'lucide-react';

const EyeStrainChart: React.FC = () => {
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return {
      time: `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'PM' : 'AM'}`,
      strain: Math.floor(Math.random() * 80) + 10,
    };
  });

  const maxStrain = Math.max(...hours.map(h => h.strain));

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Eye Strain Throughout Day
        </h3>
      </div>

      <div className="space-y-3">
        {hours.map((hour, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 w-12">
              {hour.time}
            </span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  hour.strain < 30 ? 'bg-green-500' :
                  hour.strain < 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(hour.strain / maxStrain) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300 w-8">
              {hour.strain}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Low strain</span>
        <span>High strain</span>
      </div>
    </div>
  );
};

export default EyeStrainChart;