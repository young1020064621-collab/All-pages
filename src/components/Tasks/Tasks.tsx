import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Calendar, X, Download, Printer, ChevronLeft, ChevronRight, Filter, Plus, RotateCcw, Search, RefreshCw } from 'lucide-react';
import ExportPopup from './ExportPopup';
import AddTaskPopup from './AddTaskPopup';
import TasksPageFilterPopup from './TasksPageFilterPopup';

interface Task {
  id: number;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Overdue' | 'Completed' | 'Canceled' | 'Deleted';
  assignedTo: string;
  contact: string;
  subject: string;
  type: 'To Do' | 'Email' | 'Call' | 'Demo' | 'Other';
  priority: 'None' | 'Low' | 'Medium' | 'High';
  createdBy: string;
  createdDate: string;
  meetingNotes: string;
  meetingIntelligence: string;
}

const Tasks: React.FC = () => {
  const [filters, setFilters] = useState({
    status: 'All Status',
    priority: 'All Priority',
    type: 'All type',
    coaching: false,
    startDate: '',
    endDate: ''
  });

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Task;
    direction: 'asc' | 'desc';
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);
  const [sdrFilter, setSdrFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  // Sample data
  const tasks: Task[] = [
    {
      id: 1,
      dueDate: '2025-01-20',
      status: 'Open',
      assignedTo: 'John Smith',
      contact: 'Alice Johnson',
      subject: 'Q1 Strategy Review',
      type: 'Call',
      priority: 'High',
      createdBy: 'Manager A',
      createdDate: '2025-01-15',
      meetingNotes: 'Initial planning discussion',
      meetingIntelligence: 'Strategic priorities identified'
    },
    {
      id: 2,
      dueDate: '2025-01-22',
      status: 'In Progress',
      assignedTo: 'Sarah Davis',
      contact: 'Bob Wilson',
      subject: 'Product Demo Preparation',
      type: 'Demo',
      priority: 'Medium',
      createdBy: 'Manager B',
      createdDate: '2025-01-16',
      meetingNotes: 'Demo requirements gathered',
      meetingIntelligence: 'Key features highlighted'
    },
    {
      id: 3,
      dueDate: '2025-01-18',
      status: 'Overdue',
      assignedTo: 'Mike Chen',
      contact: 'Carol Brown',
      subject: 'Client Follow-up',
      type: 'Email',
      priority: 'High',
      createdBy: 'Manager C',
      createdDate: '2025-01-10',
      meetingNotes: 'Urgent client response needed',
      meetingIntelligence: 'Contract negotiation pending'
    },
    {
      id: 4,
      dueDate: '2025-01-25',
      status: 'Completed',
      assignedTo: 'Lisa Wang',
      contact: 'David Lee',
      subject: 'Market Research Analysis',
      type: 'Other',
      priority: 'Low',
      createdBy: 'Manager D',
      createdDate: '2025-01-12',
      meetingNotes: 'Research completed successfully',
      meetingIntelligence: 'Market trends analyzed'
    },
    {
      id: 5,
      dueDate: '2025-01-28',
      status: 'Open',
      assignedTo: 'Tom Rodriguez',
      contact: 'Emma Garcia',
      subject: 'Training Session Coordination',
      type: 'To Do',
      priority: 'Medium',
      createdBy: 'Manager E',
      createdDate: '2025-01-14',
      meetingNotes: 'Training materials prepared',
      meetingIntelligence: 'Team readiness assessed'
    },
    // Adding more sample data to reach ~50 entries
    ...Array.from({ length: 45 }, (_, i) => ({
      id: i + 6,
      dueDate: `2025-${String(Math.floor(Math.random() * 3) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      status: ['Open', 'In Progress', 'Overdue', 'Completed', 'Canceled'][Math.floor(Math.random() * 5)] as Task['status'],
      assignedTo: ['John Smith', 'Sarah Davis', 'Mike Chen', 'Lisa Wang', 'Tom Rodriguez', 'Amy Taylor', 'Chris Johnson', 'Maria Lopez'][Math.floor(Math.random() * 8)],
      contact: ['Alice Johnson', 'Bob Wilson', 'Carol Brown', 'David Lee', 'Emma Garcia', 'Frank Miller', 'Grace Kim', 'Henry Zhang'][Math.floor(Math.random() * 8)],
      subject: [
        'Client Meeting', 'Project Review', 'Sales Call', 'Team Sync', 'Product Demo',
        'Market Analysis', 'Budget Review', 'Training Session', 'Contract Negotiation',
        'Strategy Planning', 'Performance Review', 'Quality Assurance'
      ][Math.floor(Math.random() * 12)],
      type: ['To Do', 'Email', 'Call', 'Demo', 'Other'][Math.floor(Math.random() * 5)] as Task['type'],
      priority: ['None', 'Low', 'Medium', 'High'][Math.floor(Math.random() * 4)] as Task['priority'],
      createdBy: ['Manager A', 'Manager B', 'Manager C', 'Manager D', 'Manager E'][Math.floor(Math.random() * 5)],
      createdDate: `2025-01-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}`,
      meetingNotes: ['Initial discussion', 'Follow-up required', 'Action items identified', 'Next steps planned', 'Requirements gathered'][Math.floor(Math.random() * 5)],
      meetingIntelligence: ['Key insights captured', 'Strategic alignment confirmed', 'Risk factors identified', 'Opportunities discovered', 'Progress tracked'][Math.floor(Math.random() * 5)]
    }))
  ];

  const statusOptions = ['All Status', 'Open', 'In Progress', 'Overdue', 'Completed', 'Canceled', 'Deleted'];
  const priorityOptions = ['All Priority', 'None', 'Low', 'Medium', 'High'];
  const typeOptions = ['All type', 'To Do', 'Email', 'Call', 'Demo', 'Other'];
  const coachingOptions = ['All Tasks', 'All Coaching', 'Coaching In Progress', 'Coaching Completed'];
  const handleSort = (key: keyof Task) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = useMemo(() => {
    if (!sortConfig) return tasks;

    return [...tasks].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [tasks, sortConfig]);

  const filteredTasks = useMemo(() => {
    return sortedTasks.filter(task => {
      if (filters.status !== 'All Status' && task.status !== filters.status) return false;
      if (filters.priority !== 'All Priority' && task.priority !== filters.priority) return false;
      if (filters.type !== 'All type' && task.type !== filters.type) return false;
      
      // Date filtering
      if (filters.startDate && task.dueDate < filters.startDate) return false;
      if (filters.endDate && task.dueDate > filters.endDate) return false;
      
      return true;
    });
  }, [sortedTasks, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  const clearFilters = () => {
    setFilters({
      status: 'All Status',
      priority: 'All Priority',
      type: 'All type',
      coaching: false,
      startDate: '',
      endDate: ''
    });
  };

  const setToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setFilters(prev => ({ ...prev, startDate: today, endDate: today }));
  };

  // Export popup handlers
  const handleExportClick = () => {
    setShowExportPopup(true);
  };

  const handleExportClose = () => {
    setShowExportPopup(false);
  };

  const handleExportSubmit = (exportData: any) => {
    console.log('Export data:', exportData);
    setShowExportPopup(false);
  };

  // Add Task popup handlers
  const handleAddTaskClick = () => {
    setShowAddTaskPopup(true);
  };

  const handleAddTaskClose = () => {
    setShowAddTaskPopup(false);
  };

  const handleAddTaskSubmit = (taskData: any) => {
    console.log('New task data:', taskData);
    setShowAddTaskPopup(false);
  };

  // Filter popup handlers
  const handleFilterClick = () => {
    setShowFiltersPopup(true);
  };

  const handleFiltersClose = () => {
    setShowFiltersPopup(false);
  };

  const handleFiltersApply = (filterData: any) => {
    console.log('Filter data:', filterData);
    setShowFiltersPopup(false);
  };

  const handleFiltersClear = () => {
    console.log('Clear filters');
  };

  const handleFiltersSave = (filterData: any) => {
    console.log('Save filter data:', filterData);
    setShowFiltersPopup(false);
  }

  const getSortIcon = (column: keyof Task) => {
    if (!sortConfig || sortConfig.key !== column) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-[#605BFF]" />
      : <ChevronDown className="w-4 h-4 text-[#605BFF]" />;
  };

  {/*const getStatusBadge = (status: string) => {
    const statusColors = {
      'Open': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Overdue': 'bg-red-100 text-red-800',
      'Completed': 'bg-green-100 text-green-800',
      'Canceled': 'bg-gray-100 text-gray-800',
      'Deleted': 'bg-gray-100 text-gray-500'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };*/}
  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Open': 'text-gray-800',
      'In Progress': 'text-gray-800',
      'Overdue': 'text-red-800',
      'Completed': 'text-gray-800',
      'Canceled': 'text-gray-800',
      'Deleted': 'text-gray-500'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const priorityColors = {
      'None': 'bg-gray-100 text-gray-600',
      'Low': 'bg-green-100 text-green-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'High': 'bg-red-100 text-red-700'
    };
    return priorityColors[priority as keyof typeof priorityColors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-1 items-center space-x-2">
            <h1 className="flex items-center text-2xl font-bold text-gray-900">
              <span className="mr-4">Tasks</span>
              <button className="text-gray-400 hover:text-[#605BFF]">
                <RefreshCw className="w-5 h-5" />
              </button>
            </h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Search Box */}
            {/*<div className="min-w-48 max-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transcripts..."
                  className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
                />
              </div>
            </div>         
            <button
              className="px-4 py-1.5 text-sm font-medium bg-white text-[#605BFF] border border-[#605BFF] rounded-lg hover:bg-[#605BFF] hover:text-white transition-colors"
            >
              Search
            </button>
            
            <button
              className="flex items-center gap-2 px-3 py-1.5 text-[#F5A623] rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filter</span>
            </button>*/}

            <button
              onClick={handleAddTaskClick}
              className="flex items-center space-x-2 px-4 py-2 text-white bg-[#605BFF] rounded-lg hover:bg-[#4B46CC] transition-colors"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Add Task</span>
            </button>
            {/* Coaching Filter */}
            {/*<div className="flex items-center gap-2">
              <select 
                value={filters.coachings} 
                onChange={(e) => setFilters(prev => ({...prev, coachings: e.target.value}))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF] text-sm appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                {coachingOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>*/}
            
            {/* Status Filter */}
            {/*<div className="flex items-center gap-2">
              <select 
                value={filters.status} 
                onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF] text-sm appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>*/}

            {/* Priority Filter */}
            {/* <div className="flex items-center gap-2">
              <select 
                value={filters.priority} 
                onChange={(e) => setFilters(prev => ({...prev, priority: e.target.value}))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF] text-sm appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                {priorityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>*/}

            {/* Type Filter */}
            {/* <div className="flex items-center gap-2">
              <select 
                value={filters.type} 
                onChange={(e) => setFilters(prev => ({...prev, type: e.target.value}))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF] text-sm appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                {typeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>*/}

            {/* Coaching Checkbox */}
            {/*<div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="coaching"
                checked={filters.coaching}
                onChange={(e) => setFilters(prev => ({...prev, coaching: e.target.checked}))}
                className="w-4 h-4 text-[#605BFF] border-gray-300 rounded focus:ring-[#605BFF]"
              />
              <label htmlFor="coaching" className="text-sm text-gray-700">Coaching</label>
            </div>*/} 

            {/* Date Filters */}
            {/* <div className="flex items-center gap-2">
              <div className="relative">
                <input 
                  type="date" 
                  value={filters.startDate}
                  onChange={(e) => setFilters(prev => ({...prev, startDate: e.target.value}))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF] text-sm cursor-pointer"
                  style={{ color: filters.startDate ? 'inherit' : 'transparent' }}
                />
                {!filters.startDate && (
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                    Start Date
                  </span>
                )}
              </div>
              <span className="text-gray-500">to</span>
              <div className="relative">
                <input 
                  type="date" 
                  value={filters.endDate}
                  onChange={(e) => setFilters(prev => ({...prev, endDate: e.target.value}))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF] text-sm cursor-pointer"
                  style={{ color: filters.endDate ? 'inherit' : 'transparent' }}
                />
                {!filters.endDate && (
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                    End Date
                  </span>
                )}
              </div>
              <button 
                onClick={setToday}
                className="px-3 py-2 bg-white text-[#605BFF] border border-[#605BFF] rounded-lg hover:bg-[#605BFF] hover:text-white transition-colors text-sm"
              >
                Today
              </button>
            </div>*/}

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              {/*<button 
                onClick={clearFilters}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Clear Filters"
              >
                <X className="w-5 h-5" />
              </button>*/}
              <button 
                onClick={handleExportClick}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Print"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body - Table */}
      <div className="flex-1 px-6 py-6 overflow-hidden">
        <div className="flex justify-between space-x-4 items-center mb-8">
          <div className="flex items-center space-x-4">
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
                  paddingRight: '2.5rem',
                  color: sdrFilter ? 'black' : '#9CA3AF'
                }}
              >
                <option value="" disabled hidden style={{color: '#9CA3AF'}}>Select type</option>
                <option value="todo" style={{color: 'black'}}>To Do</option>
                <option value="email" style={{color: 'black'}}>Email</option>
                <option value="call" style={{color: 'black'}}>Call</option>
                <option value="demo" style={{color: 'black'}}>Demo</option>
                <option value="meeting" style={{color: 'black'}}>Meeting</option>
                <option value="follow" style={{color: 'black'}}>Follow Up</option>
                <option value="other" style={{color: 'black'}}>Other</option>
              </select>
            </div>

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
                  paddingRight: '2.5rem',
                  color: clientFilter ? 'black' : '#9CA3AF'
                }}
              >
                <option value="" disabled hidden style={{color: '#9CA3AF'}}>Due date</option>
                <option value="1" style={{color: 'black'}}>Due Tomorrow</option>
                <option value="2" style={{color: 'black'}}>Due This week</option>
                <option value="3" style={{color: 'black'}}>Due Last week</option>
                <option value="4" style={{color: 'black'}}>Due Next week</option>
                <option value="5" style={{color: 'black'}}>Due This month</option>
                <option value="6" style={{color: 'black'}}>Due Last month</option>
                <option value="7" style={{color: 'black'}}>Due Next month</option>
              </select>
            </div>
            
            {/* Clear Filters Button */}
            <button 
              onClick={() => {
                setSdrFilter('');
                setClientFilter('');
              }}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Clear Filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="min-w-[12rem] max-w-[16rem]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
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
                className="flex items-center gap-2 px-3 py-1.5 text-[#F5A623] rounded-lg border border-[#F5A623] rounded-lg hover:bg-[#F5A623] hover:text-white transition-colors"
              >
                <Filter size={16} />
                <span className="text-sm font-medium">Filter</span>
              </button>
              {showFiltersPopup && (
                <TasksPageFilterPopup
                  isOpen={showFiltersPopup}
                  onClose={handleFiltersClose}
                  onApply={handleFiltersApply}
                  onClear={handleFiltersClear}
                  onSave={handleFiltersSave}
                />
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col mb-6" style={{height: 'calc(100vh - 240px)'}}>         
          <div className="flex-1 overflow-x-auto overflow-y-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('dueDate')}
                  >
                    <div className="flex items-center gap-1">
                      Due Date
                      {getSortIcon('dueDate')}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                    Subject
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center gap-1">
                      Type
                      {getSortIcon('type')}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('priority')}
                  >
                    <div className="flex items-center gap-1">
                      Priority
                      {getSortIcon('priority')}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Created By
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('createdDate')}
                  >
                    <div className="flex items-center gap-1">
                      Created Date
                      {getSortIcon('createdDate')}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                    Meeting Notes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                    Meeting Intelligence
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 min-w-[120px]">{task.assignedTo}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 min-w-[120px]">{task.contact}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 min-w-[150px]">
                      <div className="max-w-[150px] truncate" title={task.subject}>{task.subject}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{task.type}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 min-w-[120px]">{task.createdBy}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(task.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 min-w-[150px]">
                      <div className="max-w-[150px] truncate" title={task.meetingNotes}>{task.meetingNotes}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 min-w-[150px]">
                      <div className="max-w-[150px] truncate" title={task.meetingIntelligence}>{task.meetingIntelligence}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap min-w-[80px]">
                      <button className="px-3 py-1 bg-white text-[#605BFF] border border-[#605BFF] text-sm rounded-lg hover:bg-[#605BFF] hover:text-white transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                >
                  &lt;
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded transition-colors ${
                        currentPage === pageNum
                          ? 'text-[#605BFF] font-bold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                >
                  &gt;
                </button>
              </div>
              
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
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
              <span className="font-bold">Total : {filteredTasks.length}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Export Popup */}
      {showExportPopup && (
        <ExportPopup
          isOpen={showExportPopup}
          onClose={handleExportClose}
          onSubmit={handleExportSubmit}
        />
      )}
      
      {/* Add Task Popup */}
      {showAddTaskPopup && (
        <AddTaskPopup
          isOpen={showAddTaskPopup}
          onClose={handleAddTaskClose}
          onSubmit={handleAddTaskSubmit}
        />
      )}
    </div>
  );
};

export default Tasks;
