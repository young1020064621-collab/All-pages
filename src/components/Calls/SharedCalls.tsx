import React, { useState } from 'react';
import { 
  Filter, 
  Play, 
  Pause, 
  Volume2, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  RefreshCw
} from 'lucide-react';
import SDRMeetingsFilterPopup from './SDRMeetingsFilterPopup';

interface SharedCall {
  id: string;
  sharedDate: string;
  callDate: string;
  title: string;
  sharedBy: {
    name: string;
    avatar: string;
  };
  sharedWith: {
    name: string;
    avatar: string;
  };
  status: 'Busy' | 'Calling CRM User' | 'Canceled' | 'Completed' | 'Connecting' | 'Failed' | 'In Progress' | 'Missed' | 'No Answer' | 'Queued' | 'Ringing' | 'On Hold';
  duration: string;
  fromNumber: string;
  toNumber: string;
  recording: {
    hasRecording: boolean;
    duration: string;
    currentTime: string;
  };
  direction: 'Inbound' | 'Outbound';
}

const mockSharedCalls: SharedCall[] = [
  {
    id: '1',
    sharedDate: '28-07-2025 11:23 AM',
    callDate: '28-07-2025 10:08 AM',
    title: 'Call with Google Contact',
    sharedBy: {
      name: 'Sasha Göbrechtshuber',
      avatar: 'SG'
    },
    sharedWith: {
      name: 'Sasha Göbrechtshuber',
      avatar: 'SG'
    },
    status: 'Completed',
    duration: '00:00',
    fromNumber: '+1-555-0123',
    toNumber: '+1-555-0456',
    recording: { hasRecording: true, duration: '0:00', currentTime: '0:00' },
    direction: 'Outbound'
  },
  {
    id: '2',
    sharedDate: '28-07-2025 09:15 AM',
    callDate: '28-07-2025 08:30 AM',
    title: 'Sales Discovery Call',
    sharedBy: {
      name: 'John Smith',
      avatar: 'JS'
    },
    sharedWith: {
      name: 'Sarah Davis',
      avatar: 'SD'
    },
    status: 'In Progress',
    duration: '15:30',
    fromNumber: '+1-555-0789',
    toNumber: '+1-555-0321',
    recording: { hasRecording: true, duration: '15:30', currentTime: '0:00' },
    direction: 'Inbound'
  },
  {
    id: '3',
    sharedDate: '27-07-2025 16:45 PM',
    callDate: '27-07-2025 15:20 PM',
    title: 'Client Follow-up',
    sharedBy: {
      name: 'Mike Chen',
      avatar: 'MC'
    },
    sharedWith: {
      name: 'Lisa Wang',
      avatar: 'LW'
    },
    status: 'Failed',
    duration: '00:00',
    fromNumber: '+1-555-0654',
    toNumber: '+1-555-0987',
    recording: { hasRecording: false, duration: '0:00', currentTime: '0:00' },
    direction: 'Outbound'
  },
  {
    id: '4',
    sharedDate: '27-07-2025 14:30 PM',
    callDate: '27-07-2025 13:45 PM',
    title: 'Product Demo',
    sharedBy: {
      name: 'Tom Rodriguez',
      avatar: 'TR'
    },
    sharedWith: {
      name: 'Emily Foster',
      avatar: 'EF'
    },
    status: 'Missed',
    duration: '00:00',
    fromNumber: '+1-555-0147',
    toNumber: '+1-555-0258',
    recording: { hasRecording: false, duration: '0:00', currentTime: '0:00' },
    direction: 'Inbound'
  },
  {
    id: '5',
    sharedDate: '27-07-2025 11:20 AM',
    callDate: '27-07-2025 10:15 AM',
    title: 'Technical Support',
    sharedBy: {
      name: 'David Wilson',
      avatar: 'DW'
    },
    sharedWith: {
      name: 'Jennifer Martinez',
      avatar: 'JM'
    },
    status: 'Busy',
    duration: '08:45',
    fromNumber: '+1-555-0369',
    toNumber: '+1-555-0741',
    recording: { hasRecording: true, duration: '8:45', currentTime: '0:00' },
    direction: 'Outbound'
  },
  {
    id: '6',
    sharedDate: '26-07-2025 17:10 PM',
    callDate: '26-07-2025 16:30 PM',
    title: 'Partnership Discussion',
    sharedBy: {
      name: 'Amanda Foster',
      avatar: 'AF'
    },
    sharedWith: {
      name: 'Robert Chen',
      avatar: 'RC'
    },
    status: 'On Hold',
    duration: '12:20',
    fromNumber: '+1-555-0852',
    toNumber: '+1-555-0963',
    recording: { hasRecording: true, duration: '12:20', currentTime: '0:00' },
    direction: 'Inbound'
  },
  {
    id: '7',
    sharedDate: '26-07-2025 13:25 PM',
    callDate: '26-07-2025 12:40 PM',
    title: 'Quarterly Review',
    sharedBy: {
      name: 'Michael Thompson',
      avatar: 'MT'
    },
    sharedWith: {
      name: 'Sarah Johnson',
      avatar: 'SJ'
    },
    status: 'Queued',
    duration: '00:00',
    fromNumber: '+1-555-0174',
    toNumber: '+1-555-0285',
    recording: { hasRecording: false, duration: '0:00', currentTime: '0:00' },
    direction: 'Outbound'
  },
  {
    id: '8',
    sharedDate: '26-07-2025 10:50 AM',
    callDate: '26-07-2025 09:55 AM',
    title: 'Contract Negotiation',
    sharedBy: {
      name: 'Grace Kim',
      avatar: 'GK'
    },
    sharedWith: {
      name: 'Chris Johnson',
      avatar: 'CJ'
    },
    status: 'Ringing',
    duration: '00:00',
    fromNumber: '+1-555-0396',
    toNumber: '+1-555-0507',
    recording: { hasRecording: false, duration: '0:00', currentTime: '0:00' },
    direction: 'Inbound'
  }
];

