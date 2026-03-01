import React, { useState } from 'react';
import { X, FolderUp } from 'lucide-react';

interface ImportPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSave?: (url: string, password: string) => void;
}

const ImportPopup: React.FC<ImportPopupProps> = ({
  isVisible,
  onClose,
  onSave
}) => {
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave(url, password);
    }
    onClose();
  };

  const handleCancel = () => {
    setUrl('');
    setPassword('');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60]">
      <div className="w-[500px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderUp size={18} className="text-[#605BFF]" />
              <h3 className="text-lg font-semibold text-gray-900">Importing Meeting Intelligence</h3>
            </div>
            <button
              onClick={handleCancel}
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
          <div className="space-y-6">
            {/* URL Input */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/meeting-recording"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password (if protected)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password if required"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#605BFF]/20 focus:border-[#605BFF] transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-100"></div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white flex-shrink-0">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!url.trim()}
              className={`px-6 py-2.5 text-sm font-medium text-[#605BFF] rounded-lg transition-all duration-200 ${
                url.trim()
                  ? 'bg-white border border-[#605BFF] hover:bg-[#605BFF] hover:text-white'
                  : 'text-white bg-gray-300 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportPopup;