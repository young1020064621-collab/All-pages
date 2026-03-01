import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react'; // 假设你使用了 lucide-react 作为图标库

const SingleSelectComboBox = ({
  label,
  options,
  value, // 传入当前选中的值，例如 'user123'
  onChange, // 传入一个函数，用于更新父组件中的值
  placeholder = "Select a client"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // 根据传入的 value 找到对应的 option 对象
  const selectedOption = options.find(option => option.id === value);

  // 过滤选项，如果搜索词为空则显示所有选项
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理选项选择
  const handleOptionSelect = (option) => {
    onChange(option.id); // 调用父组件的 onChange 函数，并传入选中的 id
    setIsOpen(false);
    setSearchTerm('');
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

      <div className="relative" ref={dropdownRef}>
        <div
          className="min-h-[42px] w-full border border-gray-300 rounded-lg bg-white cursor-pointer focus-within:ring-2 focus-within:ring-[#605BFF] focus-within:border-transparent p-2"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              inputRef.current?.focus();
            }
          }}
        >
          <div className="flex items-center gap-1 min-h-[26px]">
            {selectedOption ? (
              // 移除选中项的背景和边框，只显示文本
              <span className="text-sm"> 
                {selectedOption.name}
              </span>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="flex-1 outline-none text-sm min-w-[100px]"
                onFocus={() => setIsOpen(true)}
              />
            )}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-auto ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* 下拉菜单 */}
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
                {searchTerm ? 'No matching results' : 'No options available'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSelectComboBox;