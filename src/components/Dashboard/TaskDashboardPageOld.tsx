import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, User, Phone, Mail, MessageSquare, Video, MoreHorizontal, XCircle, Trash2, ChevronLeft, ChevronRight, Eye, Plus, Filter, ListTodo, UserCheck, Speech } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'todo' | 'email' | 'call' | 'demo' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'overdue' | 'completed' | 'canceled' | 'deleted';
  dueDate: string;
  assignee: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    method: 'email' | 'phone' | 'Zoom' | 'teams';
  };
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  status: 'scheduled' | 'confirmed' | 'cancelled';
  location: string;
  organizer: string;
}

interface Coaching {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'cancelled';
  location: string;
  organizer: string;
}

const TaskDashboardPage: React.FC = () => {
  const [currentTaskPage, setCurrentTaskPage] = useState(1);
  const [currentMeetingPage, setCurrentMeetingPage] = useState(1);
  const [currentCoachingPage, setCurrentCoachingPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const tasksPerPage = 5;
  const meetingsPerPage = 4;
  const coachingsPerPage = 4;

  // Extended mock data for tasks
  const tasks: Task[] = [
    { id: '1', title: 'Review Q4 Budget Proposal', description: 'Analyze and provide feedback on the quarterly budget allocation for next fiscal year. Review all department requests and ensure alignment with company goals.', type: 'email', priority: 'high', status: 'open', dueDate: '2025-01-15', assignee: 'Sarah Johnson', contact: { name: 'Sarah Johnson', email: 'sarah.j@company.com', phone: '+1-555-0123', method: 'email' } },
    { id: '2', title: 'Product Demo for Client ABC', description: 'Present new features to potential enterprise client including advanced analytics dashboard and API integrations.', type: 'demo', priority: 'high', status: 'in-progress', dueDate: '2025-01-12', assignee: 'Mike Chen', contact: { name: 'Mike Chen', email: 'mike.chen@company.com', phone: '+1-555-0456', method: 'Zoom' } },
    { id: '3', title: 'Follow up on Contract Terms', description: 'Discuss pricing and timeline with legal team. Address concerns about liability clauses and payment terms.', type: 'call', priority: 'medium', status: 'overdue', dueDate: '2025-01-08', assignee: 'Alex Rivera', contact: { name: 'Alex Rivera', email: 'alex.r@company.com', phone: '+1-555-0789', method: 'phone' } },
    { id: '4', title: 'Update Project Documentation', description: 'Review and update technical documentation for Project Alpha including API docs and user guides.', type: 'todo', priority: 'medium', status: 'completed', dueDate: '2025-01-10', assignee: 'Emma Wilson', contact: { name: 'Emma Wilson', email: 'emma.w@company.com', phone: '+1-555-0321', method: 'email' } },
    { id: '5', title: 'Research Market Trends', description: 'Compile competitive analysis report for Q1 strategy planning. Focus on emerging technologies and pricing models.', type: 'other', priority: 'low', status: 'canceled', dueDate: '2025-01-20', assignee: 'David Kim', contact: { name: 'David Kim', email: 'david.k@company.com', phone: '+1-555-0654', method: 'teams' } },
    { id: '6', title: 'Client Onboarding Call', description: 'Welcome new enterprise client and walk through platform setup process.', type: 'call', priority: 'high', status: 'open', dueDate: '2025-01-16', assignee: 'Lisa Park', contact: { name: 'Lisa Park', email: 'lisa.p@company.com', phone: '+1-555-0987', method: 'phone' } },
    { id: '7', title: 'Send Weekly Report', description: 'Compile and send weekly performance metrics to stakeholders.', type: 'email', priority: 'medium', status: 'in-progress', dueDate: '2025-01-14', assignee: 'Tom Anderson', contact: { name: 'Tom Anderson', email: 'tom.a@company.com', phone: '+1-555-0234', method: 'email' } },
    { id: '8', title: 'Feature Demo Preparation', description: 'Prepare demo environment and test scenarios for upcoming client presentation.', type: 'demo', priority: 'medium', status: 'open', dueDate: '2025-01-18', assignee: 'Rachel Green', contact: { name: 'Rachel Green', email: 'rachel.g@company.com', phone: '+1-555-0567', method: 'Zoom' } },
    { id: '9', title: 'Security Audit Review', description: 'Review security audit findings and implement recommended changes.', type: 'todo', priority: 'high', status: 'overdue', dueDate: '2025-01-09', assignee: 'James Wilson', contact: { name: 'James Wilson', email: 'james.w@company.com', phone: '+1-555-0890', method: 'email' } },
    { id: '10', title: 'Training Session Planning', description: 'Plan and organize training sessions for new team members.', type: 'other', priority: 'low', status: 'open', dueDate: '2025-01-22', assignee: 'Maria Garcia', contact: { name: 'Maria Garcia', email: 'maria.g@company.com', phone: '+1-555-0345', method: 'teams' } },
    { id: '11', title: 'Customer Feedback Analysis', description: 'Analyze customer feedback from Q4 and prepare improvement recommendations.', type: 'todo', priority: 'medium', status: 'completed', dueDate: '2025-01-11', assignee: 'Kevin Lee', contact: { name: 'Kevin Lee', email: 'kevin.l@company.com', phone: '+1-555-0678', method: 'email' } },
    { id: '12', title: 'Partnership Discussion', description: 'Discuss potential partnership opportunities with strategic vendors.', type: 'call', priority: 'medium', status: 'deleted', dueDate: '2025-01-13', assignee: 'Anna Smith', contact: { name: 'Anna Smith', email: 'anna.s@company.com', phone: '+1-555-0901', method: 'phone' } }
  ];

  // Extended mock data for meetings
  const meetings: Meeting[] = [
    { id: '1', title: 'Weekly Team Standup', date: '2025-01-13', time: '09:00 AM', attendees: 6, status: 'confirmed', location: 'Conference Room A', organizer: 'Sarah Johnson', type: 'Internal' },
    { id: '2', title: 'Client Presentation Review', date: '2025-01-14', time: '02:00 PM', attendees: 4, status: 'scheduled', location: 'Virtual - Zoom', organizer: 'Mike Chen', type: 'Internal' },
    { id: '3', title: 'Budget Planning Session', date: '2025-01-15', time: '10:30 AM', attendees: 8, status: 'confirmed', location: 'Conference Room B', organizer: 'Alex Rivera', type: 'Internal' },
    { id: '4', title: 'Product Strategy Meeting', date: '2025-01-16', time: '03:00 PM', attendees: 5, status: 'scheduled', location: 'Virtual - Teams', organizer: 'Emma Wilson', type: 'External' },
    { id: '5', title: 'Quarterly Review', date: '2025-01-17', time: '11:00 AM', attendees: 12, status: 'confirmed', location: 'Main Conference Room', organizer: 'David Kim', type: 'External' },
    { id: '6', title: 'Client Onboarding Session', date: '2025-01-18', time: '01:00 PM', attendees: 3, status: 'cancelled', location: 'Virtual - Zoom', organizer: 'Lisa Park', type: 'External' },
    { id: '7', title: 'Security Review Meeting', date: '2025-01-19', time: '09:30 AM', attendees: 7, status: 'scheduled', location: 'Conference Room C', organizer: 'James Wilson', type: 'Internal' },
    { id: '8', title: 'Training Workshop', date: '2025-01-20', time: '02:30 PM', attendees: 15, status: 'confirmed', location: 'Training Room', organizer: 'Maria Garcia', type: 'External' },
    { id: '9', title: 'Partnership Discussion', date: '2025-01-21', time: '04:00 PM', attendees: 6, status: 'scheduled', location: 'Virtual - Teams', organizer: 'Kevin Lee', type: 'Internal' },
    { id: '10', title: 'Monthly All-Hands', date: '2025-01-22', time: '10:00 AM', attendees: 25, status: 'confirmed', location: 'Main Auditorium', organizer: 'Anna Smith', type: 'Internal' }
  ];
  
  const coachings: Coaching[] = [
  { id: '1', title: 'Leadership Skills Workshop', date: '2025-01-13', time: '09:00 AM', status: 'confirmed', location: 'Conference Room A', organizer: 'Sarah Johnson' },
  { id: '2', title: 'Effective Communication Training', date: '2025-01-14', time: '02:00 PM', status: 'scheduled', location: 'Virtual - Zoom', organizer: 'Mike Chen' },
  { id: '3', title: 'Time Management Coaching', date: '2025-01-15', time: '10:30 AM', status: 'confirmed', location: 'Conference Room B', organizer: 'Alex Rivera' },
  { id: '4', title: 'Team Building Strategy Session', date: '2025-01-16', time: '03:00 PM', status: 'scheduled', location: 'Virtual - Teams', organizer: 'Emma Wilson' },
  { id: '5', title: 'Performance Review & Goal Setting', date: '2025-01-17', time: '11:00 AM', status: 'confirmed', location: 'Main Conference Room', organizer: 'David Kim' },
  { id: '6', title: 'Onboarding & Development Coaching', date: '2025-01-18', time: '01:00 PM', status: 'cancelled', location: 'Virtual - Zoom', organizer: 'Lisa Park' },
  { id: '7', title: 'Conflict Resolution Workshop', date: '2025-01-19', time: '09:30 AM', status: 'scheduled', location: 'Conference Room C', organizer: 'James Wilson' },
  { id: '8', title: 'Career Advancement Workshop', date: '2025-01-20', time: '02:30 PM', status: 'confirmed', location: 'Training Room', organizer: 'Maria Garcia' },
  { id: '9', title: 'Coaching for Remote Teams', date: '2025-01-21', time: '04:00 PM', status: 'scheduled', location: 'Virtual - Teams', organizer: 'Kevin Lee' },
  { id: '10', title: 'Personal Development & Growth', date: '2025-01-22', time: '10:00 AM', status: 'confirmed', location: 'Main Auditorium', organizer: 'Anna Smith' }
];
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'demo':
        return <Video className="w-4 h-4" />;
      case 'todo':
        return <CheckCircle className="w-4 h-4" />;
      case 'other':
        return <MoreHorizontal className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
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
        return 'text-[#FF8E1C]';
      case 'other':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
        return 'text-gray-800 border-gray-200';
      case 'canceled':
        return 'text-gray-600 border-gray-200';
      case 'deleted':
        return 'text-red-600 border-red-100';
      default:
        return 'text-gray-800 border-gray-200';
    }
  };

  const getContactIcon = (method: string) => {
    switch (method) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'Zoom':
        return <MessageSquare className="w-4 h-4" />;
      case 'teams':
        return <Users className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getMeetingStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'Internal':
        return <Speech className="w-4 h-4 text-[#FF8E1C]" />;
      case 'External':
        return <Calendar className="w-4 h-4 text-[#605BFF]" />;
      default:
        return <Calendar className="w-4 h-4 text-[#605BFF]" />;
    }
  };

  const typeDisplayMap = {
  'todo': 'To Do',
  'email': 'Email',
  'call': 'Call',
  'demo': 'Demo',
  'other': 'Other'
};

  // Calculate stats
  const openTasks = tasks.filter(task => task.status === 'open').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  // Pagination logic for tasks
  const totalTaskPages = Math.ceil(tasks.length / tasksPerPage);
  const startTaskIndex = (currentTaskPage - 1) * tasksPerPage;
  const endTaskIndex = startTaskIndex + tasksPerPage;
  const currentTasks = tasks.slice(startTaskIndex, endTaskIndex);

  // Pagination logic for meetings
  const totalMeetingPages = Math.ceil(meetings.length / meetingsPerPage);
  const startMeetingIndex = (currentMeetingPage - 1) * meetingsPerPage;
  const endMeetingIndex = startMeetingIndex + meetingsPerPage;
  const currentMeetings = meetings.slice(startMeetingIndex, endMeetingIndex);

  // Pagination logic for coaching
  const totalCoachingPages = Math.ceil(coachings.length / coachingsPerPage);
  const startCoachingIndex = (currentCoachingPage - 1) * coachingsPerPage;
  const endCoachingIndex = startCoachingIndex + coachingsPerPage;
  const currentCoachings = coachings.slice(startCoachingIndex, endCoachingIndex);

  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center space-x-2 mt-4">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="p-2 rounded-lghover:bg-gray-50 transition-colors"
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm" style={{fontSize: '13px'}}>Sunday, March 31, 2024</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="p-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto bg-white">

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
            </div>
            <div className="p-3 rounded-full" style={{ backgroundColor: 'white' }}>
              <ListTodo className="w-6 h-6" style={{ color: '#605BFF' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
            </div>
            <div className="p-3 bg-white rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{inProgressTasks}</p>
            </div>
            <div className="p-3 bg-white rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Open</p>
              <p className="text-2xl font-bold text-gray-600">{openTasks}</p>
            </div>
            <div className="p-3 bg-white rounded-full">
              <AlertCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="p-3 bg-white rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

        {/* Main Content Grid - Now a single column */}
        <div className="grid grid-cols-1 gap-8">
        {/* Tasks and Meetings Section - Takes up full width */}
        <div className="space-y-8">
          {/* Task Management Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Task Overview</h2>
                    <p className="text-gray-600">Who to contact, What to do, and When to do it</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#605BFF] text-white rounded-lg shadow-md hover:bg-[#524BFF] transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>New Task</span>
                    </button>
                    <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto h-[30rem] flex flex-col justify-between">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Type</th>
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
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => setSelectedTask(task)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="View Details" >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Task Pagination */}
              <div className="px-6 pb-4">
                {renderPagination(currentTaskPage, totalTaskPages, setCurrentTaskPage)}
              </div>
            </div>
          </div>

          {/* Upcoming Meetings Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Meetings</h2>
                    <p className="text-gray-600">Scheduled Meetings and Status</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#605BFF] text-white rounded-lg shadow-md hover:bg-[#524BFF] transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Schedule Meeting</span>
                    </button>
                    <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto h-[26rem] flex flex-col justify-between">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
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
                          <div className="p-2 rounded-lg mr-3">
                            {getMeetingTypeIcon(meeting.type)}
                            
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <p className="font-medium">{new Date(meeting.date).toLocaleDateString()}</p>
                          <p className="text-gray-500">{meeting.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{meeting.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-900">{meeting.organizer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          {meeting.attendees}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getMeetingStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => setSelectedMeeting(meeting)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="View Details" >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Meeting Pagination */}
              <div className="px-6 pb-4">
                {renderPagination(currentMeetingPage, totalMeetingPages, setCurrentMeetingPage)}
              </div>
            </div>
          </div>

          {/* Coaching Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Coaching</h2>
                    <p className="text-gray-600">Sales Coaching Schedule and Status</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#605BFF] text-white rounded-lg shadow-md hover:bg-[#524BFF] transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>New Coaching</span>
                    </button>
                    <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto h-[26rem] flex flex-col justify-between">
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
                  {currentCoachings.map((coaching) => (
                    <tr key={coaching.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg mr-3">
                            <UserCheck className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{coaching.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <p className="font-medium">{new Date(coaching.date).toLocaleDateString()}</p>
                          <p className="text-gray-500">{coaching.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{coaching.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-900">{coaching.organizer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getMeetingStatusColor(coaching.status)}`}>
                          {coaching.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="View Details" >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Coaching Pagination */}
              <div className="px-6 pb-4">
                {renderPagination(currentCoachingPage, totalCoachingPages, setCurrentCoachingPage)}
              </div>
            </div>
          </div>
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
                  <div className={`p-3 rounded-lg border ${getTypeColor(selectedTask.type)} mr-4`}>
                    {getTypeIcon(selectedTask.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h3>
                    <p className="text-gray-600 capitalize">{selectedTask.type} Task</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-400" />
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
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2">
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
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Task Details</h4>
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
                      {getStatusIcon(selectedTask.status)}
                      <span className="text-sm text-gray-700 ml-2 capitalize">Status: {selectedTask.status.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-gray-400" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 flex flex-col items-center">
            <span className="text-gray-900 text-lg font-medium mb-2">Please found in link:</span>
            <a
              href="https://multi-button-dashboa-5o58.bolt.host"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Link
            </a>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default TaskDashboardPage;