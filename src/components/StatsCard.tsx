import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green' | 'yellow' | 'red' | 'indigo';
  trend?: string;
}

const colorClasses = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
  green: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
  yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  red: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400',
  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-1 text-gray-800 dark:text-white">
          {value}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {title}
        </p>
        {trend && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;