import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  id: string;
  label: string;
}

interface SelectComboBoxProps {
  label: string;
  options: SelectOption[];
  selectedOption?: SelectOption;
  onSelectionChange: (selected: SelectOption) => void;
  placeholder?: string;
}

const SelectComboBox: React.FC<SelectComboBoxProps> = ({
  label,
  options,
  selectedOption,
  onSelectionChange,
  placeholder = "Select an option..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (option: SelectOption) => {
    onSelectionChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="relative" ref={dropdownRef}>
        <div 
          className="w-full h-[42px] border border-gray-300 rounded-lg p-3 bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 focus-within:ring-2 focus-within:ring-[#605BFF] focus-within:border-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`text-sm ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={`px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                  selectedOption?.id === option.id ? 'bg-[#605BFF] bg-opacity-10 text-[#605BFF]' : 'text-gray-900'
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectComboBox;