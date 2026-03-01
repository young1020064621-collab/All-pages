import React, { useState, useMemo } from 'react';
import { X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FolderUp } from 'lucide-react';

interface TranscriptItem {
  id: number;
  date: string;
  name: string;
}

interface ImportThirdPartPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onImport?: (item: TranscriptItem) => void;
}

type SortDirection = 'asc' | 'desc' | null;

const ImportThirdPartPopup: React.FC<ImportThirdPartPopupProps> = ({
  isVisible,
  onClose,
  onImport
}) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for Google Meet Transcripts
  const mockTranscripts: TranscriptItem[] = [
    { id: 1, date: '2024-01-24', name: 'Team Standup Meeting' },
    { id: 2, date: '2024-01-23', name: 'Product Review Session' },
    { id: 3, date: '2024-01-22', name: 'Client Consultation' },
    { id: 4, date: '2024-01-21', name: 'Strategy Planning' },
    { id: 5, date: '2024-01-20', name: 'Design Review' },
    { id: 6, date: '2024-01-19', name: 'Weekly All-Hands' },
    { id: 7, date: '2024-01-18', name: 'Technical Discussion' },
    { id: 8, date: '2024-01-17', name: 'Budget Meeting' },
    { id: 9, date: '2024-01-16', name: 'Project Kickoff' },
    { id: 10, date: '2024-01-15', name: 'Performance Review' },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockTranscripts.length / itemsPerPage);

  const handleSort = () => {
    if (sortDirection === null) {
      setSortDirection('desc');
    } else if (sortDirection === 'desc') {
      setSortDirection('asc');
    } else {
      setSortDirection('desc');
    }
  };

  const sortedTranscripts = useMemo(() => {
    if (sortDirection === null) return mockTranscripts;
    
    return [...mockTranscripts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      if (sortDirection === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }, [sortDirection]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayTranscripts = sortedTranscripts.slice(startIndex, startIndex + itemsPerPage);

  const handleImport = (item: TranscriptItem) => {
    if (onImport) {
      onImport(item);
    }
    console.log('Importing transcript:', item);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60]">
      <div className="w-[700px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderUp size={18} className="text-[#605BFF]" />
              <h3 className="text-lg font-semibold text-gray-900">Google Meet Transcripts</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-100"></div>

        {/* Body */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={handleSort}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#605BFF] transition-colors duration-200"
                    >
                      Date
                      <div className="flex flex-col">
                        <ChevronUp 
                          size={12} 
                          className={`${sortDirection === 'asc' ? 'text-[#605BFF]' : 'text-gray-400'}`} 
                        />
                        <ChevronDown 
                          size={12} 
                          className={`-mt-1 ${sortDirection === 'desc' ? 'text-[#605BFF]' : 'text-gray-400'}`} 
                        />
                      </div>
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayTranscripts.map((transcript) => (
                  <tr key={transcript.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatDate(transcript.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {transcript.name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleImport(transcript)}
                        className="px-4 py-1.5 text-sm font-medium text-[#605BFF] hover:text-white hover:bg-[#605BFF] border border-[#605BFF] rounded-lg transition-all duration-200"
                      >
                        Import
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-start mt-4">
            <div className="flex items-center gap-1">
              {/* Previous Arrow */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center rounded transition-all duration-200 ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-[#605BFF] hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded transition-all duration-200 ${
                    currentPage === page
                      ? 'text-[#605BFF]'
                      : 'text-gray-600 hover:text-[#605BFF] hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              {/* Next Arrow */}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-[#605BFF] hover:bg-gray-100'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportThirdPartPopup;