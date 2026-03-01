import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface MeetingFilters {
  type: string;
  status: string;
}

interface DashboardMeetingFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onClear: () => void;
}

const DashboardMeetingFilter: React.FC<DashboardMeetingFilterProps> = ({
  isOpen,
  onClose,
  onApply,
  onClear
}) => {
  const [filters, setFilters] = useState<MeetingFilters>({
    type: '',
    status: ''
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
      type: '',
      status: ''
    });
    onClear();
  };

  const handleApplyFilters = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200 flex flex-col max-h-[32rem]">
      {/* Header - Fixed */}
      <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#605BFF]" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Meetings</h3>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => onFilterChange('type', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1rem 1rem'
                  }}
                >
                  <option value="">All Types</option>
                  <option value="demo">Meeting</option>
                  <option value="review">Call</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange('status', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1rem 1rem'
                  }}
                >
                  <option value="">All Status</option>
                  <option value="scheduled">Draft</option>
                  <option value="in-progress">Planned</option>
                  <option value="postponed">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>                  
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex gap-3">
          <button
            onClick={handleClearAll}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Clear All
          </button>
          <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2.5 text-sm font-medium bg-white border border-[#605BFF] text-[#605BFF] rounded-lg transition-all duration-200 hover:bg-[#605BFF] hover:text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply Filters
            </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardMeetingFilter;