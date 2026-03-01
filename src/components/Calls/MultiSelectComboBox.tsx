import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface Option {
  id: string;
  name: string;
  email?: string;
}

interface MultiSelectComboBoxProps {
  label?: string;
  options: Option[];
  selectedOptions: Option[];
  onSelectionChange: (selected: Option[]) => void;
  placeholder?: string;
}

const MultiSelectComboBox: React.FC<MultiSelectComboBoxProps> = ({
  label,
  options,
  selectedOptions,
  onSelectionChange,
  placeholder = "Select options..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option => 
    !selectedOptions.some(selected => selected.id === option.id) &&
    (option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (option.email && option.email.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleOptionSelect = (option: Option) => {
    onSelectionChange([...selectedOptions, option]);
    setSearchTerm('');
    // Keep dropdown open after selection
  };

  const handleOptionRemove = (optionToRemove: Option) => {
    onSelectionChange(selectedOptions.filter(option => option.id !== optionToRemove.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="relative" ref={dropdownRef}>
        <div 
          className="min-h-[42px] w-full border border-gray-300 rounded-lg bg-white cursor-text focus-within:ring-2 focus-within:ring-[#605BFF] focus-within:border-transparent p-2"
          onClick={() => {
            setIsOpen(true);
            inputRef.current?.focus();
          }}
        >
          <div className="flex flex-wrap items-center gap-1 min-h-[26px]">
            {/* Selected Options Tags - Inside the input box */}
            {selectedOptions.map((option) => (
              <span
                key={option.id}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-[#605BFF] bg-opacity-10 text-[#605BFF] rounded-md flex-shrink-0"
              >
                {option.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionRemove(option);
                  }}
                  className="hover:bg-[#605BFF] hover:bg-opacity-20 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={selectedOptions.length === 0 ? placeholder : ""}
              className="flex-1 outline-none text-sm min-w-[100px]"
              onFocus={() => setIsOpen(true)}
            />
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-sm">{option.name}</div>
                  {option.email && (
                    <div className="text-xs text-gray-500">{option.email}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                {searchTerm ? 'No matching results' : 'No more options available'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectComboBox;