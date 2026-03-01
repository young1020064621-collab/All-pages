import React, { useState } from 'react';
import { X, Plus, Trash2, AlertCircle, FileText, Flame, ClipboardPlus } from 'lucide-react';

interface Solution {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  implementationTime: string;
}

interface AddSolutionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSolutions: (solutions: Solution[]) => void;
}

const AddSolutionsPopup: React.FC<AddSolutionsPopupProps> = ({ isOpen, onClose, onAddSolutions }) => {
  const [solutions, setSolutions] = useState<Solution[]>([{
    id: '1',
    name: '',
    description: '',
    price: '',
    category: '',
    implementationTime: ''
  }]);
  
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  if (!isOpen) return null;

  const handleChange = (id: string, field: keyof Solution, value: string) => {
    setSolutions(prev => prev.map(solution => {
      if (solution.id === id) {
        return { ...solution, [field]: value };
      }
      return solution;
    }));

    if (errors[id]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: ''
        }
      }));
    }
  };

  const addSolution = () => {
    setSolutions(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        price: '',
        category: '',
        implementationTime: ''
      }
    ]);
  };

  const removeSolution = (id: string) => {
    if (solutions.length === 1) return;
    setSolutions(prev => prev.filter(solution => solution.id !== id));
    
    if (errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;
    
    solutions.forEach(solution => {
      const solutionErrors: Record<string, string> = {};
      
      if (!solution.name.trim()) {
        solutionErrors.name = 'Name is required';
        isValid = false;
      }
      
      if (!solution.category.trim()) {
        solutionErrors.category = 'Category is required';
        isValid = false;
      }
      
      if (solution.price && !/^\$?\d+(\.\d{1,2})?$/.test(solution.price)) {
        solutionErrors.price = 'Invalid price format';
        isValid = false;
      }
      
      if (Object.keys(solutionErrors).length > 0) {
        newErrors[solution.id] = solutionErrors;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddSolutions(solutions);
      onClose();
    }
  };

  const categoryOptions = ['Software', 'Hardware', 'Service', 'Consulting', 'Training', 'Support', 'Custom'];
  const implementationTimeOptions = ['< 1 week', '1-2 weeks', '2-4 weeks', '1-3 months', '3+ months'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardPlus size={18} className="text-[#605BFF]" />
            <h3 className="text-lg font-semibold text-gray-900">Add Solutions</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form - Body Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-6">
            {solutions.map((solution, index) => (
              <React.Fragment key={solution.id}>
                <div className="space-y-4"> {/* 移除 border 和 border-gray-200 类 */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">Solution {index + 1}</h4>
                    {solutions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSolution(solution.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="col-span-2">
                      <label htmlFor={`name-${solution.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Solution Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id={`name-${solution.id}`}
                        value={solution.name}
                        onChange={(e) => handleChange(solution.id, 'name', e.target.value)}
                        placeholder="Enter solution name"
                        className={`w-full px-3 py-2 border ${errors[solution.id]?.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF]`}
                      />
                      {errors[solution.id]?.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors[solution.id].name}
                        </p>
                      )}
                    </div>
                    
                    {/* Description */}
                    <div className="col-span-2">
                      <label htmlFor={`description-${solution.id}`} className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <FileText size={14} className="text-gray-500" />
                        Description
                      </label>
                      <textarea
                        id={`description-${solution.id}`}
                        value={solution.description}
                        onChange={(e) => handleChange(solution.id, 'description', e.target.value)}
                        placeholder="Enter solution description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] resize-none"
                      />
                    </div>                  
                    
                    {/* Key Competitors */}
                    <div className="col-span-2">
                      <label htmlFor={`price-${solution.id}`} className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Flame size={14} className="text-gray-500" />
                        Key Competitors
                      </label>
                      <input
                        type="text"
                        id={`price-${solution.id}`}
                        value={solution.price}
                        onChange={(e) => handleChange(solution.id, 'price', e.target.value)}
                        placeholder="e.g. Company A"
                        className={`w-full px-3 py-2 border ${errors[solution.id]?.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF]`}
                      />
                      {errors[solution.id]?.price && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors[solution.id].price}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {index < solutions.length - 1 && (
                  <div className="border-t border-dashed border-gray-200"></div>
                )}
              </React.Fragment>
            ))}
            
            {/* Add More Button */}
            <button
              type="button"
              onClick={addSolution}
              className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <Plus size={16} />
              Add Another Solution
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end gap-3 rounded-b-xl"> {/* 修改：添加 rounded-b-xl */}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-white text-[#605BFF] border border-[#605BFF] rounded-lg hover:bg-[#605BFF] hover:text-white transition-all duration-200 active:scale-[0.98]"
          >
            Add Solutions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSolutionsPopup;