import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Speech, Calendar, MoreVertical } from 'lucide-react';

interface Column {
  key: string;
  title: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onRowAction?: (row: any) => void;
  itemsPerPage?: number;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onRowAction,
  itemsPerPage = 5
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'Internal':
        return <Speech className="w-4 h-4 text-[#FF8E1C]" />;
      case 'External':
        return <Calendar className="w-4 h-4 text-[#605BFF]" />;
      default:
        return <Calendar className="w-4 h-4 text-[#605BFF]" />;
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                >
                  {column.title}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr
                key={row.id || index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-gray-900">
                    {column.render
                      ? column.render(row[column.key], row)
                      : column.key === 'title' && row.type && (row.type === 'Internal' || row.type === 'External')
                      ? (
                          <div className="flex items-center">
                            <div className="p-2 rounded-lg mr-3">
                              {getMeetingTypeIcon(row.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{row[column.key]}</p>
                            </div>
                          </div>
                        )
                      : row[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm relative">
                  <div ref={openMenuId === row.id ? menuRef : null}>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      title="More Actions"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenuId === row.id && (
                      <div className="absolute right-0 top-12 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                        <button
                          onClick={() => {
                            onRowAction?.(row);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => {
                            // Edit functionality can be added here
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            // Delete functionality can be added here
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};