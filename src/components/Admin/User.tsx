import React, { useState, useEffect } from 'react';
import { Users, Mail, Building, Phone, Edit, Trash2, Plus, MoreHorizontal, User, UserCheck, Eye } from 'lucide-react';
import CreateEditUser from './popup/CreateEditUser';
import CreateEditClient from './popup/CreateEditClient';
import CreateEditTeam from './popup/CreateEditTeam';
import ViewTeamPopup from './popup/ViewTeamPopup';

interface UserData {
  id: number;
  fullName: string;
  userType: string;
  email: string;
  company: string;
  extension: string;
}

interface ExternalClientData {
  id: number;
  fullName: string;
  email: string;
  company: string;
  extension: string;
}

interface TeamData {
  id: number;
  name: string;
  leader: string;
  email: string;
  members: number;
  description: string;
}

const userData: UserData[] = [
  { id: 1, fullName: "John Smith", userType: "Admin", email: "john.smith@samcoach.com", company: "SAM.Coach", extension: "1001" },
  { id: 2, fullName: "Sarah Johnson", userType: "Manager", email: "sarah.johnson@samcoach.com", company: "SAM.Coach", extension: "1002" },
  { id: 3, fullName: "Mike Chen", userType: "User", email: "mike.chen@samcoach.com", company: "SAM.Coach", extension: "1003" },
  { id: 4, fullName: "Emily Davis", userType: "User", email: "emily.davis@samcoach.com", company: "SAM.Coach", extension: "1004" },
  { id: 5, fullName: "David Wilson", userType: "Manager", email: "david.wilson@samcoach.com", company: "SAM.Coach", extension: "1005" },
  { id: 6, fullName: "Lisa Brown", userType: "User", email: "lisa.brown@samcoach.com", company: "SAM.Coach", extension: "1006" },
  { id: 7, fullName: "Tom Anderson", userType: "Admin", email: "tom.anderson@samcoach.com", company: "SAM.Coach", extension: "1007" },
  { id: 8, fullName: "Anna Taylor", userType: "User", email: "anna.taylor@samcoach.com", company: "SAM.Coach", extension: "1008" },
  { id: 9, fullName: "James Martinez", userType: "User", email: "james.martinez@samcoach.com", company: "SAM.Coach", extension: "1009" },
  { id: 10, fullName: "Kate Thompson", userType: "Manager", email: "kate.thompson@samcoach.com", company: "SAM.Coach", extension: "1010" },
  { id: 11, fullName: "Ryan Clark", userType: "User", email: "ryan.clark@samcoach.com", company: "SAM.Coach", extension: "1011" },
  { id: 12, fullName: "Grace Lee", userType: "User", email: "grace.lee@samcoach.com", company: "SAM.Coach", extension: "1012" },
];

const externalClientData: ExternalClientData[] = [
  { id: 1, fullName: "Robert Johnson", email: "robert@techcorp.com", company: "TechCorp Ltd", extension: "2001" },
  { id: 2, fullName: "Maria Garcia", email: "maria@innovate.co", company: "Innovate Solutions", extension: "2002" },
  { id: 3, fullName: "Alex Kim", email: "alex@startup.io", company: "StartupXYZ", extension: "2003" },
  { id: 4, fullName: "Jennifer White", email: "jennifer@globalinc.com", company: "Global Inc", extension: "2004" },
  { id: 5, fullName: "Michael Brown", email: "michael@enterprise.org", company: "Enterprise Solutions", extension: "2005" },
  { id: 6, fullName: "Susan Davis", email: "susan@consulting.biz", company: "Davis Consulting", extension: "2006" },
  { id: 7, fullName: "Chris Wilson", email: "chris@digital.net", company: "Digital Dynamics", extension: "2007" },
  { id: 8, fullName: "Rachel Green", email: "rachel@ventures.com", company: "Green Ventures", extension: "2008" },
];

const teamData: TeamData[] = [
  { id: 1, name: "Development Team", leader: "John Smith", email: "dev-team@samcoach.com", members: 8, description: "Frontend and backend development" },
  { id: 2, name: "Marketing Team", leader: "Sarah Johnson", email: "marketing@samcoach.com", members: 5, description: "Digital marketing and content creation" },
  { id: 3, name: "Sales Team", leader: "Mike Chen", email: "sales@samcoach.com", members: 6, description: "Customer acquisition and relationship management" },
  { id: 4, name: "Support Team", leader: "Emily Davis", email: "support@samcoach.com", members: 4, description: "Customer support and technical assistance" },
  { id: 5, name: "Design Team", leader: "David Wilson", email: "design@samcoach.com", members: 3, description: "UI/UX design and brand identity" },
  { id: 6, name: "Operations Team", leader: "Lisa Brown", email: "ops@samcoach.com", members: 7, description: "Business operations and process optimization" },
];

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'external' | 'teams'>('user');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  // Popup states
  const [showCreateEditUser, setShowCreateEditUser] = useState(false);
  const [showCreateEditClient, setShowCreateEditClient] = useState(false);
  const [showCreateEditTeam, setShowCreateEditTeam] = useState(false);
  const [showViewTeam, setShowViewTeam] = useState(false);
  const [popupMode, setPopupMode] = useState<'create' | 'edit'>('create');

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    if (openMenuId !== null) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId]);

  const getCurrentData = () => {
    switch (activeTab) {
      case 'user':
        return userData;
      case 'external':
        return externalClientData;
      case 'teams':
        return teamData;
      default:
        return userData;
    }
  };

  const data = getCurrentData();
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: 'user' | 'external' | 'teams') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const getButtonText = () => {
    switch (activeTab) {
      case 'user':
        return 'Create User';
      case 'external':
        return 'Create New Client';
      case 'teams':
        return 'Create New Team';
      default:
        return 'Create user';
    }
  };

  const handleCreateClick = () => {
    setPopupMode('create');
    switch (activeTab) {
      case 'user':
        setShowCreateEditUser(true);
        break;
      case 'external':
        setShowCreateEditClient(true);
        break;
      case 'teams':
        setShowCreateEditTeam(true);
        break;
    }
  };

  const handleEditClick = (id: number) => {
    setPopupMode('edit');
    setOpenMenuId(null);
    switch (activeTab) {
      case 'user':
        setShowCreateEditUser(true);
        break;
      case 'external':
        setShowCreateEditClient(true);
        break;
      case 'teams':
        setShowCreateEditTeam(true);
        break;
    }
  };

  const handleViewTeamClick = (id: number) => {
    setOpenMenuId(null);
    setShowViewTeam(true);
  };

  const renderUserTable = () => (
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UserType</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extension</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(currentData as UserData[]).map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.userType === 'Admin' ? 'bg-red-100 text-red-800' :
                    user.userType === 'Manager' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.userType}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{user.company}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{user.extension}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === user.id ? null : user.id);
                      }}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {openMenuId === user.id && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                        <button 
                          onClick={() => handleEditClick(user.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                          <Trash2 size={14} />
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
  );

  const renderExternalTable = () => (
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extension</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(currentData as ExternalClientData[]).map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{client.fullName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{client.email}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{client.company}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{client.extension}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === client.id ? null : client.id);
                      }}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {openMenuId === client.id && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                        <button 
                          onClick={() => handleEditClick(client.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                          <Trash2 size={14} />
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
  );

  const renderTeamsTable = () => (
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leader</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(currentData as TeamData[]).map((team) => (
              <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{team.leader}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{team.email}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {team.members} members
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  <div className="max-w-xs truncate" title={team.description}>{team.description}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === team.id ? null : team.id);
                      }}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {openMenuId === team.id && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                        <button 
                          onClick={() => handleViewTeamClick(team.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button 
                          onClick={() => handleEditClick(team.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
  );

  const renderTable = () => {
    switch (activeTab) {
      case 'user':
        return renderUserTable();
      case 'external':
        return renderExternalTable();
      case 'teams':
        return renderTeamsTable();
      default:
        return renderUserTable();
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6 flex-1 overflow-hidden flex flex-col">
        {/* Switch Buttons, License Info and Create Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleTabChange('user')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'user'
                  ? 'bg-white text-[#605BFF] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User size={16} />
              <span className="text-sm font-medium">User</span>
            </button>
            <button
              onClick={() => handleTabChange('teams')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'teams'
                  ? 'bg-white text-[#605BFF] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users size={16} />
              <span className="text-sm font-medium">Teams</span>
            </button>
            <button
              onClick={() => handleTabChange('external')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'external'
                  ? 'bg-white text-[#605BFF] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserCheck size={16} />
              <span className="text-sm font-medium">External Clients</span>
            </button>
          </div>
          
          <div className="flex items-center gap-8">
            {activeTab === 'user' && (
              <span className="text-gray-600 font-medium">User Licences: 12 / 13</span>
            )}
            <button 
              onClick={handleCreateClick}
              className="bg-[#605BFF] text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Plus size={16} />
              {getButtonText()}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1 flex flex-col mb-12">
          <div className="overflow-x-auto flex-1 overflow-y-auto">
            {renderTable()}
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {(() => {
                      const maxVisiblePages = 5;
                      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                      const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);
                      
                      return Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            page === currentPage 
                              ? 'text-[#605BFF] font-bold' 
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ));
                    })()}
                  </div>

                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>
                </div>
                
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border-0 bg-transparent text-sm text-gray-700 focus:outline-none appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1rem',
                  paddingRight: '2rem'
                }}
              >
                <option value={10}>10 / Page</option>
                <option value={20}>20 / Page</option>
                <option value={50}>50 / Page</option>
                <option value={100}>100 / Page</option>
              </select>
              </div>
              
            <div className="text-sm text-gray-700">
              <span className="font-bold">Total : {data.length}</span>
            </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popups */}
      {showCreateEditUser && (
        <CreateEditUser 
          mode={popupMode}
          onClose={() => setShowCreateEditUser(false)}
        />
      )}
      
      {showCreateEditClient && (
        <CreateEditClient 
          mode={popupMode}
          onClose={() => setShowCreateEditClient(false)}
        />
      )}
      
      {showCreateEditTeam && (
        <CreateEditTeam 
          mode={popupMode}
          onClose={() => setShowCreateEditTeam(false)}
        />
      )}
      
      {showViewTeam && (
        <ViewTeamPopup 
          isVisible={showViewTeam}
          onClose={() => setShowViewTeam(false)}
        />
      )}
    </div>
  );
};

export default UserPage;