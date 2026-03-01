import React, { useState } from 'react';
import { Plus, RefreshCw, Download, Printer, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Navigation } from './Navigation';
import { BuyerSection } from './BuyerSection';
import { SellerSection } from './SellerSection';
import { CreateEntryModal } from './CreateEntryModal';
import { KnowledgeBaseProvider, useKnowledgeBase } from './KnowledgeBaseContext';

function KBPageContent() {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  const [activeSubTab, setActiveSubTab] = useState<'questions' | 'objections'>('questions');
  const [activeBuyerSubTab, setActiveBuyerSubTab] = useState<'questions' | 'objections'>('questions');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTypeSelectionModal, setShowTypeSelectionModal] = useState(false);
  const [createType, setCreateType] = useState<'buyer-question' | 'buyer-objection' | 'seller'>('buyer-question');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate pagination based on actual data
  const { buyerQuestions, buyerObjections, sellerResources } = useKnowledgeBase();
  
  const getCurrentData = () => {
    if (activeTab === 'buyer') {
      return activeBuyerSubTab === 'questions' ? buyerQuestions : buyerObjections;
    }
    return sellerResources;
  };
  
  const currentData = getCurrentData();
  const totalItems = currentData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const openModal = (type: 'buyer-question' | 'buyer-objection' | 'seller') => {
    setCreateType(type);
    setShowCreateModal(true);
  };

  const handleSubTabChange = (subTab: 'questions' | 'objections') => {
    setActiveSubTab(subTab);
    setActiveBuyerSubTab(subTab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleCreateEntry = (type: 'buyer-question' | 'buyer-objection' | 'seller') => {
    openModal(type);
  };

  const handleAddClick = () => {
    setShowTypeSelectionModal(true);
  };

  const handleTypeSelection = (type: 'buyer' | 'seller') => {
    setShowTypeSelectionModal(false);
    if (type === 'buyer') {
      openModal(activeSubTab === 'questions' ? 'buyer-question' : 'buyer-objection');
    } else {
      openModal('seller');
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-1 items-center space-x-2">
            <h1 className="flex items-center text-2xl font-bold text-gray-900">
              <span className="mr-4">Knowledge Base</span>
              <button className="text-gray-400 hover:text-[#605BFF]">
                <RefreshCw className="w-5 h-5" />
              </button>
            </h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 px-3 py-2 text-white bg-[#605BFF] rounded-lg hover:bg-[#4B46CC] transition-colors"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Add New</span>
            </button>
            
            {/* Action Icons */}
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Print"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 py-6 flex flex-col overflow-hidden">
        <Navigation activeTab={activeTab} onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }} />

        <div className="mt-8 flex-1 overflow-y-auto">
          {activeTab === 'buyer' ? (
            <BuyerSection 
              onCreateEntry={handleCreateEntry}
              onSubTabChange={handleSubTabChange}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          ) : (
            <SellerSection 
              onCreateEntry={handleCreateEntry}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200 flex-shrink-0 mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
              >
                &lt;
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentPage === pageNum
                        ? 'text-[#605BFF] font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
              >
                &gt;
              </button>
            </div>
            
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border-0 bg-transparent text-sm text-gray-700 focus:outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1rem',
                paddingRight: '2rem'
              }}
            >
              <option value={10}>10 / Page</option>
              <option value={20}>20 / Page</option>
              <option value={50}>50 / Page</option>
              <option value={100}>100 / Page</option>
            </select>
          </div>

          <div className="text-sm text-gray-700">
            <span className="font-bold">Total : {totalItems}</span>
          </div>
        </div>
      </div>

      {/* Type Selection Modal */}
      {showTypeSelectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="w-[500px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setShowTypeSelectionModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              <div className="text-center mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Please select which type to add new content to:
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleTypeSelection('buyer')}
                  className="w-full px-6 py-3 text-sm font-medium text-[#605BFF] bg-white border border-[#605BFF] hover:bg-[#605BFF] hover:text-white rounded-lg transition-all duration-200 shadow-sm"
                >
                  Buyer
                </button>
                <button
                  onClick={() => handleTypeSelection('seller')}
                  className="w-full px-6 py-3 text-sm font-medium text-[#FF8E1C] bg-white border border-[#FF8E1C] hover:bg-[#FF8E1C] hover:text-white rounded-lg transition-all duration-200 shadow-sm"
                >
                  Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CreateEntryModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        type={createType}
      />
    </div>
  );
}

function KBPage() {
  return (
    <KnowledgeBaseProvider>
      <KBPageContent />
    </KnowledgeBaseProvider>
  );
}

export default KBPage;