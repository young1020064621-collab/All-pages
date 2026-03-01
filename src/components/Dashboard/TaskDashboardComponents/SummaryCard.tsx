import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface SummaryCardProps {
  title: string;
  value: number;
  description: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'teal';
  showTooltip?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  description,
  icon,
  color = 'blue',
  showTooltip = false
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-600',
    green: 'from-green-500 to-green-600 text-green-600',
    orange: 'from-orange-500 to-orange-600 text-orange-600',
    purple: 'from-purple-500 to-purple-600 text-purple-600',
    red: 'from-red-500 to-red-600 text-red-600',
    teal: 'from-teal-500 to-teal-600 text-teal-600'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm text-gray-600">{title}</p>
            {showTooltip && (
              <Tooltip content={description}>
                <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
              </Tooltip>
            )}
          </div>
          <p className={`text-2xl font-bold ${colorClasses[color].split(' ')[2]}`}>
            {value}
          </p>
        </div>
        {icon && (
          <div className={`p-3 bg-white rounded-full ${colorClasses[color].split(' ')[2]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};