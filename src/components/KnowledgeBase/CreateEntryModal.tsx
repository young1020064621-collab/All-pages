import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2, ChevronDown, Bot } from 'lucide-react';
import { useKnowledgeBase } from './KnowledgeBaseContext';

interface CreateEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'buyer-question' | 'buyer-objection' | 'seller';
}

const FEARS_CATEGORIES = {
  'Functionalities': 'Questions about product features and capabilities',
  'Economics': 'Questions about pricing, cost-effectiveness, and financial impact',
  'Acceptance': 'Questions about user adoption and organizational buy-in',
  'Risk': 'Questions about potential risks and mitigation strategies',
  'Support & Services': 'Questions about ongoing support and service offerings'
};

const TEMPT_CATEGORIES = {
  'Technology': 'Concerns about technical implementation and compatibility',
  'Economy': 'Economic objections and budget constraints',
  'Money': 'Direct cost and pricing objections',
  'People': 'Human resource and organizational objections',
  'Timeframe': 'Timing and scheduling related objections'
};

const IMPACT_CATEGORIES = {
  'Identify NEEDS, Influencers, Issues and Implications': '',
  'Money, Metrics': '',
  'Processes and Parameters for Decision': '',
  'Access to Approvers, Champions, Coach and Decision Makers': '',
  'Competition, Clarification and Closing': '',
  'Timing and Time Frame': ''
};

