import React, { useState, useRef, useEffect } from 'react';
import { X, Save, ChevronDown } from 'lucide-react';

interface CreateEditTeamProps {
  mode: 'create' | 'edit';
  onClose: () => void;
}

const CreateEditTeam: React.FC<CreateEditTeamProps> = ({ mode, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    teamLeader: '',
    members: [] as string[]
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const memberDropdownRef = useRef<HTMLDivElement>(null);

  const teamLeaders = [
    'John Smith', 'Sarah Johnson', 'Mike Brown', 'Lisa Davis', 'Tom Wilson'
  ];

  const availableMembers = [
    'Alice Cooper', 'Bob Johnson', 'Charlie Brown', 'Diana Prince', 'Edward Norton',
    'Fiona Apple', 'George Martin', 'Helen Troy', 'Ian Malcolm', 'Jane Doe'
  ];

  const filteredMembers = availableMembers.filter(member =>
    member.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !formData.members.includes(member)
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberToggle = (member: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.includes(member)
        ? prev.members.filter(m => m !== member)
        : [...prev.members, member]
    }));
  };

  const handleMemberAdd = (member: string) => {
    if (!formData.members.includes(member)) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, member]
      }));
    }
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleSelectAllMembers = () => {
    const filteredMembers = availableMembers.filter(member => 
      member.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredMembers.every(member => formData.members.includes(member))) {
      // Deselect all filtered members
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter(member => !filteredMembers.includes(member))
      }));
    } else {
      // Select all filtered members
      const newMembers = [...new Set([...formData.members, ...filteredMembers])];
      setFormData(prev => ({
        ...prev,
        members: newMembers
      }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm(''); // Clear search when closing dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMemberRemove = (member: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m !== member)
    }));
  };

  const handleSave = () => {
    console.log('Saving team:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-white flex-shrink-0">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Create New Team' : 'Edit Team'}
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                placeholder="Enter team name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all resize-none"
                placeholder="Enter team description..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Team Leader</label>
              <select
                value={formData.teamLeader}
                onChange={(e) => handleInputChange('teamLeader', e.target.value)}
                className="w-full px-4 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 12px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '16px'
                }}
              >
                <option value="">Select Team Leader</option>
                {teamLeaders.map(leader => (
                  <option key={leader} value={leader}>{leader}</option>
                ))}
              </select>
            </div>

            <div className="relative" ref={memberDropdownRef}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Members</label>
              
              {/* Combo Box with Input and Selected Tags */}
              <div 
                className="w-full min-h-[38px] px-4 py-1.5 pr-10 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#605BFF] focus-within:border-transparent transition-all bg-white appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 12px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '16px'
                }}
              >
                <div className="flex items-center flex-wrap gap-1 flex-1">
                  {/* Show selected members as tags */}
                  {formData.members.slice(0, 5).map(member => (
                    <span
                      key={member}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#605BFF] text-white"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMemberRemove(member);
                        }}
                        className="ml-1 hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  {/* Show +X more if there are more than 5 selected */}
                  {formData.members.length > 5 && (
                    <span className="text-sm text-gray-600">
                      +{formData.members.length - 5} more
                    </span>
                  )}
                  
                  {/* Search Input */}
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder={formData.members.length === 0 ? "Search and select members..." : "Search..."}
                    className="flex-1 min-w-[120px] outline-none bg-transparent text-sm placeholder-gray-500"
                  />
                </div>
              </div>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full bottom-full mb-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {(() => {
                    const filteredMembers = availableMembers.filter(member => 
                      member.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    
                    return (
                      <>
                        {/* Select All Option - only show when search is empty */}
                         {filteredMembers.length > 0 && searchTerm.trim() === '' && (
                           <div
                             onClick={handleSelectAllMembers}
                             className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                           >
                             <input
                               type="checkbox"
                               checked={filteredMembers.every(member => formData.members.includes(member))}
                               onChange={() => {}}
                               className="mr-3 h-4 w-4 text-[#605BFF] focus:ring-[#605BFF] border-gray-300 rounded"
                               readOnly
                             />
                             <span className="font-medium text-gray-700">Select All</span>
                           </div>
                         )}
                        
                        {/* Individual Member Options */}
                        {filteredMembers.length > 0 ? (
                          filteredMembers.map(member => (
                            <div
                              key={member}
                              onClick={() => handleMemberToggle(member)}
                              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={formData.members.includes(member)}
                                onChange={() => {}}
                                className="mr-3 h-4 w-4 text-[#605BFF] focus:ring-[#605BFF] border-gray-300 rounded"
                                readOnly
                              />
                              <span className="text-gray-700">{member}</span>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500 text-sm">
                            No members found
                          </div>
                        )}
                      </>
                    );
                  })()} 
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 flex justify-end space-x-4 flex-shrink-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-1.5 bg-white text-[#605BFF] border border-[#605BFF] rounded-lg hover:bg-[#605BFF] hover:text-white hover:border-[#605BFF] transition-colors font-medium flex items-center space-x-2"
          >
            <Save size={18} />
            <span>Save</span>
          </button>
        </div>
      </div>
      
      {/* Backdrop to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default CreateEditTeam;