import React, { useState } from 'react';
import { 
  RefreshCw, 
  Filter, 
  Search, 
  Share2, 
  Play, 
  Pause, 
  Volume2, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar
} from 'lucide-react';
import SearchContactPopup from './SearchContactPopup';
import SharePopup from './SharePopup';
import FiltersPopup from './FiltersPopup';

interface Call {
  id: string;
  subject: string;
  duration: string;
  callDate: string;
  status: 'Busy' | 'Calling CRM User' | 'Canceled' | 'Completed' | 'Connecting' | 'Failed' | 'In Progress' | 'Missed' | 'No Answer' | 'Queued' | 'Ringing' | 'On Hold';
  recording: {
    hasRecording: boolean;
    duration: string;
    currentTime: string;
  };
  company: string;
  contact: string;
  assignedTo: string;
  isSubmitted: boolean;
  intelligence?: string;
}

const mockCalls: Call[] = [
  {
    id: '1',
    subject: 'Call with Alex Melnik',
    duration: '00:00',
    callDate: 'Jul 29, 13:42',
    status: 'Completed',
    recording: { hasRecording: true, duration: '0:00', currentTime: '0:00' },
    company: 'TechCorp Solutions',
    contact: 'Alex Melnik',
    assignedTo: 'John Smith',
    isSubmitted: true
  },
  {
    id: '2',
    subject: 'Call with Alex Melnik',
    duration: '00:00',
    callDate: 'Jul 29, 13:42',
    status: 'Completed',
    recording: { hasRecording: true, duration: '0:00', currentTime: '0:00' },
    company: 'TechCorp Solutions',
    contact: 'Alex Melnik',
    assignedTo: 'Sarah Davis',
    isSubmitted: false
  },
  {
    id: '3',
    subject: 'Call with Marketing Team',
    duration: '00:00',
    callDate: 'Jul 29, 10:41',
    status: 'In Progress',
    recording: { hasRecording: true, duration: '0:00', currentTime: '0:00' },
    company: 'Google Inc.',
    contact: 'Sarah Johnson',
    assignedTo: 'Mike Chen',
    isSubmitted: false
  },
  {
    id: '4',
    subject: 'Sales Discovery Call',
    duration: '00:00',
    callDate: 'Jul 29, 10:34',
    status: 'Missed',
    recording: { hasRecording: true, duration: '0:00', currentTime: '0:00' },
    company: 'Microsoft Corporation',
    contact: 'David Wilson',
    assignedTo: 'Lisa Wang',
    isSubmitted: false
  },
  {
    id: '5',
    subject: 'Contract follow up call',
    duration: '05:00',
    callDate: 'Jul 29, 00:59',
    status: 'Completed',
    recording: { hasRecording: true, duration: '5:00', currentTime: '0:00' },
    company: 'Amazon Web Services',
    contact: 'David Lee',
    assignedTo: 'Tom Rodriguez',
    isSubmitted: true
  },
  {
    id: '6',
    subject: 'Product Demo Call',
    duration: '15:30',
    callDate: 'Jul 28, 14:20',
    status: 'Busy',
    recording: { hasRecording: false, duration: '0:00', currentTime: '0:00' },
    company: 'Salesforce Inc.',
    contact: 'Jennifer Martinez',
    assignedTo: 'John Smith',
    isSubmitted: false
  },
  {
    id: '7',
    subject: 'Client Onboarding Call',
    duration: '00:00',
    callDate: 'Jul 28, 11:15',
    status: 'No Answer',
    recording: { hasRecording: false, duration: '0:00', currentTime: '0:00' },
    company: 'HubSpot Inc.',
    contact: 'Robert Chen',
    assignedTo: 'Sarah Davis',
    isSubmitted: false
  },
  {
    id: '8',
    subject: 'Technical Support Call',
    duration: '08:45',
    callDate: 'Jul 28, 09:30',
    status: 'Failed',
    recording: { hasRecording: true, duration: '8:45', currentTime: '0:00' },
    company: 'Slack Technologies',
    contact: 'Emily Rodriguez',
    assignedTo: 'Mike Chen',
    isSubmitted: false
  },
  {
    id: '9',
    subject: 'Quarterly Review Call',
    duration: '00:00',
    callDate: 'Jul 27, 16:45',
    status: 'Queued',
    recording: { hasRecording: false, duration: '0:00', currentTime: '0:00' },
    company: 'Zoom Video Communications',
    contact: 'Michael Thompson',
    assignedTo: 'Lisa Wang',
    isSubmitted: false
  },
  {
    id: '10',
    subject: 'Partnership Discussion',
    duration: '12:20',
    callDate: 'Jul 27, 13:10',
    status: 'On Hold',
    recording: { hasRecording: true, duration: '12:20', currentTime: '0:00' },
    company: 'Adobe Systems',
    contact: 'Amanda Foster',
    assignedTo: 'Tom Rodriguez',
    isSubmitted: true
  }
];

