import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { KnowledgeTable } from './KnowledgeTable';
import { useKnowledgeBase } from './KnowledgeBaseContext';

interface BuyerSectionProps {
  onCreateEntry: (type: 'buyer-question' | 'buyer-objection') => void;
  onSubTabChange: (subTab: 'questions' | 'objections') => void;
  currentPage?: number;
  itemsPerPage?: number;
}

export function BuyerSection({ onCreateEntry, onSubTabChange, currentPage = 1, itemsPerPage = 10 }: BuyerSectionProps) {
  const { buyerQuestions, buyerObjections } = useKnowledgeBase();
  const [activeSubTab, setActiveSubTab] = useState<'questions' | 'objections'>('questions');
  const [searchTerm, setSearchTerm] = useState('');

  const questionColumns = [
    { key: 'question', label: 'Question', sortable: true },
    { key: 'category', label: 'FEARS Category', sortable: true },
    { key: 'answers', label: 'Answers Available', sortable: false },
    { key: 'createdAt', label: 'Date Added', sortable: true },
  ];

  const objectionColumns = [
    { key: 'objection', label: 'Objection', sortable: true },
    { key: 'category', label: 'TEMPT Category', sortable: true },
    { key: 'answers', label: 'Responses Available', sortable: false },
    { key: 'createdAt', label: 'Date Added', sortable: true },
  ];

  const filteredQuestions = buyerQuestions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredObjections = buyerObjections.filter(o =>
    o.objection.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);
  const paginatedObjections = filteredObjections.slice(startIndex, endIndex);

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header with tabs and controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setActiveSubTab('questions');
              onSubTabChange('questions');
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeSubTab === 'questions'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Questions
          </button>
          <button
            onClick={() => {
              setActiveSubTab('objections');
              onSubTabChange('objections');
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeSubTab === 'objections'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Objections
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#605BFF] rounded-lg border border-[#605BFF] hover:bg-[#605BFF] hover:text-white transition-colors"
          >
            Search
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#FF8E1C] rounded-lg border border-[#FF8E1C] hover:bg-[#FF8E1C] hover:text-white transition-colors"
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeSubTab === 'questions' ? (
          <KnowledgeTable
            data={paginatedQuestions}
            columns={questionColumns}
            emptyMessage="No questions found. Add your first buyer question to get started."
          />
        ) : (
          <KnowledgeTable
            data={paginatedObjections}
            columns={objectionColumns}
            emptyMessage="No objections found. Add your first buyer objection to get started."
          />
        )}
      </div>
    </div>
  );
}