const SharedCalls: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [playingCall, setPlayingCall] = useState<string | null>(null);
  const [sharedByFilter, setSharedByFilter] = useState('');
  const [sharedWithFilter, setSharedWithFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
      case 'Calling CRM User':
      case 'Connecting':
      case 'Ringing':
        return 'bg-blue-100 text-blue-800';
      case 'Missed':
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Canceled':
        return 'bg-gray-100 text-gray-800';
      case 'Busy':
      case 'No Answer':
        return 'bg-yellow-100 text-yellow-800';
      case 'Queued':
      case 'On Hold':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const togglePlayPause = (callId: string) => {
    setPlayingCall(playingCall === callId ? null : callId);
  };

  const handleFilterClick = () => {
    setShowFiltersPopup(true);
  };

  const handleFiltersClose = () => {
    setShowFiltersPopup(false);
  };

  const handleFiltersApply = (filters: any) => {
    console.log('Applied filters:', filters);
    setShowFiltersPopup(false);
  };

  const handleFiltersClear = () => {
    console.log('Cleared filters');
  };

  const handleFiltersSave = (filters: any) => {
    console.log('Saved filters:', filters);
  };

  const totalEntries = mockSharedCalls.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const UserAvatar: React.FC<{ name: string; avatar: string }> = ({ name, avatar }) => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
        <span className="text-xs font-medium text-indigo-700">{avatar}</span>
      </div>
      <span className="text-sm text-gray-900">{name}</span>
    </div>
  );

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-gray-900">Shared Calls</h1>
            <button className="text-gray-400 hover:text-[#605BFF]">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            {/* Placeholder for consistent height */}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 px-6 py-6 overflow-hidden">
        <div className="flex justify-between items-center mb-8 space-x-4">
          {/* 左边：All SDRs 和 All Clients */}
          <div className="flex space-x-4">
            {/* All SDRs */}
            <div className="w-60">
              <select 
                value={sharedByFilter}
                onChange={(e) => setSharedByFilter(e.target.value)}
                className="appearance-none w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Shared By</option>
                <option value="sasha">Sasha Göbrechtshuber</option>
                <option value="john">John Smith</option>
                <option value="mike">Mike Chen</option>
              </select>
            </div>
            {/* All Clients */}
            <div className="w-60">
              <select 
                value={sharedWithFilter}
                onChange={(e) => setSharedWithFilter(e.target.value)}
                className="appearance-none w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Shared With</option>
                <option value="sasha">Sasha Göbrechtshuber</option>
                <option value="sarah">Sarah Davis</option>
                <option value="lisa">Lisa Wang</option>
                <option value="emily">Emily Foster</option>
              </select>
            </div>
          </div>
          
          {/* 右侧：其它内容 */}
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="min-w-[12rem] max-w-[16rem]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Shared HubSpot Calls..."
                  className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
                />
              </div>
            </div>     
            {/* Search Button */}
            <button className="px-4 py-1.5 text-sm font-medium bg-white text-[#605BFF] border border-[#605BFF] rounded-lg hover:bg-[#605BFF] hover:text-white transition-colors">
              Search
            </button>
          
            {/* Filter Button */}
            <div className="relative">
              <button 
                onClick={handleFilterClick}
                className="flex items-center gap-2 px-3 py-1.5 text-[#FF8E1C] rounded-lg border border-[#FF8E1C] hover:bg-[#FF8E1C] hover:text-white transition-colors"
              >
                <Filter size={16} />
                <span className="text-sm font-medium">Filter</span>
              </button>
              <SDRMeetingsFilterPopup
                isOpen={showFiltersPopup}
                onClose={handleFiltersClose}
                onApply={handleFiltersApply}
                onClear={handleFiltersClear}
                onSave={handleFiltersSave}
              />
            </div>
          </div>
        </div>
        {/* Filters */}
        {/*<div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-6">*/}
            {/* Search Box */}
            {/*<div className="min-w-48 max-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search calls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
                />
              </div>
            </div>
            <div className="min-w-48">
              <select 
                value={sharedByFilter}
                onChange={(e) => setSharedByFilter(e.target.value)}
                className="appearance-none w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Shared By</option>
                <option value="sasha">Sasha Göbrechtshuber</option>
                <option value="john">John Smith</option>
                <option value="mike">Mike Chen</option>
              </select>
            </div>
            <div className="min-w-48">
              <select 
                value={sharedWithFilter}
                onChange={(e) => setSharedWithFilter(e.target.value)}
                className="appearance-none w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Shared With</option>
                <option value="sasha">Sasha Göbrechtshuber</option>
                <option value="sarah">Sarah Davis</option>
                <option value="lisa">Lisa Wang</option>
                <option value="emily">Emily Foster</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-[#FF8E1C] rounded-lg hover:bg-gray-100 transition-colors">
              <Filter size={16} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
        </div>*/}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col mb-6" style={{height: 'calc(100vh - 240px)'}}>
          <div className="flex-1 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1400px' }}>
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Shared Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Call Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Shared By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Shared With
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    From Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    To Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Recording
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Direction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockSharedCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.sharedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.callDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{call.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <UserAvatar name={call.sharedBy.name} avatar={call.sharedBy.avatar} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <UserAvatar name={call.sharedWith.name} avatar={call.sharedWith.avatar} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(call.status)}`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.fromNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.toNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {call.recording.hasRecording ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => togglePlayPause(call.id)}
                            className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                          >
                            {playingCall === call.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                          <span className="text-xs text-gray-500">
                            {call.recording.currentTime} / {call.recording.duration}
                          </span>
                          <Volume2 className="w-4 h-4 text-gray-400" />
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {call.direction === 'Inbound' ? (
                          <ArrowDownLeft className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-blue-500" />
                        )}
                        <span className="text-sm text-gray-900">{call.direction}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          className="px-3 py-1 h-6 w-16 text-xs rounded-md transition-colors bg-[#FF8E1C] text-white hover:bg-orange-600"
                        >
                          Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                    <ChevronLeft className="w-4 h-4" />
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
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
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
              <span className="font-bold">Total : {totalEntries}</span>
            </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 text-right">
          <span className="text-sm font-medium text-gray-600">
            Total count: {totalEntries}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SharedCalls;