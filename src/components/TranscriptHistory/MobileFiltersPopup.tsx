import React, { useState } from 'react';
import { Filter, X, Bookmark } from 'lucide-react';

interface Filters {
  startDate: string;
  endDate: string;
}

interface MobileFiltersPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onClear: () => void;
  onSave: (filters: any) => void;
}

const MobileFiltersPopup: React.FC<MobileFiltersPopupProps> = ({
  isOpen,
  onClose,
  onApply,
  onClear
}) => {
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: ''
  });
  
  if (!isOpen) return null;

  const onFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearAll = () => {
    setFilters({
      startDate: '',
      endDate: ''
    });
    onClear();
  };

  const handleApplyFilters = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200 flex flex-col max-h-[32rem]">
      {/* Header - Fixed */}
      <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#605BFF]" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Transcript</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Start Date</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => onFilterChange('startDate', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">End Date</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => onFilterChange('endDate', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex gap-2">
          <button
            onClick={handleClearAll}
            className="flex-1 px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Clear All
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 px-3 py-2.5 text-sm font-medium bg-white border border-[#605BFF] text-[#605BFF] rounded-lg transition-all duration-200 hover:bg-[#605BFF] hover:text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFiltersPopup;