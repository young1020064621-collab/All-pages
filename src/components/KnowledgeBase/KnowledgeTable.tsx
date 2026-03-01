import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Eye } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable: boolean;
}

interface KnowledgeTableProps {
  data: any[];
  columns: Column[];
  emptyMessage: string;
}

export function KnowledgeTable({ data, columns, emptyMessage }: KnowledgeTableProps) {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const renderCellContent = (item: any, key: string) => {
    switch (key) {
      case 'answers':
        return (
          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {item.answers?.length || 0} {item.objection ? 'responses' : 'answers'}
            </span>
          </div>
        );
      case 'category':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {item[key]}
          </span>
        );
      case 'type':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {item[key]}
          </span>
        );
      case 'createdAt':
        return new Date(item[key]).toLocaleDateString();
      default:
        return item[key];
    }
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-12 text-center">
          <Eye className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No entries</h3>
          <p className="mt-1 text-sm text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Controls 
      <div className="flex flex-wrap gap-2 mb-4">
        {columns.filter(col => col.sortable).map((column) => (
          <button
            key={column.key}
            onClick={() => handleSort(column.key)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
              sortKey === column.key
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-sm font-medium">{column.label}</span>
            {sortKey === column.key && (
              sortOrder === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )
            )}
          </button>
        ))}
      </div>*/}

      {/* Cards Grid */}
      <div className="space-y-4">
        {sortedData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  {/* Title - using first column as title */}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item[columns[0]?.key] || 'Untitled'}
                  </h3>
                  
                  {/* Category/Type badges */}
                  {columns.slice(1).map((column) => {
                    if (column.key === 'category' || column.key === 'type') {
                      return (
                        <span key={column.key} className={`px-2 py-1 text-xs font-medium rounded-full ${
                          column.key === 'category' ? 'bg-green-100 text-green-800' :
                          column.key === 'type' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item[column.key]}
                        </span>
                      );
                    }
                    return null;
                  }).filter(Boolean)}
                </div>
                
                {/* Content - show other fields */}
                 <div className="space-y-2 mb-4">
                   {columns.slice(1).map((column) => {
                     if (column.key === 'category' || column.key === 'type' || column.key === 'answers' || column.key === 'createdAt' || column.key === 'updatedAt') return null;
                     return (
                       <div key={column.key} className="flex items-start space-x-2">
                         <span className="text-sm font-medium text-gray-500 min-w-0 flex-shrink-0">
                           {column.label}:
                         </span>
                         <div className="text-sm text-gray-700 flex-1">
                           {renderCellContent(item, column.key)}
                         </div>
                       </div>
                     );
                   })}
                 </div>
                 
                 {/* Meta information - Answers, Date Updated, Frequency in one line */}
                 <div className="flex items-center space-x-6 text-sm text-gray-500">

                  {/* Frequency (new field) */}
                   {item.frequency && (
                     <div className="flex items-center space-x-1">
                       <span>{item.frequency} uses</span>
                     </div>
                   )}
                   
                   {/* Answers Available */}
                   {item.answers && (
                     <div className="flex items-center space-x-1">
                       <span>{item.answers?.length || 0} {item.objection ? 'responses' : 'answers'}</span>
                     </div>
                   )}
                   
                   {/* Date Updated */}
                   {item.updatedAt && (
                     <div className="flex items-center space-x-1">
                       <span>Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
                     </div>
                   )}
            
                 </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-[#605BFF] transition-colors rounded-lg hover:bg-gray-50">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}