export function CreateEntryModal({ isOpen, onClose, type }: CreateEntryModalProps) {
  const { addBuyerQuestion, addBuyerObjection, addSellerResource } = useKnowledgeBase();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    framework: type === 'buyer-question' ? 'FEARS' : type === 'buyer-objection' ? 'TEMPT' : 'IMPACT',
    category: '',
    answers: [''],
    resourceType: 'Guide'
  });
  const [showBotPopup, setShowBotPopup] = useState(false);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  if (!isOpen) return null;

  const getFrameworkCategories = (): Record<string, string> => {
    switch (formData.framework) {
      case 'FEARS': return FEARS_CATEGORIES;
      case 'TEMPT': return TEMPT_CATEGORIES;
      case 'IMPACT': return IMPACT_CATEGORIES;
      default: return {};
    }
  };

  const handleAIGenerate = () => {
    // Simulate AI generation
    const categories = Object.keys(getFrameworkCategories());
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    if (type === 'buyer-question' || type === 'buyer-objection') {
      // Generate 3 answers/responses
      const sampleResponses = [
        `Based on industry best practices, here's a comprehensive response to address this ${type.includes('question') ? 'question' : 'objection'}...`,
        `Consider this approach: Start by acknowledging the concern and then provide specific examples...`,
        `A proven strategy is to highlight the benefits while addressing the underlying concern directly...`
      ];
      
      setFormData({ 
        ...formData, 
        category: randomCategory,
        answers: sampleResponses
      });
    } else {
      // For seller resources, just classify category and type
      const resourceTypes = ['Guide', 'Template', 'Checklist', 'Best Practice', 'Case Study'];
      const randomType = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
      
      setFormData({ 
        ...formData, 
        category: randomCategory,
        resourceType: randomType
      });
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({ ...formData, answers: newAnswers });
  };

  const addAnswerField = () => {
    setFormData({ ...formData, answers: [...formData.answers, ''] });
  };

  const removeAnswerField = (index: number) => {
    if (formData.answers.length > 1) {
      const newAnswers = formData.answers.filter((_, i) => i !== index);
      setFormData({ ...formData, answers: newAnswers });
    }
  };

  const productOptions = [
    'CRM Software',
    'Analytics Platform',
    'Marketing Automation',
    'Project Management Tool',
    'Customer Support System',
    'E-commerce Platform'
  ];

  const handleProductToggle = (product: string) => {
    setSelectedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const handleBotGenerate = () => {
    if (selectedProducts.length === 0) return;
    
    const productList = selectedProducts.join(', ');
    let generatedResponse = '';
    
    if (type === 'buyer-question') {
      generatedResponse = `Based on our ${productList} solution${selectedProducts.length > 1 ? 's' : ''}, here's a comprehensive response: Our integrated platform addresses your specific needs by providing tailored functionality that aligns with industry best practices. We understand the unique challenges you face and have designed our ${productList} to seamlessly integrate with your existing workflows while delivering measurable value and ROI.`;
    } else if (type === 'buyer-objection') {
      generatedResponse = `I understand your concerns. Many organizations have had similar considerations when evaluating ${productList}. Our solution${selectedProducts.length > 1 ? 's' : ''} specifically address${selectedProducts.length > 1 ? '' : 'es'} these challenges by offering proven strategies and implementations. Let me share how we can work together to ensure a smooth deployment that delivers the results you're looking for with our ${productList} platform${selectedProducts.length > 1 ? 's' : ''}.`;
    }
    
    // Update the specific answer field
    const newAnswers = [...formData.answers];
    newAnswers[currentAnswerIndex] = generatedResponse;
    setFormData({ ...formData, answers: newAnswers });
    
    // Reset and close popup
    setSelectedProducts([]);
    setShowBotPopup(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseEntry = {
      category: formData.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      frequency: 1
    };

    switch (type) {
      case 'buyer-question':
        addBuyerQuestion({
          ...baseEntry,
          question: formData.content,
          answers: formData.answers.filter(answer => answer.trim() !== ''),
        });
        break;
      case 'buyer-objection':
        addBuyerObjection({
          ...baseEntry,
          objection: formData.content,
          answers: formData.answers.filter(answer => answer.trim() !== ''),
        });
        break;
      case 'seller':
        addSellerResource({
          ...baseEntry,
          title: formData.title,
          type: formData.resourceType,
        });
        break;
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      framework: type === 'buyer-question' ? 'FEARS' : type === 'buyer-objection' ? 'TEMPT' : 'IMPACT',
      category: '',
      answers: [''],
      resourceType: 'Guide'
    });

    onClose();
  };

  const isBuyerType = type.includes('buyer');
  const modalTitle = {
    'buyer-question': 'Add Buyer Question/Objection',
    'buyer-objection': 'Add Buyer Question/Objection',
    'seller': 'Add Seller Question'
  }[type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'seller' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seller Question
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter seller question..."
                  required
                />
              </div>
            )}

            {isBuyerType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {type === 'buyer-question' ? 'Question/Objection' : 'Question/Objection'}
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder={`Enter ${type === 'buyer-question' ? 'question/objection' : 'question/objection'}...`}
                  required
                />
              </div>
            )}

            {/* AI Generate Button */}
            <div className="flex gap-2">
              <h3  className="flex items-center text-lg">
                {isBuyerType ? 'Classification and Response' : 'Classification'}
              </h3>
              <button
                type="button"
                onClick={handleAIGenerate}
                className="flex items-center px-2 py-2 bg-white text-[#FF8E1C] rounded-lg hover:bg-[#FF8E1C] hover:text-white transition-colors"
              >
                <Sparkles className="h-5 w-5 mr-2" />
              </button>
            </div>
            {isBuyerType && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Framework
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={formData.framework}
                      onChange={(e) => setFormData({ ...formData, framework: e.target.value, category: '' })}
                      className="w-full appearance-none px-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent bg-white transition-all duration-200"
                      required
                    >
                      <option value="FEARS">FEARS</option>
                      <option value="TEMPT">TEMPT</option>
                    </select>
                    <ChevronDown
                        size={16}
                        className="absolute right-2 pointer-events-none text-gray-400"
                      />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full appearance-none px-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent bg-white transition-all duration-200"
                      required
                    >
                      <option value="">Select category...</option>
                      {Object.entries(getFrameworkCategories()).map(([key]) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-2 pointer-events-none text-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {type === 'seller' && (
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IMPACT Category
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full appearance-none px-2 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent bg-white transition-all duration-200"
                      required
                    >
                      <option value="">Select category...</option>
                      {Object.entries(IMPACT_CATEGORIES).map(([key, description]) => (
                        <option key={key} value={key}>{key}</option>
                      ))}
                    </select>
                     <ChevronDown
                      size={16}
                      className="absolute right-2 pointer-events-none text-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.category && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>{formData.category}:</strong> {getFrameworkCategories()[formData.category]}
                </p>
              </div>
            )}

            {isBuyerType && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {type === 'buyer-question' ? 'Recommend Response' : 'Recommend Response'}
                  </label>
                  <button
                    type="button"
                    onClick={addAnswerField}
                    className="flex items-center px-3 py-1 text-sm bg-white text-[#605BFF] hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add More
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.answers.map((answer, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-600">
                          {type === 'buyer-question' ? 'Response' : 'Response'} {index + 1}
                        </label>
                        {formData.answers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAnswerField(index)}
                            className="flex items-center px-2 py-1 text-xs text-gray-400 rounded hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-5 w-5 mr-1" />
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <textarea
                          value={answer}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                          className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          placeholder={`Enter ${type === 'buyer-question' ? 'answer' : 'response'} ${index + 1}...`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentAnswerIndex(index);
                            setShowBotPopup(true);
                          }}
                          className="absolute top-2 right-2 p-1 text-[#FF8E1C] hover:bg-gray-100 transition-colors"
                          title="Generate AI Response"
                        >
                          <Bot className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#605BFF] text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Bot Popup */}
      {showBotPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">AI Response Generator</h3>
              <button
                onClick={() => setShowBotPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-3">
                   Select Product/Solution
                 </label>
                 <div className="space-y-2">
                   {productOptions.map((product) => (
                     <label key={product} className="flex items-center space-x-3 cursor-pointer">
                       <input
                         type="checkbox"
                         checked={selectedProducts.includes(product)}
                         onChange={() => handleProductToggle(product)}
                         className="w-4 h-4 text-[#605BFF] border-gray-300 rounded focus:ring-[#605BFF] focus:ring-2"
                       />
                       <span className="text-sm text-gray-700">{product}</span>
                     </label>
                   ))}
                 </div>
               </div>
             </div>
            
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowBotPopup(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                 type="button"
                 onClick={handleBotGenerate}
                 disabled={selectedProducts.length === 0}
                 className="px-4 py-2 bg-[#605BFF] text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
               >
                 Generate Response
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}