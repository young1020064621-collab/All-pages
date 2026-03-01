import React, { useState, useRef, useEffect } from 'react';
import { X, Save, ChevronDown } from 'lucide-react';

interface CreateEditClientProps {
  mode: 'create' | 'edit';
  onClose: () => void;
}

const CreateEditClient: React.FC<CreateEditClientProps> = ({ mode, onClose }) => {
  const [formData, setFormData] = useState({
    // Client Details
    company: '',
    sdrs: [] as string[],
    // Primary Contact Details
    firstName: '',
    lastName: '',
    jobTitle: '',
    city: '',
    stateProvince: '',
    country: '',
    email: '',
    phone: '',
    phoneExtension: ''
  });

  const [isSDRDropdownOpen, setIsSDRDropdownOpen] = useState(false);
  const sdrDropdownRef = useRef<HTMLDivElement>(null);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Other'
  ];

  const sdrsList = [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Ross', 'Edward Lee'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSDRToggle = (sdr: string) => {
    setFormData(prev => ({
      ...prev,
      sdrs: prev.sdrs.includes(sdr)
        ? prev.sdrs.filter(s => s !== sdr)
        : [...prev.sdrs, sdr]
    }));
  };

  const handleSelectAllSDRs = () => {
    setFormData(prev => ({
      ...prev,
      sdrs: prev.sdrs.length === sdrsList.length ? [] : [...sdrsList]
    }));
  };

  const removeSDRTag = (sdr: string) => {
    setFormData(prev => ({
      ...prev,
      sdrs: prev.sdrs.filter(s => s !== sdr)
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sdrDropdownRef.current && !sdrDropdownRef.current.contains(event.target as Node)) {
        setIsSDRDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSave = () => {
    console.log('Saving client:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-white flex-shrink-0">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Create New Client' : 'Edit Client'}
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
          <div className="p-8 space-y-8">
            {/* Client Details Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-dashed border-gray-300 pb-2">Client Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="relative" ref={sdrDropdownRef}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">SDRs</label>
                  
                  {/* Dropdown Trigger with Selected Tags Inside */}
                  <div
                    onClick={() => setIsSDRDropdownOpen(!isSDRDropdownOpen)}
                    className="w-full min-h-[38px] px-4 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all bg-white cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px'
                    }}
                  >
                    <div className="flex items-center flex-wrap gap-1 flex-1">
                      {formData.sdrs.length === 0 ? (
                        <span className="text-gray-500">Select SDRs</span>
                      ) : (
                        <>
                          {/* Show first 3 selected SDRs as tags */}
                           {formData.sdrs.slice(0, 3).map(sdr => (
                             <span
                               key={sdr}
                               className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#605BFF] text-white"
                             >
                               {sdr}
                               <button
                                 type="button"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   removeSDRTag(sdr);
                                 }}
                                 className="ml-1 hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                               >
                                 <X size={10} />
                               </button>
                             </span>
                           ))}
                           {/* Show +X more if there are more than 3 selected */}
                           {formData.sdrs.length > 3 && (
                             <span className="text-sm text-gray-600">
                               +{formData.sdrs.length - 3} more
                             </span>
                           )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Dropdown Menu */}
                  {isSDRDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {/* Select All Option */}
                      <div
                        onClick={handleSelectAllSDRs}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={formData.sdrs.length === sdrsList.length}
                          onChange={() => {}}
                          className="mr-3 h-4 w-4 text-[#605BFF] focus:ring-[#605BFF] border-gray-300 rounded"
                          readOnly
                        />
                        <span className="font-medium text-gray-700">Select All</span>
                      </div>
                      
                      {/* Individual SDR Options */}
                      {sdrsList.map(sdr => (
                        <div
                          key={sdr}
                          onClick={() => handleSDRToggle(sdr)}
                          className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.sdrs.includes(sdr)}
                            onChange={() => {}}
                            className="mr-3 h-4 w-4 text-[#605BFF] focus:ring-[#605BFF] border-gray-300 rounded"
                            readOnly
                          />
                          <span className="text-gray-700">{sdr}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Primary Contact Details Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-dashed border-gray-300 pb-2">Primary Contact Details</h3>
              
              {/* First Name, Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                />
              </div>

              {/* City, State/Province, Country */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State / Province</label>
                  <input
                    type="text"
                    value={formData.stateProvince}
                    onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px'
                    }}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email, Phone, Phone Extension */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Extension</label>
                  <input
                    type="text"
                    value={formData.phoneExtension}
                    onChange={(e) => handleInputChange('phoneExtension', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>
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
    </div>
  );
};

export default CreateEditClient;