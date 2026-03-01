import React, { useState } from 'react';
import { X, User } from 'lucide-react';

interface UserInfo2Props {
  isVisible: boolean;
  onClose: () => void;
  onBack: () => void;
  onSave: () => void;
}

const UserInfo2: React.FC<UserInfo2Props> = ({
  isVisible,
  onClose,
  onBack,
  onSave
}) => {
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [salesPeople, setSalesPeople] = useState('');

  const companySizes = [
    'Startup (1-10 employees)',
    'Small (11-50 employees)',
    'Medium (51-200 employees)',
    'Large (201-1000 employees)',
    'Enterprise (1000+ employees)'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Real Estate',
    'Marketing & Advertising',
    'Consulting',
    'Other'
  ];

  const salesPeopleOptions = [
    '1-5',
    '6-20',
    '21-30',
    '31-50',
    '50+'
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60]">
      <div className="w-[550px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#605BFF]" />
              <h3 className="text-lg font-semibold text-gray-900">Complete Signup</h3>
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
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Company Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF] transition-all duration-200"
              />
            </div>

            {/* Company Size Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How big is your company?
              </label>
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200 appearance-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1rem 1rem'
                  }}
              >
                <option value="">Select company size</option>
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Industry Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200 appearance-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1rem 1rem'
                  }}
              >
                <option value="">Select industry</option>
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Sales People Radio Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How many sales people does your company have?
              </label>
              <div className="flex gap-2 flex-wrap">
                {salesPeopleOptions.map(option => {
                  const isSelected = salesPeople === option;
                  return (
                    <div
                      key={option}
                      onClick={() => setSalesPeople(option)}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#605BFF] bg-opacity-10 border-[#605BFF] text-[#605BFF]'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                        isSelected ? 'border-[#605BFF]' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-[#605BFF] rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">{option}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all duration-200"
            >
              Back
            </button>
            <button
              onClick={onSave}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-[#605BFF] bg-white border border-[#605BFF] hover:bg-[#605BFF] hover:text-white rounded-lg transition-all duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo2;