import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckSquare, 
  AlertTriangle, 
  Clock, 
  Square, 
  CheckCircle,
  Users,
  Calendar,
  FileText,
  Video,
  Mic,
  MapPin,
  User,
  Plus,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  MessageSquare,
  Speech,
  AlertCircle,
  XCircle,
  Edit2,
  Trash2,
  MoreVertical
} from 'lucide-react';

import { SummaryCard } from './TaskDashboardComponents/SummaryCard';
import { TimeFilter } from './TaskDashboardComponents/TimeFilter';
import { useFilteredData } from './TaskDashboardComponents/useFilteredData';
import { tasksData, meetingsData, coachingData, Task, Meeting, Coaching } from './TaskDashboardComponents/mockData';

function TaskDashboardPage() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('next7days');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Next 30 days');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [currentTaskPage, setCurrentTaskPage] = useState(1);
  const [currentMeetingPage, setCurrentMeetingPage] = useState(1);
  const [currentCoachingPage, setCurrentCoachingPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedCoaching, setSelectedCoaching] = useState<Coaching | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'Internal':
        return <Calendar className="w-4 h-4 text-[#F5A623]" />;
      case 'External':
        return <Calendar className="w-4 h-4 text-[#605BFF]" />;
      default:
        return <Calendar className="w-4 h-4 text-[#605BFF]" />;
    }
  };

  const tasksPerPage = 5;
  const meetingsPerPage = 5;
  const coachingsPerPage = 5;

  const { tasks, meetings, coaching } = useFilteredData(
    tasksData,
    meetingsData, 
    coachingData,
    {
      timeRange: selectedTimeRange,
      tenant: selectedTenant,
      user: selectedUser,
      startDate: startDate,
      endDate: endDate
    }
  );

  // Calculate summary statistics
  const taskStats = {
    total: tasksData.length,
    overdue: tasksData.filter(t => t.status === 'overdue').length,
    inProgress: tasksData.filter(t => t.status === 'in-progress').length,
    open: tasksData.filter(t => t.status === 'open').length,
    completed: tasksData.filter(t => t.status === 'completed').length,
    coaching: tasksData.filter(t => t.title.toLowerCase().includes('coaching')).length
  };

  const meetingStats = {
    upcoming: meetingsData.filter(m => new Date(m.dateTime) > new Date()).length,
    needsPrep: meetingsData.filter(m => m.status === 'Pending').length,
    transcripts: meetingsData.filter(m => m.status === 'Confirmed').length,
    recordings: meetingsData.filter(m => m.status === 'Confirmed' && m.location !== 'In Person').length
  };

  // Pagination logic
  const totalTaskPages = Math.ceil(tasks.length / tasksPerPage);
  const startTaskIndex = (currentTaskPage - 1) * tasksPerPage;
  const currentTasks = tasks.slice(startTaskIndex, startTaskIndex + tasksPerPage);

  const totalMeetingPages = Math.ceil(meetings.length / meetingsPerPage);
  const startMeetingIndex = (currentMeetingPage - 1) * meetingsPerPage;
  const currentMeetings = meetings.slice(startMeetingIndex, startMeetingIndex + meetingsPerPage);

  const totalCoachingPages = Math.ceil(coaching.length / coachingsPerPage);
  const startCoachingIndex = (currentCoachingPage - 1) * coachingsPerPage;
  const currentCoachings = coaching.slice(startCoachingIndex, startCoachingIndex + coachingsPerPage);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'todo':
        return <CheckSquare className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'demo':
        return <Video className="w-4 h-4" />;
      case 'other':
        return <FileText className="w-4 h-4" />;
      default:
        return <CheckSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'text-[#5E5AFF]';
      case 'call':
        return 'text-[#605BFF]';
      case 'demo':
        return 'text-[#605BFF]';
      case 'todo':
        return 'text-[#F5A623]';
      case 'other':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const typeDisplayMap = {
    'todo': 'To Do',
    'email': 'Email',
    'call': 'Call',
    'demo': 'Demo',
    'other': 'Other'
  };

  const getContactIcon = (method: string) => {
    switch (method) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'Zoom':
        return <Video className="w-4 h-4" />;
      case 'teams':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'open':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'canceled':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      case 'deleted':
        return <Trash2 className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-800 border-green-200';
      case 'in-progress':
        return 'text-blue-800 border-blue-200';
      case 'overdue':
        return 'text-red-800 border-red-200';
      case 'open':
        return 'text-orange-800 border-orange-200';
      case 'canceled':
        return 'text-gray-600 border-gray-100';
      case 'deleted':
        return 'text-red-600 border-red-100';
      default:
        return 'text-gray-800 border-gray-200';
    }
  };

  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center space-x-2 mt-4">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentPage === page ? 'text-[#605BFF]' : 'text-gray-700 hover:bg-gray-50'
            }`}
            style={currentPage === page ? { backgroundColor: 'white' } : {}}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    );
  };

  const handleTaskAction = (task: Task) => {
    setSelectedTask(task);
  };

  const handleMeetingAction = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleCoachingAction = (session: Coaching) => {
    setSelectedCoaching(session);
  };

  // Fixed date display
  const currentDateTime = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const timeRanges = [
    { label: 'Today', value: 'Today' },
    { label: 'Next 7 days', value: 'Next 7 days' },
    { label: 'Next 14 days', value: 'Next 14 days' },
    { label: 'Next 30 days', value: 'Next 30 days' },
    { label: 'Custom', value: 'Custom' }
  ];

  const handleTimeRangeChange = (value: string) => {
    setSelectedTimeRange(value);
    setShowCustomDatePicker(value === 'Custom');
  };

  const handleApplyCustomRange = () => {
    // Validate date range
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      alert('Start date must be before end date');
      return;
    }
    
    // The filtering will be automatically applied through useFilteredData
    console.log('Custom range applied:', { startDate, endDate });
  };
  const tenants = ['All Teams', 'Sales Team', 'Technical Team', 'Support Team', 'Management'];
const users = ['All Users', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Wilson', 'Tom Anderson', 'Lisa Brown'];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm" style={{fontSize: '13px'}}>{currentDateTime}</span>
              </div>
            </div>
            
            {/* Time Range Dropdown */}
            <div className="relative">
              <select
                value={selectedTimeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                className="bg-transparent text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-md px-2 py-1"
                style={{fontSize: '13px'}}
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Date Range Picker */}
            {showCustomDatePicker && (
              <div className="flex items-center space-x-3 rounded-md px-3 py-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600" style={{fontSize: '13px'}}>Start Date:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#605BFF]"
                    style={{fontSize: '13px'}}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600" style={{fontSize: '13px'}}>End Date:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#605BFF]"
                    style={{fontSize: '13px'}}
                  />
                </div>
                <button
                  onClick={handleApplyCustomRange}
                  className="bg-[#605BFF] text-white px-3 py-1 rounded text-sm hover:bg-[#4F46E5] transition-colors"
                  style={{fontSize: '13px'}}
                >
                  Apply
                </button>
              </div>
            )}

            {/* Dropdowns */}
            {/*<div className="flex items-center space-x-4">
              <select
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
                className="bg-transparent text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-md pl-2 pr-8 py-1"
                style={{fontSize: '13px'}}
              >
                <option value="">Select Team</option>
                {tenants.map(tenant => (
                  <option key={tenant} value={tenant}>{tenant}</option>
                ))}
              </select>

              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="bg-transparent text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#605BFF] rounded-md px-2 py-1"
                style={{fontSize: '13px'}}
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>*/}

            {/* Commented out TimeFilter */}
            {/* <TimeFilter 
              selectedFilter={selectedTimeFilter}
              onFilterChange={setSelectedTimeFilter}
            /> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto bg-white">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <SummaryCard
            title="Total Tasks"
            value={taskStats.total}
            description="Total number of tasks across all statuses"
            icon={<CheckSquare size={20} />}
            color="blue"
          />
          <SummaryCard
            title="Overdue"
            value={taskStats.overdue}
            description="Tasks that are past their due date"
            icon={<AlertTriangle size={20} />}
            color="red"
          />
          <SummaryCard
            title="In Progress"
            value={taskStats.inProgress}
            description="Tasks currently being worked on"
            icon={<Clock size={20} />}
            color="orange"
          />
          <SummaryCard
            title="Open"
            value={taskStats.open}
            description="Tasks that are yet to be started"
            icon={<Square size={20} />}
            color="purple"
          />
          <SummaryCard
            title="Completed"
            value={taskStats.completed}
            description="Successfully completed tasks"
            icon={<CheckCircle size={20} />}
            color="green"
          />
          <SummaryCard
            title="Coaching"
            value={taskStats.coaching}
            description="Tasks related to team coaching activities"
            icon={<Users size={20} />}
            color="teal"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Upcoming Meetings"
            value={meetingStats.upcoming}
            description="Meetings scheduled for the future"
            icon={<Calendar size={20} />}
            color="blue"
          />
          <SummaryCard
            title="Meetings Need Prep"
            value={meetingStats.needsPrep}
            description="Meetings that require preparation"
            icon={<FileText size={20} />}
            color="orange"
          />
          <SummaryCard
            title="Transcripts"
            value={meetingStats.transcripts}
            description="Transcript History stores recordings from the SAM recorder and, once integrated, imports transcripts from the paid versions of Google Meet, Zoom, and Teams with one click."
            icon={<FileText size={20} />}
            color="green"
            showTooltip={true}
          />
          <SummaryCard
            title="Recordings"
            value={meetingStats.recordings}
            description="Available meeting recordings"
            icon={<Video size={20} />}
            color="purple"
          />
        </div>

        {/* Tables */}
        <div className="space-y-8">
          {/* Tasks Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Tasks</h2>
                <p className="text-gray-600">Who to contact, What to do, and When to do it</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#605BFF] text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Task</span>
                </button>
                <button className="p-2 rounded-lg text-[#F5A623] hover:bg-gray-100 transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="overflow-visible">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">When</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${getTypeColor(task.type)} mr-3`}>
                            {getTypeIcon(task.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            <p className="text-sm text-gray-500 capitalize">{typeDisplayMap[task.type]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{task.contact.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              {getContactIcon(task.contact.method)}
                              <span className="capitalize">{task.contact.method}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(task.status)}
                          <span className={`ml-2 inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          <span className="capitalize">{task.priority}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap relative">
                        <div ref={openMenuId === `task-${task.id}` ? menuRef : null}>
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === `task-${task.id}` ? null : `task-${task.id}`)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors" 
                            title="More Actions"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                          {openMenuId === `task-${task.id}` && (
                            <div className="absolute right-0 top-12 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px] flex flex-col">
                              <button
                                onClick={() => {
                                  handleTaskAction(task);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Review
                              </button>
                              <button
                                onClick={() => {
                                  // Edit functionality can be added here
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  // Delete functionality can be added here
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
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
            </div>
            {renderPagination(currentTaskPage, totalTaskPages, setCurrentTaskPage)}
          </div>

          {/* Meetings Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Meetings</h2>
                <p className="text-gray-600">Scheduled meetings and status</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#605BFF] text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Schedule Meeting</span>
                </button>
                <button className="p-2 rounded-lg text-[#F5A623] hover:bg-gray-100 transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-visible">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMeetings.map((meeting) => (
                    <tr key={meeting.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg mr-3" title={`${meeting.type} Meeting`}>
                            {getMeetingTypeIcon(meeting.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{meeting.name}</p>
                            <p className="text-sm text-gray-500">Organizer: {meeting.organizer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <p className="font-medium">{new Date(meeting.dateTime).toLocaleDateString()}</p>
                          <p className="text-gray-500">{new Date(meeting.dateTime).toLocaleTimeString()}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="mr-2 text-gray-400">
                            {getContactIcon(meeting.location)}
                          </div>
                          <span className="text-sm text-gray-900">{meeting.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          {meeting.attendees} people
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          meeting.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          meeting.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          meeting.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {meeting.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap relative">
                        <div ref={openMenuId === `meeting-${meeting.id}` ? menuRef : null}>
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === `meeting-${meeting.id}` ? null : `meeting-${meeting.id}`)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors" 
                            title="More Actions"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                          {openMenuId === `meeting-${meeting.id}` && (
                            <div className="absolute right-0 top-12 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px] flex flex-col">
                              <button
                                onClick={() => {
                                  handleMeetingAction(meeting);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Review
                              </button>
                              <button
                                onClick={() => {
                                  // Edit functionality can be added here
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  // Delete functionality can be added here
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
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
            </div>
            {renderPagination(currentMeetingPage, totalMeetingPages, setCurrentMeetingPage)}
          </div>

          {/* Coaching Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Coaching Sessions</h2>
                <p className="text-gray-600">Team coaching and development sessions</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#605BFF] text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Session</span>
                </button>
                <button className="p-2 rounded-lg text-[#F5A623] hover:bg-gray-100 transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-visible">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCoachings.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg mr-3 text-purple-600">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{session.topic}</p>
                            <p className="text-sm text-gray-500">Participant: {session.participant}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <p className="font-medium">{new Date(session.dateTime).toLocaleDateString()}</p>
                          <p className="text-gray-500">{new Date(session.dateTime).toLocaleTimeString()}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="mr-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span className="text-sm text-gray-900">{session.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-900">{session.organizer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          session.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          session.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          session.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap relative">
                        <div ref={openMenuId === `coaching-${session.id}` ? menuRef : null}>
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === `coaching-${session.id}` ? null : `coaching-${session.id}`)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors" 
                            title="More Actions"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                          {openMenuId === `coaching-${session.id}` && (
                            <div className="absolute right-0 top-12 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px] flex flex-col">
                              <button
                                onClick={() => {
                                  handleCoachingAction(session);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Review
                              </button>
                              <button
                                onClick={() => {
                                  // Edit functionality can be added here
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  // Delete functionality can be added here
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
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
            </div>
            {renderPagination(currentCoachingPage, totalCoachingPages, setCurrentCoachingPage)}
          </div>
        </div>
      </main>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg border ${
                    selectedTask.title.includes('Coaching') ? 'bg-teal-50 border-teal-200' :
                    selectedTask.type === 'call' ? 'bg-blue-50 border-blue-200' :
                    selectedTask.title.includes('Review') || selectedTask.title.includes('Negotiation') ? 'bg-purple-50 border-purple-200' :
                    'bg-gray-50 border-gray-200'
                  } mr-4`}>
                    <div className={getTypeColor(selectedTask.type)}>
                      {getTypeIcon(selectedTask.type)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedTask.type}</h3>
                    <p className="text-gray-600">Task Details</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{selectedTask.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Task Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Assignee: {selectedTask.assignee}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">{selectedTask.contact.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">{selectedTask.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">{selectedTask.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      {getContactIcon(selectedTask.contact.method)}
                      <span className="text-sm text-gray-700 ml-2 capitalize">Preferred: {selectedTask.contact.method}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Status Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      {selectedTask.status === 'completed' ? <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> :
                       selectedTask.status === 'in-progress' ? <Clock className="w-4 h-4 mr-2 text-blue-600" /> :
                       selectedTask.status === 'overdue' ? <AlertTriangle className="w-4 h-4 mr-2 text-red-600" /> :
                       <Square className="w-4 h-4 mr-2 text-orange-600" />}
                      <span className="text-sm text-gray-700 capitalize">Status: {selectedTask.status}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700 capitalize">Priority: {selectedTask.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Detail Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${
                    selectedMeeting.type === 'Internal' ? 'bg-white' :
                    selectedMeeting.type === 'External' ? 'bg-white' :
                    'bg-gray-50 border-gray-200'
                  } mr-4`}>
                    {getMeetingTypeIcon(selectedMeeting.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedMeeting.name}</h3>
                    <p className="text-gray-600">{selectedMeeting.type} Meeting</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMeeting(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Agenda</h4>
                <p className="text-gray-700">{selectedMeeting.agenda}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Meeting Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Date: {new Date(selectedMeeting.dateTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Time: {new Date(selectedMeeting.dateTime).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Location: {selectedMeeting.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Duration: {selectedMeeting.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Participants & Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Organizer: {selectedMeeting.organizer}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Attendees: {selectedMeeting.attendees} people</span>
                    </div>
                    <div className="flex items-center">
                      {selectedMeeting.status === 'Confirmed' ? <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> :
                       selectedMeeting.status === 'Cancelled' ? <X className="w-4 h-4 mr-2 text-red-600" /> :
                       selectedMeeting.status === 'Scheduled' ? <Calendar className="w-4 h-4 mr-2 text-blue-600" /> :
                       <Clock className="w-4 h-4 mr-2 text-orange-600" />}
                      <span className="text-sm text-gray-700">Status: {selectedMeeting.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coaching Detail Modal */}
      {selectedCoaching && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg border bg-teal-50 border-teal-200 mr-4">
                    <Speech className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedCoaching.topic}</h3>
                    <p className="text-gray-600">Coaching Session</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCoaching(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Session Notes</h4>
                <p className="text-gray-700">{selectedCoaching.notes}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Session Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Date: {new Date(selectedCoaching.dateTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Time: {new Date(selectedCoaching.dateTime).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Location: {selectedCoaching.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Duration: {selectedCoaching.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Participants & Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Organizer: {selectedCoaching.organizer}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-700">Participant: {selectedCoaching.participant}</span>
                    </div>
                    <div className="flex items-center">
                      {selectedCoaching.status === 'Completed' ? <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> :
                       selectedCoaching.status === 'Cancelled' ? <X className="w-4 h-4 mr-2 text-red-600" /> :
                       selectedCoaching.status === 'In Progress' ? <Clock className="w-4 h-4 mr-2 text-blue-600" /> :
                       <Calendar className="w-4 h-4 mr-2 text-orange-600" />}
                      <span className="text-sm text-gray-700">Status: {selectedCoaching.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDashboardPage;
