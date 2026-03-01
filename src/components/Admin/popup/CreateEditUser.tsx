import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface CreateEditUserProps {
  mode: 'create' | 'edit';
  onClose: () => void;
}

const CreateEditUser: React.FC<CreateEditUserProps> = ({ mode, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    city: '',
    stateProvince: '',
    country: '',
    email: '',
    phone: '',
    phoneExtension: '',
    userType: '',
    department: '',
    manager: ''
  });

  const [permissions, setPermissions] = useState({
    meetingIntelligence: false,
    company: false,
    deal: false,
    contact: false,
    meetings: false,
    meetingPreparation: false,
    taskManagement: false,
    calendarIntegration: false,
    meetingSimulation: false,
    sdrManagement: false
  });

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Other'
  ];

  const userTypes = [
    'Admin', 'Manager', 'User', 'Guest'
  ];

  const managers = [
    'John Smith', 'Sarah Johnson', 'Mike Brown', 'Lisa Davis'
  ];

  const permissionsList = [
    { key: 'contact', label: 'Contact' },
    { key: 'meetings', label: 'Meetings' },
    { key: 'meetingPreparation', label: 'Meeting Preparation' },
    { key: 'company', label: 'Company' },
    { key: 'meetingIntelligence', label: 'Meeting Intelligence' },
    { key: 'sdrManagement', label: 'SDR Management' },
    { key: 'deal', label: 'Deal' },      
    { key: 'calendarIntegration', label: 'Calendar Integration' },
    { key: 'meetingSimulation', label: 'Meeting Simulation' },
    { key: 'taskManagement', label: 'Task Management' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (permission: string) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    console.log('Saving user:', { formData, permissions });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-white flex-shrink-0">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Create New User' : 'Edit User'}
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
          <div className="p-8">
            <div className="space-y-6">
              {/* First Row: First Name, Last Name */}
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

              {/* Second Row: Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                />
              </div>
              {/* Fourth Row: Email, Phone, Phone Extension */}
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

              {/* Fifth Row: User Type, Department, Manager */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">User Type</label>
                  <select
                    value={formData.userType}
                    onChange={(e) => handleInputChange('userType', e.target.value)}
                    className="w-full px-4 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px'
                    }}
                  >
                    <option value="">Select User Type</option>
                    {userTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Manager</label>
                  <select
                    value={formData.manager}
                    onChange={(e) => handleInputChange('manager', e.target.value)}
                    className="w-full px-4 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px'
                    }}
                  >
                    <option value="">Select Manager</option>
                    {managers.map(manager => (
                      <option key={manager} value={manager}>{manager}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Third Row: City, State/Province, Country */}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code / ZIP</label>
                  <input
                    type="text"
                    value={formData.stateProvince}
                    onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
                {/*<div>
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
                </div>*/}
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
              {/* Fourth Row: Email, Phone, Phone Extension */}
              {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              </div>*/}

              {/* Fifth Row: User Type, Department, Manager */}
              {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">User Type</label>
                  <select
                    value={formData.userType}
                    onChange={(e) => handleInputChange('userType', e.target.value)}
                    className="w-full px-4 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px'
                    }}
                  >
                    <option value="">Select User Type</option>
                    {userTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Manager</label>
                  <select
                    value={formData.manager}
                    onChange={(e) => handleInputChange('manager', e.target.value)}
                    className="w-full px-4 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-all appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px'
                    }}
                  >
                    <option value="">Select Manager</option>
                    {managers.map(manager => (
                      <option key={manager} value={manager}>{manager}</option>
                    ))}
                  </select>
                </div>
              </div>*/}
            </div>

            {/* Sixth Row: Permissions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Permissions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {permissionsList.map(permission => (
                  <label key={permission.key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions[permission.key as keyof typeof permissions]}
                      onChange={() => handlePermissionChange(permission.key)}
                      className="w-4 h-4 text-[#605BFF] border-gray-300 rounded focus:ring-[#605BFF]"
                    />
                    <span className="text-sm font-medium text-gray-700">{permission.label}</span>
                  </label>
                ))}
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

export default CreateEditUser;