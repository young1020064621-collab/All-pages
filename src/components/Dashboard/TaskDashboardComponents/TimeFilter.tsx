import React from 'react';

interface TimeFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({
  selectedFilter,
  onFilterChange
}) => {
  const filters = [
    { value: 'today', label: 'Today' },
    { value: 'next7days', label: 'Next 7 days' },
    { value: 'next30days', label: 'Next 30 days' }
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            selectedFilter === filter.value
              ? 'bg-white text-[#605BFF] shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="text-sm font-medium">{filter.label}</span>
        </button>
      ))}
    </div>
  );
};