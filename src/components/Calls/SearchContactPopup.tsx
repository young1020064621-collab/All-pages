import React, { useState, useMemo } from 'react';
import { X, Search, Eraser, UserSearch } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
}

interface SearchContactPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (selectedContacts: Contact[]) => void;
  selectedContacts?: Contact[];
}

// Sample contact data
const SAMPLE_CONTACTS: Contact[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
  { id: '3', name: 'Michael Chen', email: 'michael.chen@tech.co' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@business.org' },
  { id: '5', name: 'David Wilson', email: 'david.wilson@startup.io' },
  { id: '6', name: 'Lisa Anderson', email: 'lisa.anderson@corp.com' },
  { id: '7', name: 'Robert Taylor', email: 'robert.taylor@agency.net' },
  { id: '8', name: 'Jennifer Brown', email: 'jennifer.brown@firm.biz' },
  { id: '9', name: 'James Miller', email: 'james.miller@solutions.co' },
  { id: '10', name: 'Maria Garcia', email: 'maria.garcia@enterprise.com' },
  { id: '11', name: 'Christopher Lee', email: 'chris.lee@innovation.io' },
  { id: '12', name: 'Ashley White', email: 'ashley.white@digital.agency' },
  { id: '13', name: 'Daniel Martinez', email: 'daniel.martinez@consulting.pro' },
  { id: '14', name: 'Jessica Thompson', email: 'jessica.thompson@services.com' },
  { id: '15', name: 'Matthew Jackson', email: 'matthew.jackson@solutions.net' }
];

const SearchContactPopup: React.FC<SearchContactPopupProps> = ({
  isVisible,
  onClose,
  onApply,
  selectedContacts = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSelected, setCurrentSelected] = useState<Contact[]>(selectedContacts);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_CONTACTS;
    
    const query = searchQuery.toLowerCase();
    return SAMPLE_CONTACTS.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = () => {
    // Search is handled automatically via filteredContacts
    // This function could trigger additional search logic if needed
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleSelectContact = (contact: Contact) => {
    const isSelected = currentSelected.some(c => c.id === contact.id);
    if (isSelected) {
      setCurrentSelected(currentSelected.filter(c => c.id !== contact.id));
    } else {
      setCurrentSelected([...currentSelected, contact]);
    }
  };

  const handleApply = () => {
    onApply(currentSelected);
    onClose();
  };

  const handleCancel = () => {
    setCurrentSelected(selectedContacts); // Reset to original selection
    onClose();
  };

  const isContactSelected = (contact: Contact) => {
    return currentSelected.some(c => c.id === contact.id);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60]">
      <div className="w-[800px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserSearch size={18} className="text-[#605BFF]" />
              <h3 className="text-lg font-semibold text-gray-900">Search Contacts</h3>
            </div>
            
            {/* Search Controls */}
            <div className="flex items-center gap-2">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-64 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF] transition-all duration-200"
                />
              </div>
              
              {/* Clear Button */}
              <button
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Clear search"
              >
                <Eraser size={16} />
              </button>
              
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="px-3 py-2 text-sm font-medium text-[#605BFF] bg-white border border-[#605BFF] hover:bg-[#605BFF] hover:text-white rounded-lg transition-all duration-200 flex items-center gap-1.5"
              >
                <Search size={14} />
                Search
              </button>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Body - Scrollable Table */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">
                      {searchQuery ? 'No contacts found matching your search.' : 'No contacts available.'}
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => {
                    const selected = isContactSelected(contact);
                    return (
                      <tr
                        key={contact.id}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          selected ? 'bg-[#605BFF]/5' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {contact.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleSelectContact(contact)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                              selected
                                ? 'text-[#605BFF] bg-[#605BFF]/10 border border-[#605BFF]/20'
                                : 'text-gray-600 bg-gray-100 hover:bg-gray-200 border border-transparent'
                            }`}
                          >
                            {selected ? 'Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {currentSelected.length} contact{currentSelected.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2.5 text-sm font-medium text-[#605BFF] bg-white border border-[#605BFF] hover:bg-[#605BFF] hover:text-white rounded-lg transition-all duration-200"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContactPopup;