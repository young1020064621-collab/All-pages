import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { KnowledgeTable } from './KnowledgeTable';
import { useKnowledgeBase } from './KnowledgeBaseContext';

interface SellerSectionProps {
  onCreateEntry: (type: 'seller') => void;
  currentPage?: number;
  itemsPerPage?: number;
}

export function SellerSection({ onCreateEntry, currentPage = 1, itemsPerPage = 10 }: SellerSectionProps) {
  const { sellerResources } = useKnowledgeBase();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'title', label: 'Resource Title', sortable: true },
    { key: 'category', label: 'IMPACT Category', sortable: true },
    //{ key: 'type', label: 'Type', sortable: true },
    { key: 'createdAt', label: 'Date Added', sortable: true },
  ];

  const filteredResources = sellerResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header with controls */}
      <div className="flex justify-end items-center mb-6">
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
        <KnowledgeTable
          data={paginatedResources}
          columns={columns}
          emptyMessage="No seller resources found. Add your first resource to get started."
        />
      </div>
    </div>
  );
}