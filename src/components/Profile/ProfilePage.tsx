import React, { useState } from 'react';
import UserInfoSection from './UserInfoSection';
import OperationHistory from './OperationHistory';
import EditProfileModal from './EditProfileModal';

const ProfilePage: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="h-full w-full bg-white overflow-auto">
      {/* Page Header (non-fixed) */}
      <header className="bg-white">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your personal information and view your activity</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* User Info Section - Left Side (4 columns on large screens) */}
            <div className="lg:col-span-4">
              <UserInfoSection onEditClick={() => setIsEditModalOpen(true)} />
            </div>

            {/* Operation History - Right Side (8 columns on large screens) */}
            <div className="lg:col-span-8">
              <OperationHistory />
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  );
};

export default ProfilePage;