const HubSpotCalls: React.FC = () => {
  const [selectedCalls, setSelectedCalls] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [playingCall, setPlayingCall] = useState<string | null>(null);
  const [sdrFilter, setSdrFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

   // Popup states
  const [showSearchContactPopup, setShowSearchContactPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Missed':
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Canceled':
        return 'bg-gray-100 text-gray-800';
      case 'Busy':
      case 'No Answer':
        return 'bg-yellow-100 text-yellow-800';
      case 'Calling CRM User':
      case 'Connecting':
      case 'Ringing':
        return 'bg-blue-100 text-blue-800';
      case 'Queued':
      case 'On Hold':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCalls(mockCalls.map(call => call.id));
    } else {
      setSelectedCalls([]);
    }
  };

  const handleSelectCall = (callId: string, checked: boolean) => {
    if (checked) {
      setSelectedCalls([...selectedCalls, callId]);
    } else {
      setSelectedCalls(selectedCalls.filter(id => id !== callId));
    }
  };

  const togglePlayPause = (callId: string) => {
    setPlayingCall(playingCall === callId ? null : callId);
  };

  // Popup handlers
  const handleSearchContactsClick = () => {
    setShowSearchContactPopup(true);
  };

  const handleShareSelectedClick = () => {
    setShowSharePopup(true);
  };

  const handleFilterClick = () => {
    setShowFiltersPopup(true);
  };

  const handleSearchContactClose = () => {
    setShowSearchContactPopup(false);
  };

  const handleSearchContactApply = (selectedContacts: any[]) => {
    console.log('Selected contacts:', selectedContacts);
    // Handle selected contacts logic here
  };

  const handleShareClose = () => {
    setShowSharePopup(false);
  };

  const handleShareSubmit = (data: any) => {
    console.log('Share data:', data);
    // Handle share logic here
  };

  const handleFiltersClose = () => {
    setShowFiltersPopup(false);
  };

  const handleFiltersApply = (filters: any) => {
    console.log('Applied filters:', filters);
    // Handle filters logic here
  };

  const handleFiltersClear = () => {
    console.log('Filters cleared');
    // Handle clear filters logic here
  };

  const handleFiltersSave = (filters: any) => {
    console.log('Filters saved:', filters);
    // Handle save filters logic here
  };
  
  const totalEntries = mockCalls.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-semibold text-gray-900">HubSpot Calls</h1>
            <button className="text-gray-400 hover:text-[#605BFF]">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button 
              onClick={handleSearchContactsClick}
              className="inline-flex items-center px-4 py-2 bg-white text-[#605BFF] border border-[#605BFF] rounded-md shadow-sm text-sm font-medium hover:bg-[#605BFF] hover:text-white transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Contacts
            </button>
            <button 
              onClick={handleShareSelectedClick}
              className="inline-flex items-center px-4 py-2 bg-white text-[#605BFF] border border-[#605BFF] rounded-md shadow-sm text-sm font-medium hover:bg-[#605BFF] hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Selected
            </button>
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
                value={sdrFilter}
                onChange={(e) => setSdrFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">All SDRs</option>
                <option value="john">John Smith</option>
                <option value="sarah">Sarah Davis</option>
                <option value="mike">Mike Chen</option>
              </select>
            </div>
            {/* All Clients */}
            <div className="w-60">
              <select 
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">All Clients</option>
                <option value="techcorp">TechCorp Solutions</option>
                <option value="google">Google Inc.</option>
                <option value="microsoft">Microsoft Corporation</option>
                <option value="aws">Amazon Web Services</option>
                <option value="salesforce">Salesforce Inc.</option>
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
                  placeholder="Search HubSpot Calls..."
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
                className="flex items-center gap-2 px-3 py-1.5 text-[#F5A623] bg-white border border-[#F5A623] rounded-lg hover:bg-[#F5A623] hover:text-white transition-colors"
              >
                <Filter size={16} />
                <span className="text-sm font-medium">Filter</span>
              </button>
              
              {/* Filters Popup */}
              <FiltersPopup
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
                value={sdrFilter}
                onChange={(e) => setSdrFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">All SDRs</option>
                <option value="john">John Smith</option>
                <option value="sarah">Sarah Davis</option>
                <option value="mike">Mike Chen</option>
              </select>
            </div>
            <div className="min-w-48">
              <select 
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">All Clients</option>
                <option value="techcorp">TechCorp Solutions</option>
                <option value="google">Google Inc.</option>
                <option value="microsoft">Microsoft Corporation</option>
                <option value="aws">Amazon Web Services</option>
                <option value="salesforce">Salesforce Inc.</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-[#F5A623] rounded-lg hover:bg-gray-100 transition-colors">
              <Filter size={16} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
        </div>*/}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col mb-6" style={{height: 'calc(100vh - 240px)'}}>
          <div className="flex-1 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCalls.length === mockCalls.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-[#605BFF] focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company / Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Call Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recording
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCalls.includes(call.id)}
                        onChange={(e) => handleSelectCall(call.id, e.target.checked)}
                        className="rounded border-gray-300 text-[#605BFF] focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{call.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{call.company}</div>
                      <div className="text-sm text-gray-500">{call.contact}</div>
                      <div className="text-sm text-gray-500">Assigned to {call.assignedTo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {call.callDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(call.status)}`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {call.recording.hasRecording && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => togglePlayPause(call.id)}
                            className="p-1 text-gray-400 hover:text-[#605BFF] transition-colors"
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
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 h-6 w-16 bg-white text-[#605BFF] border border-[#605BFF] text-xs rounded-md hover:bg-[#605BFF] hover:text-white transition-colors">
                          Share
                        </button>
                        <button 
                          className={`px-3 py-1 h-6 w-16 text-xs rounded-md transition-colors ${
                            call.isSubmitted 
                              ? 'bg-[#F5A623] text-white hover:bg-orange-600' 
                              : 'border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-white'
                          }`}
                        >
                          {call.isSubmitted ? 'Review' : 'Submit'}
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
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
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
      {/* Popups */}
      <SearchContactPopup
        isVisible={showSearchContactPopup}
        onClose={handleSearchContactClose}
        onApply={handleSearchContactApply}
      />
      
      <SharePopup
        isOpen={showSharePopup}
        onClose={handleShareClose}
        onShare={handleShareSubmit}
      />
    </div>
  );
};

export default HubSpotCalls;
