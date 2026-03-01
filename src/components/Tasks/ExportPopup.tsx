import React, { useState } from 'react';
import { X, Download, FileText, FileSpreadsheet, Check } from 'lucide-react';

interface ExportPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
  dataType?: 'contacts' | 'companies' | 'deals' | 'tasks' | 'meetings';
}

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  selection: 'all' | 'selected' | 'filtered';
  includeHeaders: boolean;
  dateRange?: {
    from: string;
    to: string;
  };
}

const ExportPopup: React.FC<ExportPopupProps> = ({
  isOpen,
  onClose,
  onExport,
  dataType = 'contacts'
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    selection: 'all',
    includeHeaders: true,
    dateRange: {
      from: '',
      to: ''
    }
  });

  const [isDateRangeEnabled, setIsDateRangeEnabled] = useState(false);

  if (!isOpen) return null;

  const handleFormatChange = (format: 'csv' | 'xlsx' | 'pdf') => {
    setExportOptions(prev => ({
      ...prev,
      format
    }));
  };

  const handleSelectionChange = (selection: 'all' | 'selected' | 'filtered') => {
    setExportOptions(prev => ({
      ...prev,
      selection
    }));
  };

  const handleHeadersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExportOptions(prev => ({
      ...prev,
      includeHeaders: e.target.checked
    }));
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExportOptions(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange!,
        [name]: value
      }
    }));
  };

  const handleExport = () => {
    const options = isDateRangeEnabled
      ? exportOptions
      : { ...exportOptions, dateRange: undefined };
    
    onExport(options);
    onClose();
  };

  const getDataTypeLabel = () => {
    switch (dataType) {
      case 'contacts': return 'Contacts';
      case 'companies': return 'Companies';
      case 'deals': return 'Deals';
      case 'tasks': return 'Tasks';
      case 'meetings': return 'Meetings';
      default: return 'Data';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Download size={18} className="text-[#605BFF]" />
            Export {getDataTypeLabel()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-6">
          {/* Format Selection */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Export Format</h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleFormatChange('csv')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${exportOptions.format === 'csv' ? 'border-[#605BFF] bg-[#605BFF]/5' : 'border-gray-200 hover:border-gray-300'} transition-all duration-200`}
              >
                <FileText size={24} className={exportOptions.format === 'csv' ? 'text-[#605BFF]' : 'text-gray-500'} />
                <span className={`mt-2 text-sm font-medium ${exportOptions.format === 'csv' ? 'text-[#605BFF]' : 'text-gray-700'}`}>CSV</span>
                {exportOptions.format === 'csv' && (
                  <div className="absolute top-2 right-2 bg-[#605BFF] rounded-full p-0.5">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => handleFormatChange('xlsx')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${exportOptions.format === 'xlsx' ? 'border-[#605BFF] bg-[#605BFF]/5' : 'border-gray-200 hover:border-gray-300'} transition-all duration-200`}
              >
                <FileSpreadsheet size={24} className={exportOptions.format === 'xlsx' ? 'text-[#605BFF]' : 'text-gray-500'} />
                <span className={`mt-2 text-sm font-medium ${exportOptions.format === 'xlsx' ? 'text-[#605BFF]' : 'text-gray-700'}`}>XLSX</span>
                {exportOptions.format === 'xlsx' && (
                  <div className="absolute top-2 right-2 bg-[#605BFF] rounded-full p-0.5">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => handleFormatChange('pdf')}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${exportOptions.format === 'pdf' ? 'border-[#605BFF] bg-[#605BFF]/5' : 'border-gray-200 hover:border-gray-300'} transition-all duration-200`}
              >
                <FileText size={24} className={exportOptions.format === 'pdf' ? 'text-[#605BFF]' : 'text-gray-500'} />
                <span className={`mt-2 text-sm font-medium ${exportOptions.format === 'pdf' ? 'text-[#605BFF]' : 'text-gray-700'}`}>PDF</span>
                {exportOptions.format === 'pdf' && (
                  <div className="absolute top-2 right-2 bg-[#605BFF] rounded-full p-0.5">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Data Selection */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Data Selection</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${exportOptions.selection === 'all' ? 'bg-[#605BFF]' : 'border border-gray-300'}`}
                  onClick={() => handleSelectionChange('all')}
                >
                  {exportOptions.selection === 'all' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="text-sm text-gray-700">All {getDataTypeLabel()}</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${exportOptions.selection === 'selected' ? 'bg-[#605BFF]' : 'border border-gray-300'}`}
                  onClick={() => handleSelectionChange('selected')}
                >
                  {exportOptions.selection === 'selected' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="text-sm text-gray-700">Current Page Only</span>
              </label>
              
              {/*<label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${exportOptions.selection === 'filtered' ? 'bg-[#605BFF]' : 'border border-gray-300'}`}
                  onClick={() => handleSelectionChange('filtered')}
                >
                  {exportOptions.selection === 'filtered' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="text-sm text-gray-700">Current Filtered View</span>
              </label>*/}
            </div>
          </div>

          {/* Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Options</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center ${exportOptions.includeHeaders ? 'bg-[#605BFF]' : 'border border-gray-300'}`}
                  onClick={() => setExportOptions(prev => ({ ...prev, includeHeaders: !prev.includeHeaders }))}
                >
                  {exportOptions.includeHeaders && <Check size={10} className="text-white" />}
                </div>
                <span className="text-sm text-gray-700">Include Column Headers</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center ${isDateRangeEnabled ? 'bg-[#605BFF]' : 'border border-gray-300'}`}
                  onClick={() => setIsDateRangeEnabled(!isDateRangeEnabled)}
                >
                  {isDateRangeEnabled && <Check size={10} className="text-white" />}
                </div>
                <span className="text-sm text-gray-700">Limit by Date Range</span>
              </label>
              
              {isDateRangeEnabled && (
                <div className="pl-6 pt-2 grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="from" className="block text-xs font-medium text-gray-500 mb-1">From</label>
                    <input
                      type="date"
                      id="from"
                      name="from"
                      value={exportOptions.dateRange?.from || ''}
                      onChange={handleDateRangeChange}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#605BFF]/20 focus:border-[#605BFF]"
                    />
                  </div>
                  <div>
                    <label htmlFor="to" className="block text-xs font-medium text-gray-500 mb-1">To</label>
                    <input
                      type="date"
                      id="to"
                      name="to"
                      value={exportOptions.dateRange?.to || ''}
                      onChange={handleDateRangeChange}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#605BFF]/20 focus:border-[#605BFF]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium bg-white text-[#605BFF] border border-[#605BFF] rounded-lg hover:bg-[#605BFF] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center gap-1.5"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPopup;