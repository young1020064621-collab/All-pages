import React from 'react';
import { Edit3, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

interface UserInfoSectionProps {
  onEditClick: () => void;
}

const UserInfoSection: React.FC<UserInfoSectionProps> = ({ onEditClick }) => {
  return (
    <div className="space-y-6">
      {/* User Basic Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#605BFF] to-[#8B5FFF] flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
            AS
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Alex Smith</h2>
          <p className="text-gray-600 mb-4">Senior Product Manager</p>
          
          <button
            onClick={onEditClick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#605BFF] bg-white border border-[#605BFF] rounded-lg hover:bg-[#605BFF] hover:text-white transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Contact Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          Contact Info
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-200">
              <Mail className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-600">alex.smith@company.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-200">
              <Phone className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Phone</p>
              <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-200">
              <MapPin className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Location</p>
              <p className="text-sm text-gray-600">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;